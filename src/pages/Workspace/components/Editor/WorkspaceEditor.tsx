import { useState, useMemo, useEffect } from 'react';
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  type PartialBlock,
} from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

import type {
  TaskSearchItems,
  WorkspaceEditorProps,
} from '../../types/workspace.types';
import { EditorContainer, MainEditorArea } from './WorkspaceEditor.styles';

// Sub-components
import { EditorHeader } from './components/EditorHeader/EditorHeader';
import { EditorContent } from './components/EditorContent/EditorContent';
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar';
import { OnboardingWrapper } from '@/components/Onboarding/OnboardingWrapper';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
  },
});

export const WorkspaceEditor = ({
  onBack,
  setValue,
  watch,
  selectTask,
  handleSelectTask,
  handleUpdateTask,
  tasksData,
  selectedSubtaskIndex,
  onStartFocus,
  onOpenTaskDetails,
  isRightSidebarOpen,
  setIsRightSidebarOpen,
  getCustomSlashMenuItems,
  getWorkspaceMentionMenuItems,
  activeFocusTaskId,
}: WorkspaceEditorProps) => {
  const currentTitle = watch('title');
  const currentContent = watch('content');
  const currentFolder = watch('folder');

  const [showPalette, setShowPalette] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState<'TASKS' | 'SUBTASKS'>('TASKS');

  // Onboarding state
  const [runOnboarding, setRunOnboarding] = useState(() => {
    return (
      localStorage.getItem('onboarding_workspace_editor_completed') !== 'true'
    );
  });

  const handleOnboardingComplete = () => {
    setRunOnboarding(false);
    localStorage.setItem('onboarding_workspace_editor_completed', 'true');
  };

  useEffect(() => {
    if (runOnboarding) {
      localStorage.setItem('onboarding_workspace_editor_completed', 'true');
    }
  }, [runOnboarding]);

  const onboardingSteps = [
    {
      target: '#joyride-editor-search',
      content:
        'Use this search bar to quickly find and link specific tasks or subtasks to your document.',
    },
    {
      target: '#joyride-editor-area',
      content:
        'Welcome to the smart editor! Type "@" to link other workspaces, or type "/" to bring up formatting options and blocks.',
    },
    {
      target: '#joyride-editor-metadata',
      content:
        'Here you can view and update the status, priority, and estimated time of the task linked to this document.',
    },
    {
      target: '#joyride-editor-full-detail',
      content:
        'Need more details? Click here to open the full task view without leaving the editor.',
    },
  ];

  const filteredTasks = useMemo(() => {
    if (!tasksData?.tasks) return [];
    const lowerSearch = searchTerm.toLowerCase();

    return tasksData.tasks
      .map((task: TaskSearchItems) => {
        const taskMatches = task.title.toLowerCase().includes(lowerSearch);
        const subtasks = task.subtasks || [];
        const matchingSubtasks = subtasks.filter((st) =>
          st.title.toLowerCase().includes(lowerSearch),
        );

        if (filterTab === 'TASKS') {
          if (taskMatches) return task;
          return null;
        }

        if (filterTab === 'SUBTASKS') {
          if (matchingSubtasks.length > 0)
            return { ...task, subtasks: matchingSubtasks };
          return null;
        }

        return null;
      })
      .filter(Boolean) as TaskSearchItems[];
  }, [tasksData, searchTerm, filterTab]);

  const initialContent = useMemo(() => {
    try {
      const parsed = currentContent ? JSON.parse(currentContent) : undefined;
      return Array.isArray(parsed) && parsed.length > 0
        ? (parsed as PartialBlock[])
        : undefined;
    } catch (e) {
      console.error('Failed to parse workspace content:', e);
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent || [
      {
        type: 'paragraph',
        content: 'Welcome to your new workspace! Type / for commands...',
      },
    ],
  });

  return (
    <>
      <EditorContainer>
        <MainEditorArea>
          <EditorHeader
            onBack={onBack}
            showPalette={showPalette}
            setShowPalette={setShowPalette}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredTasks={filteredTasks}
            filterTab={filterTab}
            setFilterTab={setFilterTab}
            selectTask={selectTask}
            selectedSubtaskIndex={selectedSubtaskIndex}
            handleSelectTask={handleSelectTask}
            setValue={setValue}
          />

          <EditorContent
            currentFolder={currentFolder}
            currentTitle={currentTitle}
            setTitle={(t) => setValue('title', t)}
            editor={editor}
            onContentChange={() => {
              setValue('content', JSON.stringify(editor.document));
            }}
            getCustomSlashMenuItems={getCustomSlashMenuItems}
            getWorkspaceMentionMenuItems={getWorkspaceMentionMenuItems}
          />
        </MainEditorArea>

        <EditorSidebar
          isRightSidebarOpen={isRightSidebarOpen}
          setIsRightSidebarOpen={setIsRightSidebarOpen}
          selectedSubtaskIndex={selectedSubtaskIndex}
          selectTask={selectTask}
          handleUpdateTask={handleUpdateTask}
          onOpenTaskDetails={onOpenTaskDetails}
          onStartFocus={onStartFocus}
          activeFocusTaskId={activeFocusTaskId}
        />
      </EditorContainer>
      <OnboardingWrapper
        steps={onboardingSteps}
        run={runOnboarding}
        onFinish={handleOnboardingComplete}
      />
    </>
  );
};
