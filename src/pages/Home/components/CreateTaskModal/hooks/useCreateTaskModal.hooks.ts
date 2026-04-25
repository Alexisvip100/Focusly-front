import { useCallback, useState } from 'react';
import type { UseCreateTaskModalProps } from '../types/CreateTaskModal.types';
import { useTaskFormState } from './useTaskFormState';
import { useTaskCollections } from './useTaskCollections';
import { useTaskMutations } from './useTaskMutations';
import { useSearchParams } from 'react-router-dom';
import { getTimerSuggestions } from '../CreateTaskModal.utils';
import { sileo } from 'sileo';

export const useCreateTaskModal = ({
  onSave,
  onClose,
  onDelete,
  initialStart,
  initialTask,
  parentTask,
  subtaskIndex,
}: UseCreateTaskModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    status, setStatus,
    category, setCategory,
    currentDate, setCurrentDate,
    duration, setDuration,
    realTime, setRealTime,
    color, setColor,
    errors, setErrors,
    handleTitleChange,
    validateForm,
    initialState,
    timeSlotDisplay,
  } = useTaskFormState({ initialStart, initialTask });
  const [shouldGenerateMeet, setShouldGenerateMeet] = useState(false);

  // Use a dummy resetForm for mutations initialization to avoid circular dependency
  const mutations = useTaskMutations({
    onSave,
    onClose,
    onDelete,
    initialTask,
    parentTask,
    subtaskIndex,
    resetForm: () => {}, // Will be overwritten or handled below
  });

  const {
    tags, setTags,
    subtasks, setSubtasks,
    links, setLinks,
    newTag, setNewTag,
    isAddingTag, setIsAddingTag,
    newSubtask, setNewSubtask,
    newSubtaskDuration, setNewSubtaskDuration,
    newLinkTitle, setNewLinkTitle,
    newLinkUrl, setNewLinkUrl,
    isAddingLink, setIsAddingLink,
    handleAddTag,
    handleAddSubtask,
    handleToggleSubtask,
    handleAddLink,
    handleRemoveLink,
    handleUpdateLink,
    initialCollections,
  } = useTaskCollections({
    initialTask,
    onAddLink: (updatedLinks: { title: string; url: string }[]) => {
      if (initialTask?.id) {
        mutations.handleUpdate({
          title,
          description,
          priority,
          status,
          category,
          deadline: currentDate,
          duration,
          realTime,
          tags,
          subtasks,
          links: updatedLinks,
          color,
        }, false);
      }
    },
    onRemoveLink: (updatedLinks: { title: string; url: string }[]) => {
      if (initialTask?.id) {
        mutations.handleUpdate({
          title,
          description,
          priority,
          status,
          category,
          deadline: currentDate,
          duration,
          realTime,
          tags,
          subtasks,
          links: updatedLinks,
          color,
        }, false);
      }
    },
  });

  const resetForm = useCallback(() => {
    setTitle(initialState.title);
    setDescription(initialState.description);
    setPriority(initialState.priority);
    setCategory(initialState.category);
    setCurrentDate(initialState.currentDate);
    setDuration(initialState.duration);
    setColor(initialState.color);
    setRealTime(initialState.realTime);
    setStatus(initialState.status);
    
    setTags(initialCollections.tags);
    setSubtasks(initialCollections.subtasks);
    setLinks(initialCollections.links);
    setNewSubtask('');
    setNewSubtaskDuration('');
    setNewTag('');
    setIsAddingTag(false);
    setIsAddingLink(false);
  }, [initialState, initialCollections, setTitle, setDescription, setPriority, setCategory, setCurrentDate, setDuration, setColor, setRealTime, setStatus, setTags, setSubtasks, setLinks, setNewSubtask, setNewSubtaskDuration, setNewTag, setIsAddingTag, setIsAddingLink]);

  // Inject real resetForm into mutations (assuming useTaskMutations doesn't store it in a way that breaks this)
  const mutationsWithReset = { ...mutations, resetForm };

  const handleSaveWrapper = async () => {
    if (!validateForm()) return;
    await mutationsWithReset.handleSave({
      title,
      description,
      priority,
      status,
      category,
      deadline: currentDate,
      duration,
      realTime,
      tags,
      subtasks,
      links,
      color,
      shouldGenerateMeet,
    });
  };

  const handleUpdateWrapper = async () => {
    if (!validateForm()) return;
    await mutationsWithReset.handleUpdate({
      title,
      description,
      priority,
      status,
      category,
      deadline: currentDate,
      duration,
      realTime,
      tags,
      subtasks,
      links,
      color,
      shouldGenerateMeet,
    });
  };

  const createURLWorkSpace = (workspaceId: string): void => {
    if (workspaceId) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tab', 'Workspace');
      newParams.set('workspaceId', workspaceId);
      newParams.delete('taskId');
      setSearchParams(newParams);
    }
  };

  const [isGeneratingMeet, setIsGeneratingMeet] = useState(false);

  const handleGenerateMeet = async () => {
    setIsGeneratingMeet(true);
    try {
      const meetUrl = await mutationsWithReset.generateMeetLinkNow(undefined, {
        title,
        description,
        deadline: currentDate ?? undefined,
        duration,
      });
      if (meetUrl) {
        handleAddLink('Google Meet', meetUrl);
        setShouldGenerateMeet(true);
        sileo.success({
          title: 'Google Meet link generated!',
          description: 'Link added to resources.',
          fill: 'var(--sileo-success-bg)',
        });
      } else {
        sileo.error({
          title: 'Could not generate Meet link',
          description: 'Make sure you are signed in with Google.',
          fill: 'var(--sileo-error-bg)',
        });
      }
    } catch {
      sileo.error({
        title: 'Error generating Meet link',
        fill: 'var(--sileo-error-bg)',
      });
    } finally {
      setIsGeneratingMeet(false);
    }
  };

  const handleTimerChange = (
    value: string,
    setter: (v: string) => void,
    setSuggestions: (s: string[]) => void,
    setAnchor: (el: HTMLDivElement | null) => void,
    target: HTMLDivElement
  ) => {
    setter(value);
    const suggestions = getTimerSuggestions(value);
    setSuggestions(suggestions);
    setAnchor(suggestions.length > 0 ? target : null);
  };

  const hasMeetLink = shouldGenerateMeet || links.some(l => l.url.includes('meet.google.com') || l.title.includes('Google Meet') || l.url.includes('hangouts'));

  return {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    status, setStatus,
    category, setCategory,
    currentDate, setCurrentDate,
    duration, setDuration,
    realTime, setRealTime,
    color, setColor,
    errors, setErrors,
    handleTitleChange,
    validateForm,
    timeSlotDisplay,
    tags, setTags,
    subtasks, setSubtasks,
    links, setLinks,
    newTag, setNewTag,
    isAddingTag, setIsAddingTag,
    newSubtask, setNewSubtask,
    newSubtaskDuration, setNewSubtaskDuration,
    newLinkTitle, setNewLinkTitle,
    newLinkUrl, setNewLinkUrl,
    isAddingLink, setIsAddingLink,
    handleAddTag,
    handleAddSubtask,
    handleToggleSubtask,
    handleAddLink,
    handleRemoveLink,
    handleUpdateLink,
    ...mutationsWithReset,
    handleSave: handleSaveWrapper,
    handleUpdate: handleUpdateWrapper,
    resetForm,
    createURLWorkSpace,
    shouldGenerateMeet,
    setShouldGenerateMeet,
    isGeneratingMeet,
    handleGenerateMeet,
    handleTimerChange,
    hasMeetLink,
  };
};
