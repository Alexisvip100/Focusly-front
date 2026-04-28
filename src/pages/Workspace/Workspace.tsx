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
import { BlockNoteEditor } from '@blocknote/core';
import { getDefaultReactSlashMenuItems } from '@blocknote/react';
import { Folder as FolderIcon } from '@mui/icons-material';

export const Workspace = ({
  isEditorOpen,
  onEditorChange,
  onStartFocus,
  onOpenTaskDetails,
  isSidebarOpen,
  onSidebarChange,
  activeFocusTaskId,
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
      content:
        'Organize your notes into custom folders to keep everything structured.',
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

  const { data: workspacesData, loading: workspacesLoading } = useQuery(
    GET_WORKSPACES,
    {
      variables: { search: '' },
    },
  );

  const [getWorkspaceById] = useLazyQuery(GET_WORKSPACE_BY_ID);
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceIdParam = searchParams.get('workspaceId');

  const hasWorkspaces = (workspacesData?.workspaces?.length ?? 0) > 0;

  useEffect(() => {
    const loadWorkspaceFromUrl = async () => {
      if (workspaceIdParam && watch('id') !== workspaceIdParam) {
        try {
          const { data } = await getWorkspaceById({
            variables: { id: workspaceIdParam },
          });
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
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('workspaceId');
          setSearchParams(newParams);
        }
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
    const newParams = new URLSearchParams(searchParams);
    newParams.set('workspaceId', workspace.id);
    setSearchParams(newParams);

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

  const getCustomSlashMenuItems = (editor: BlockNoteEditor) => {
    const defaultItems = getDefaultReactSlashMenuItems(editor);
    return defaultItems.filter(
      (item) =>
        item.title !== 'Image' &&
        item.title !== 'Video' &&
        item.title !== 'Audio' &&
        item.title !== 'File',
    );
  };

  const getWorkspaceMentionMenuItems = (editor: BlockNoteEditor) => {
    if (!workspacesData?.workspaces) return [];

    const currentId = watch('id');
    const otherWorkspaces = workspacesData.workspaces.filter(
      (w: WorkspaceTypes) => w.id !== currentId,
    );

    return otherWorkspaces.map((w: WorkspaceTypes) => ({
      title: w.title,
      icon: (
        <FolderIcon
          sx={{ fontSize: 18, color: w.folder?.color || 'primary.main' }}
        />
      ),
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: 'link',
            href: `/dashboard?tab=Workspace&workspaceId=${w.id}`,
            content: `@${w.title}`,
          },
          {
            type: 'text',
            text: ' ',
            styles: {},
          },
        ]);
      },
    }));
  };

  if (isEditorOpen) {
    return (
      <>
        <div
          id="joyride-workspace-editor"
          style={{ height: '100%', width: '100%' }}
        >
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
            workspaces={workspacesData?.workspaces}
            getCustomSlashMenuItems={getCustomSlashMenuItems}
            getWorkspaceMentionMenuItems={getWorkspaceMentionMenuItems}
            activeFocusTaskId={activeFocusTaskId}
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

  if (workspacesLoading) return null;

  if (hasWorkspaces) {
    return (
      <>
        <div
          id="joyride-workspace-library"
          style={{ height: '100%', width: '100%' }}
        >
          <WorkspaceLibrary
            onCreate={handleCreateNew}
            onSelect={handleSelectWorkspace}
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

  return (
    <>
      <div
        id="joyride-workspace-empty"
        style={{ height: '100%', width: '100%' }}
      >
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
