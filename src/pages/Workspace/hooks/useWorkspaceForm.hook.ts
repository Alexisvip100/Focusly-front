import { useCallback, useMemo, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useForm, useWatch } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { GET_WORKSPACES, CREATE_WORKSPACE, UPDATE_WORKSPACE } from '../workspaces.graphql';
import type { WorkspaceFormData } from '../types/workspace.types';
import { DEFAULT_WORKSPACE_DATA } from '@/utils';
import { sileo } from 'sileo';

export const useWorkspaceForm = () => {
  const [createWorkspace] = useMutation(CREATE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES, variables: { search: '' } }],
  });
  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE);

  const { register, watch, setValue, getValues, reset, control } = useForm<WorkspaceFormData>({
    defaultValues: DEFAULT_WORKSPACE_DATA,
  });

  const values = useWatch({ control }) as WorkspaceFormData;

  const saveToBackend = useCallback(
    async (data: WorkspaceFormData) => {
      const savePromise = async () => {
        if (data.id) {
          await updateWorkspace({
            variables: {
              updateWorkspaceInput: {
                id: data.id,
                title: data.title,
                content: data.content,
                taskId: data.taskId,
                saveStatus: data.saveStatus ?? true,
              },
            },
          });
        } else {
          if (data.title === 'Untitled Strategic Plan' && data.content === '[]') {
            return;
          }

          const result = await createWorkspace({
            variables: {
              createWorkspaceInput: {
                title: data.title,
                content: data.content,
                taskId: data.taskId,
                saveStatus: data.saveStatus ?? true,
              },
            },
          });

          if (result.data?.createWorkspace?.id) {
            setValue('id', result.data.createWorkspace.id);
          }
        }
      };

      await sileo.promise(savePromise(), {
        loading: { title: 'Saving...', fill: 'var(--sileo-update-bg)', },
        success: { title: 'Saved!', fill: 'var(--sileo-success-bg)', },
        error: { title: 'Error saving', fill: 'var(--sileo-error-bg)', },
      });
    },
    [createWorkspace, updateWorkspace, setValue]
  );

  const debouncedSave = useMemo(
    () =>
      debounce((data: WorkspaceFormData) => {
        saveToBackend(data);
      }, 1000),
    [saveToBackend]
  );

  const lastId = useRef(values.id);
  const lastSavedValues = useRef(JSON.stringify({ title: values.title, content: values.content }));

  useEffect(() => {
    const currentValues = JSON.stringify({ title: values.title, content: values.content });

    // If we switched workspaces, reset the baseline and don't save yet
    if (values.id !== lastId.current) {
      lastId.current = values.id;
      lastSavedValues.current = currentValues;
      return;
    }

    if (currentValues !== lastSavedValues.current) {
      debouncedSave(values);
      lastSavedValues.current = currentValues;
    }
  }, [values, debouncedSave]);

  return {
    register,
    watch,
    setValue,
    getValues,
    reset,
    control,
    values,
    saveStatus: values.saveStatus || false,
  };
};
