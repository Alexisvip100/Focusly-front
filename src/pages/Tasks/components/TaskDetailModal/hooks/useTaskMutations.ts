import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  GET_WORKSPACES,
  REMOVE_WORKSPACE,
} from '@/pages/Workspace/workspaces.graphql';
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_SUBTASK,
  GET_TASKS,
} from '../tasks.graphql';
import { sileo } from 'sileo';
import {
  createGoogleEvent,
  updateGoogleEvent,
  deleteGoogleEvent,
} from '@/api/GoogleCalendar/googleCalendarApi';
import {
  removeTask,
  upsertTask as upsertTaskRedux,
} from '@/redux/tasks/task.slice';
import { mapResponseToTask } from '@/api/Tasks/taskMapper';
import {
  deduplicateLinks,
  parseDuration,
  parseRealTime,
  getPriorityLevel,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type {
  TaskData,
  TaskInput,
  UseTaskMutationsProps,
} from '../types/TaskDetailModal.types';
import type { PriorityType } from '../TaskDetailModal.utils';
import type { Task } from '@/redux/tasks/task.types';

export const useTaskMutations = ({
  onSave,
  onClose,
  onDelete,
  initialTask,
  parentTask,
  subtaskIndex,
  resetForm,
}: UseTaskMutationsProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loadingSave, setLoadingSave] = useState(false);

  const [createTaskMutation] = useMutation(CREATE_TASK);
  const [updateTaskMutation] = useMutation(UPDATE_TASK);
  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const [addSubtaskMutation] = useMutation(ADD_SUBTASK);
  const [removeWorkspaceMutation] = useMutation(REMOVE_WORKSPACE);

  const generateMeetLinkNow = async (
    googleEventId?: string,
    state?: Partial<TaskData & { color: string }>,
  ) => {
    try {
      if (googleEventId) {
        const updated = await updateGoogleEvent(googleEventId, {
          conferenceData: {
            createRequest: {
              requestId: `focusly-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        });
        return updated.hangoutLink;
      } else {
        const tempEvent = await createGoogleEvent({
          summary: state?.title || 'Focusly Meeting',
          description: state?.description || '',
          start: {
            dateTime:
              state?.deadline?.toISOString() || new Date().toISOString(),
          },
          end: {
            dateTime: new Date(
              (state?.deadline?.getTime() || Date.now()) +
                (parseDuration(state?.duration || '30m') || 30) * 60000,
            ).toISOString(),
          },
          conferenceData: {
            createRequest: {
              requestId: `focusly-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        });

        const meetLink = tempEvent.hangoutLink || null;
        if (tempEvent.id) {
          try {
            // Delete the dummy event so it doesn't show up in the user's Calendar
            await deleteGoogleEvent(tempEvent.id);
          } catch (e) {
            console.warn('Failed to delete dummy meet event immediately', e);
          }
        }

        return meetLink;
      }
    } catch (error) {
      console.error('Error generating meet link:', error);
      return null;
    }
  };

  const handleSave = async (
    state: TaskData & { color: string; shouldGenerateMeet?: boolean },
  ) => {
    if (!user) return;
    setLoadingSave(true);

    let meetLink: string | null = null;
    if (state.shouldGenerateMeet) {
      const generated = await generateMeetLinkNow(undefined, state);
      meetLink = generated || null;
    }

    const estimateTimer = parseDuration(state.duration);
    const realTimer = parseRealTime(state.realTime || '');
    const priorityLevel = getPriorityLevel(state.priority as PriorityType);

    const cleanDesc = (state.description || '')
      .replace(/\[COLOR:(.*?)\]/g, '')
      .replace(/\[START_DATE:(.*?)\]/g, '')
      .trim();

    const links = deduplicateLinks(state.links || []).map(
      (l: { title: string; url: string }) => ({ title: l.title, url: l.url }),
    );
    if (meetLink) {
      links.push({ title: 'Google Meet', url: meetLink });
    }

    const commonInput = {
      title: state.title,
      notes_encrypted: `${cleanDesc} [COLOR:${state.color}]`,
      estimate_timer: estimateTimer,
      real_timer: realTimer,
      tags: state.tags,
      deadline: state.deadline
        ? state.deadline.toISOString()
        : new Date().toISOString(),
      priority_level: priorityLevel,
      category: state.category,
      links,
      collaborators: state.collaborators,
    };

    if (parentTask?.id) {
      try {
        const subtaskInput = {
          title: state.title,
          notes_encrypted: `${cleanDesc} [COLOR:${state.color}]`,
          completed: state.status === 'Done',
          timer: realTimer || 0,
          estimate_timer: estimateTimer,
          priority_level: priorityLevel,
          status: state.status || 'Backlog',
          deadline: state.deadline
            ? state.deadline.toISOString()
            : new Date().toISOString(),
          category: state.category,
          links,
        };

        const { data } = await addSubtaskMutation({
          variables: {
            taskId: parentTask.id,
            subtask: subtaskInput,
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId: user.id } },
          ],
        });
        if (data?.addSubtask) {
          dispatch(upsertTaskRedux(mapResponseToTask(data.addSubtask)));
          sileo.success({
            title: 'Subtask added',
            fill: 'var(--sileo-success-bg)',
          });
          onSave(data.addSubtask);
          resetForm();
        }
      } catch (e) {
        console.error(e);
      }
      setLoadingSave(false);
      return;
    }

    const createInput: TaskInput = {
      ...commonInput,
      user_id: user.id || '',
      status: state.status || 'Backlog',
      google_event_id: (initialTask as { google_event_id?: string })
        ?.google_event_id,
      subtasks: state.subtasks?.map((st) => ({
        title: st.title,
        completed: st.completed,
        timer: st.timer,
      })),
    };

    try {
      const { data } = await createTaskMutation({
        variables: { createTaskInput: createInput },
        refetchQueries: [{ query: GET_TASKS, variables: { userId: user.id } }],
      });
      if (data?.createTask) {
        sileo.success({
          title: 'Task created',
          fill: 'var(--sileo-success-bg)',
        });
        onSave(data.createTask);
        resetForm();
        onClose();
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingSave(false);
  };

  const handleUpdate = async (
    state: TaskData & { color: string; shouldGenerateMeet?: boolean },
    shouldClose = true,
  ) => {
    if (!user || !initialTask?.id) return;
    setLoadingSave(true);
    const estimateTimer = state.duration
      ? parseDuration(state.duration)
      : initialTask.estimate_timer || 0;
    const priorityLevel = state.priority
      ? getPriorityLevel(state.priority as PriorityType)
      : initialTask.priority_level || 2;
    const realTimer =
      state.realTime !== undefined && state.realTime !== null
        ? parseRealTime(state.realTime)
        : initialTask.real_timer || 0;

    // 1. Handle Subtask Update (Special case for nested structure)
    if (parentTask && typeof subtaskIndex === 'number') {
      const updatedSubtasks = [...(parentTask.subtasks || [])].map((st, i) => {
        const baseSubtask =
          typeof st === 'string'
            ? { title: st, completed: false, timer: 0 }
            : st;
        const cleanSt = { ...(baseSubtask as Record<string, unknown>) };
        delete cleanSt.__typename;
        delete (cleanSt as Record<string, unknown>).real_timer;
        delete (cleanSt as Record<string, unknown>).tags;
        delete (cleanSt as Record<string, unknown>).collaborators;

        if (i !== subtaskIndex) return cleanSt;

        const subtaskColor =
          state.color ||
          (initialTask as { color?: string | undefined }).color ||
          '#3b82f6';
        return {
          title: state.title || initialTask.title,
          timer: realTimer || 0,
          completed: (state.status || initialTask.status) === 'Done',
          notes_encrypted: `${state.description || initialTask.notes_encrypted || ''} [COLOR:${subtaskColor}]`,
          estimate_timer: estimateTimer,
          priority_level: priorityLevel,
          status: state.status,
          deadline:
            state.deadline instanceof Date
              ? state.deadline.toISOString()
              : state.deadline || initialTask.deadline,
          category: state.category,
          links: state.links?.map((l) => ({ title: l.title, url: l.url })),
        };
      });

      try {
        const { data } = await updateTaskMutation({
          variables: {
            updateTaskInput: { id: parentTask.id, subtasks: updatedSubtasks },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId: user.id } },
          ],
        });
        if (data?.updateTask) {
          dispatch(upsertTaskRedux(mapResponseToTask(data.updateTask)));
          onSave(data.updateTask);
          resetForm();
          if (shouldClose) onClose();
        }
      } catch (e) {
        console.error(e);
      }
      setLoadingSave(false);
      return;
    }

    // 2. Handle Task Update (Config-driven diffing)
    const taskColor =
      state.color ||
      (initialTask as { color?: string | undefined }).color ||
      '#3b82f6';
    const cleanDesc = (state.description || '')
      .replace(/\[COLOR:(.*?)\]/g, '')
      .replace(/\[START_DATE:(.*?)\]/g, '')
      .trim();

    const currentNotes = `${cleanDesc} [COLOR:${taskColor}]`;
    const currentDeadline =
      state.deadline instanceof Date
        ? state.deadline.toISOString()
        : state.deadline || initialTask.deadline || '';

    // Define which fields to compare and how
    const configs: Record<
      string,
      {
        key: string;
        val: unknown;
        initial: unknown;
        isEqual?: (a: unknown, b: unknown) => boolean;
      }
    > = {
      title: { key: 'title', val: state.title, initial: initialTask.title },
      notes: {
        key: 'notes_encrypted',
        val: currentNotes,
        initial: initialTask.notes_encrypted,
      },
      status: { key: 'status', val: state.status, initial: initialTask.status },
      category: {
        key: 'category',
        val: state.category,
        initial: initialTask.category,
      },
      estimate: {
        key: 'estimate_timer',
        val: estimateTimer,
        initial: initialTask.estimate_timer,
      },
      realTime: {
        key: 'real_timer',
        val: realTimer,
        initial: initialTask.real_timer,
      },
      deadline: {
        key: 'deadline',
        val: currentDeadline,
        initial: initialTask.deadline,
      },
      priority: {
        key: 'priority_level',
        val: priorityLevel,
        initial: initialTask.priority_level,
      },
      googleId: {
        key: 'google_event_id',
        val: (state as TaskData).google_event_id || initialTask.google_event_id,
        initial: initialTask.google_event_id,
      },
      tags: {
        key: 'tags',
        val: state.tags || [],
        initial: initialTask.tags || [],
        isEqual: (a, b) =>
          JSON.stringify([...(a as unknown[])].sort()) ===
          JSON.stringify([...(b as unknown[])].sort()),
      },
      links: {
        key: 'links',
        val: deduplicateLinks(state.links || []).map((l) => ({
          title: l.title,
          url: l.url,
        })),
        initial: (initialTask.links || []).map((l) => ({
          title: l.title,
          url: l.url,
        })),
        isEqual: (a, b) => JSON.stringify(a) === JSON.stringify(b),
      },
      subtasks: {
        key: 'subtasks',
        val: (state.subtasks || []).map((st: Record<string, unknown>) => {
          const rest = { ...st };
          delete rest.__typename;
          return rest;
        }),
        initial: (initialTask.subtasks || []).map((st: unknown) => {
          const rest =
            typeof st === 'string'
              ? { title: st, completed: false, timer: 0 }
              : { ...(st as Record<string, unknown>) };
          delete (rest as Record<string, unknown>).__typename;
          return rest;
        }),
        isEqual: (a, b) => JSON.stringify(a) === JSON.stringify(b),
      },
      collaborators: {
        key: 'collaborators',
        val: state.collaborators || [],
        initial: initialTask.collaborators || [],
        isEqual: (a, b) => JSON.stringify(a) === JSON.stringify(b),
      },
    };

    const updateInput: Record<string, unknown> = { id: initialTask.id };
    let hasChanges = false;

    Object.values(configs).forEach(({ key, val, initial, isEqual }) => {
      const areEqual = isEqual ? isEqual(initial, val) : initial === val;
      if (!areEqual && val !== undefined) {
        updateInput[key] = val;
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      if (shouldClose) onClose();
      setLoadingSave(false);
      return;
    }

    try {
      const { data } = await updateTaskMutation({
        variables: { updateTaskInput: updateInput },
        refetchQueries: [{ query: GET_TASKS, variables: { userId: user.id } }],
      });
      if (data?.updateTask) {
        sileo.success({
          title: 'Task updated',
          fill: 'var(--sileo-update-bg)',
        });
        onSave(data.updateTask);
        if (shouldClose) onClose();
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingSave(false);
  };

  const handleDelete = async () => {
    if (!initialTask?.id) return;

    // 1. Handle Subtask Deletion
    if (parentTask && typeof subtaskIndex === 'number') {
      const updatedSubtasks = [...(parentTask.subtasks || [])]
        .filter((_, i) => i !== subtaskIndex)
        .map((st) => {
          const cleanSt = { ...(st as Record<string, unknown>) };
          delete cleanSt.__typename;
          delete (cleanSt as Record<string, unknown>).real_timer;
          delete (cleanSt as Record<string, unknown>).tags;
          delete (cleanSt as Record<string, unknown>).collaborators;
          return cleanSt;
        });

      try {
        const { data } = await updateTaskMutation({
          variables: {
            updateTaskInput: { id: parentTask.id, subtasks: updatedSubtasks },
          },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId: user?.id } },
          ],
        });
        if (data?.updateTask) {
          sileo.success({
            title: 'Subtask deleted',
            fill: 'var(--sileo-delete-bg)',
          });
          onSave(data.updateTask);
          onClose();
        }
      } catch (e) {
        console.error(e);
      }
      return;
    }

    // 2. Handle Regular Task Deletion
    if (onDelete) {
      onDelete(initialTask.id);
      return;
    }

    try {
      const isGoogleTask =
        (initialTask as Task & { task_type?: string }).task_type ===
        'GoogleTask';

      if (isGoogleTask) {
        // GoogleTask — delete via REST API directly
        const eventId = initialTask.google_event_id || initialTask.id;
        await deleteGoogleEvent(eventId);
      } else {
        // PlatformTask — delete via GraphQL (backend handles Google sync if needed)
        await deleteTaskMutation({
          variables: { id: initialTask.id },
          refetchQueries: [
            { query: GET_TASKS, variables: { userId: user?.id } },
            { query: GET_WORKSPACES, variables: { search: '' } },
          ],
        });
      }
      dispatch(removeTask({ id: initialTask.id }));
      resetForm();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveWorkspace = async (workspaceId: string) => {
    try {
      await removeWorkspaceMutation({
        variables: { id: workspaceId },
        refetchQueries: [{ query: GET_TASKS, variables: { userId: user?.id } }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSave,
    handleUpdate,
    handleDelete,
    handleRemoveWorkspace,
    generateMeetLinkNow,
    loadingSave,
  };
};
