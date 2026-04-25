import { WorkspaceEmptyState } from '@/utils';
import { WorkspaceEditor } from './components/Editor/WorkspaceEditor';

import { useWorkspace } from './hooks/useWorkspace.hook';
import { WorkspaceLibrary } from './components/Library/WorkspaceLibrary';
import { OnboardingWrapper } from '@/components/Onboarding/OnboardingWrapper';
import type { Step } from 'react-joyride';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_WORKSPACE_BY_ID, GET_WORKSPACES } from './workspaces.graphql';
import { useEffect, useState } from 'react';
import type { WorkspaceProps, WorkspaceTypes } from './types/workspace.types';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

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
    handleUpdateTask,
    tasksData,
    selectedSubtaskIndex,
  } = useWorkspace();

  const [runOnboarding, setRunOnboarding] = useState(() => {
    return localStorage.getItem('onboarding_workspace_completed') !== 'true';
  });

  const onboardingSteps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <Box>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Welcome to Your Workspace! 🧠
          </Typography>
          <Typography variant="body2">
            This is where you plan your strategy and organize your thoughts.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#joyride-workspace-search',
      content: 'Quickly find your notes or folders using the search bar.',
    },
    {
      target: '#joyride-workspace-folders',
      content: 'Organize your notes into custom folders to keep everything structured.',
    },
    {
      target: '#joyride-workspace-create-note',
      content: 'Start a new strategic note to capture your next big idea.',
    },
  ];

  const handleFinishOnboarding = () => {
    setRunOnboarding(false);
    localStorage.setItem('onboarding_workspace_completed', 'true');
  };
  const { data: workspacesData, loading: workspacesLoading } = useQuery(GET_WORKSPACES, { 
    variables: { search: '' },
    skip: isEditorOpen 
  });
  const [getWorkspaceById] = useLazyQuery(GET_WORKSPACE_BY_ID);
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceIdParam = searchParams.get('workspaceId');

  const hasWorkspaces = (workspacesData?.workspaces?.length ?? 0) > 0;

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
      <>
        <div id="joyride-workspace-editor" style={{ height: '100%', width: '100%' }}>
          <WorkspaceEditor
            onBack={() => {
              onEditorChange(false);
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
            handleUpdateTask={handleUpdateTask}
            tasksData={tasksData}
            onStartFocus={onStartFocus}
            onOpenTaskDetails={onOpenTaskDetails}
            isRightSidebarOpen={isSidebarOpen}
            setIsRightSidebarOpen={onSidebarChange}
          />
        </div>
        <OnboardingWrapper
          steps={onboardingSteps}
          run={runOnboarding}
          onFinish={handleFinishOnboarding}
        />
      </>
    );
  }

  // Show a blank screen while loading to avoid flickering between states
  if (workspacesLoading) return null;

  if (hasWorkspaces) {
    return (
      <>
        <div id="joyride-workspace-library" style={{ height: '100%', width: '100%' }}>
          <WorkspaceLibrary onCreate={handleCreateNew} onSelect={handleSelectWorkspace} />
        </div>
        <OnboardingWrapper
          steps={onboardingSteps}
          run={runOnboarding}
          onFinish={handleFinishOnboarding}
        />
      </>
    );
  }

  return (
    <>
      <div id="joyride-workspace-empty" style={{ height: '100%', width: '100%' }}>
        <WorkspaceEmptyState onCreate={handleCreateNew} />
      </div>
      <OnboardingWrapper
        steps={onboardingSteps}
        run={runOnboarding}
        onFinish={handleFinishOnboarding}
      />
    </>
  );
};

export default Workspace;
