import { useState, useMemo } from 'react';
import {
  useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteEditor, type PartialBlock } from '@blocknote/core';
import {  getDefaultReactSlashMenuItems } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

import type { TaskSearchItems, WorkspaceEditorProps } from '../../types/workspace.types';
import {
  EditorContainer,
  MainEditorArea,
} from './WorkspaceEditor.styles';

// Sub-components
import { EditorHeader } from './components/EditorHeader/EditorHeader';
import { EditorContent } from './components/EditorContent/EditorContent';
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar';

export const WorkspaceEditor = ({
  onBack,
  setValue,
  watch,
  selectTask,
  handleSelectTask,
  tasksData,
  selectedSubtaskIndex,
  onStartFocus,
  onOpenTaskDetails,
  isRightSidebarOpen,
  setIsRightSidebarOpen,
}: WorkspaceEditorProps) => {
  const currentTitle = watch('title');
  const currentContent = watch('content');
  const currentFolder = watch('folder');
  
  const [showPalette, setShowPalette] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState<'TASKS' | 'SUBTASKS'>('TASKS');

  const filteredTasks = useMemo(() => {
    if (!tasksData?.tasks) return [];
    const lowerSearch = searchTerm.toLowerCase();

    return tasksData.tasks
      .map((task: TaskSearchItems) => {
        const taskMatches = task.title.toLowerCase().includes(lowerSearch);
        const subtasks = task.subtasks || [];
        const matchingSubtasks = subtasks.filter((st) =>
          st.title.toLowerCase().includes(lowerSearch)
        );

        if (filterTab === 'TASKS') {
          if (taskMatches) return task;
          return null;
        }

        if (filterTab === 'SUBTASKS') {
          if (matchingSubtasks.length > 0) return { ...task, subtasks: matchingSubtasks };
          return null;
        }

        return null;
      })
      .filter(Boolean) as TaskSearchItems[];
  }, [tasksData, searchTerm, filterTab]);

  const initialContent = useMemo(() => {
    try {
      const parsed = currentContent ? JSON.parse(currentContent) : undefined;
      return Array.isArray(parsed) && parsed.length > 0 ? (parsed as PartialBlock[]) : undefined;
    } catch (e) {
      console.error('Failed to parse workspace content:', e);
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editor = useCreateBlockNote({
    initialContent: initialContent || [
      {
        type: 'paragraph',
        content: 'Welcome to your new workspace! Type / for commands...',
      },
    ],
  });

  const getCustomSlashMenuItems = (editor: BlockNoteEditor) => {
    const defaultItems = getDefaultReactSlashMenuItems(editor);
    return defaultItems.filter(
      (item) =>
        item.title !== 'Image' &&
        item.title !== 'Video' &&
        item.title !== 'Audio' &&
        item.title !== 'File'
    );
  };

  return (
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
        />
      </MainEditorArea>

      <EditorSidebar
        isRightSidebarOpen={isRightSidebarOpen}
        setIsRightSidebarOpen={setIsRightSidebarOpen}
        selectedSubtaskIndex={selectedSubtaskIndex}
        selectTask={selectTask}
        onOpenTaskDetails={onOpenTaskDetails}
        onStartFocus={onStartFocus}
      />
    </EditorContainer>
  );
};
