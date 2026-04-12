import { WorkspaceEmptyState } from '@/utils';
import { WorkspaceEditor } from './components/Editor/WorkspaceEditor';

import { useWorkspace } from './hooks/useWorkspace.hook';
import { WorkspaceLibrary } from './components/Library/WorkspaceLibrary';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_HAS_WORKSPACES, GET_WORKSPACE_BY_ID } from './workspaces.graphql';
import { useEffect } from 'react';
import type { WorkspaceProps, WorkspaceTypes } from './types/workspace.types';
import { useSearchParams } from 'react-router-dom';

export const Workspace = ({
  isEditorOpen,
  onEditorChange,
  onStartFocus,
  onOpenTaskDetails,
  isSidebarOpen,
  onSidebarChange,
}: WorkspaceProps) => {
  const {
    register,
    setValue,
    watch,
    getValues,
    reset,
    selectTask,
    handleSelectTask,
    tasksData,
    selectedSubtaskIndex,
  } = useWorkspace();
  const { data: hasWorkspacesData, refetch: refetchHasWorkspaces } = useQuery(GET_HAS_WORKSPACES);
  const [getWorkspaceById] = useLazyQuery(GET_WORKSPACE_BY_ID);
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceIdParam = searchParams.get('workspaceId');

  const hasWorkspaces = hasWorkspacesData?.hasWorkspaces;

  // Sync workspaceId from URL to Editor state
  useEffect(() => {
    const loadWorkspaceFromUrl = async () => {
      if (workspaceIdParam && !isEditorOpen && watch('id') !== workspaceIdParam) {
        try {
          const { data } = await getWorkspaceById({ variables: { id: workspaceIdParam } });
          const workspace = data?.workspace;
          if (workspace) {
            setValue('id', workspace.id);
            setValue('title', workspace.title);
            setValue('content', workspace.content);
            setValue('taskId', workspace.taskId);
            setValue('folderId', workspace.folderId);
            setValue('folder', workspace.folder);
            setValue('saveStatus', true);
            if (workspace.task) {
              handleSelectTask(workspace.task);
            } else {
              handleSelectTask(null);
            }
            onEditorChange(true);
          }
        } catch (error) {
          console.error('Error loading workspace from URL', error);
          // If not found, clear param
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('workspaceId');
          setSearchParams(newParams);
        }
      } else if (!workspaceIdParam && isEditorOpen && watch('id')) {
        // This block handles the case where the user navigates away or clears the ID
        // But we generally want the editor to handle its own close via onBack
      }
    };
    loadWorkspaceFromUrl();
  }, [
    workspaceIdParam,
    isEditorOpen,
    getWorkspaceById,
    onEditorChange,
    setValue,
    handleSelectTask,
    searchParams,
    setSearchParams,
    watch,
  ]);

  useEffect(() => {
    refetchHasWorkspaces();
  }, [isEditorOpen, refetchHasWorkspaces]);

  const handleSelectWorkspace = (workspace: WorkspaceTypes) => {
    // URL Update
    const newParams = new URLSearchParams(searchParams);
    newParams.set('workspaceId', workspace.id);
    setSearchParams(newParams);

    // Load workspace data into form
    setValue('id', workspace.id);
    setValue('title', workspace.title);
    setValue('content', workspace.content);
    setValue('taskId', workspace.taskId);
    setValue('folderId', workspace.folderId);
    setValue('folder', workspace.folder);
    setValue('saveStatus', true);
    if (workspace.task) {
      handleSelectTask(workspace.task);
    } else {
      handleSelectTask(null);
    }
    onEditorChange(true);
  };

  const handleCreateNew = () => {
    reset({
      title: 'Untitled Strategic Plan',
      content: '[]',
      id: undefined,
      taskId: undefined,
      saveStatus: true,
    });
    handleSelectTask(null);
    onEditorChange(true);
  };

  if (isEditorOpen) {
    return (
      <WorkspaceEditor
        onBack={() => {
          onEditorChange(false);
          refetchHasWorkspaces();
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('workspaceId');
          setSearchParams(newParams);
        }}
        register={register}
        setValue={setValue}
        watch={watch}
        getValues={getValues}
        selectTask={selectTask}
        selectedSubtaskIndex={selectedSubtaskIndex}
        handleSelectTask={handleSelectTask}
        tasksData={tasksData}
        onStartFocus={onStartFocus}
        onOpenTaskDetails={onOpenTaskDetails}
        isRightSidebarOpen={isSidebarOpen}
        setIsRightSidebarOpen={onSidebarChange}
      />
    );
  }

  if (hasWorkspaces) {
    return <WorkspaceLibrary onCreate={handleCreateNew} onSelect={handleSelectWorkspace} />;
  }

  return <WorkspaceEmptyState onCreate={handleCreateNew} />;
};

export default Workspace;
