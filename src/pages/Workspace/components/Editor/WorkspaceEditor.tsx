import { Box, Typography, Divider, IconButton } from '@mui/material';
import {
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
  PauseCircle as PauseCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  ChevronRight,
  ChevronLeft,
  AccessTime as AccessTimeIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  FlashOn as FlashOnIcon,
  Folder as FolderIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import {
  getPriorityFromLevel,
  formatDuration,
} from '@/pages/Home/components/CreateTaskModal/CreateTaskModal.utils';
import {
  EditorContainer,
  MainEditorArea,
  EditorHeader,
  RightSidebar,
  FolderBadge,
  EditorContent,
  TitleInput,
  BlockNoteWrapper,
  SidebarHeader,
  BackButton,
  MetadataSection,
  SectionTitle,
  MetaLabel,
  MetaValue,
  StatusBadge,
  MarkDoneButton,
  StartFocusButton,
  ViewTaskButton,
} from './WorkspaceEditor.styles';

// Reusing some styles from Workspace.styles.ts due to shared header components
import {
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  CommandPaletteContainer,
  CommandInputWrapper,
  CommandInput,
  ResultList,
  PaletteFooter,
  CollapsedSearchContainer,
  ResultHeader,
  ResultTitle,
  ResultCount,
  TaskItemContainer,
  SubTaskItemContainer,
  StyledBadge,
  StyledCategory,
  RadioCircle,
  CheckSquare,
  AddTaskButton,
  ItemText,
  CustomTabsContainer,
  CustomTabButton,
} from '../../Workspace.styles';

// BlockNote imports
// BlockNote imports
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import type { PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { SuggestionMenuController, getDefaultReactSlashMenuItems } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useState, useMemo } from 'react';

import type { TaskSearchItems, WorkspaceEditorProps } from '../../types/workspace.types';

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
  }, []); // Only run once on mount

  // Initialize BlockNote editor
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
        <EditorHeader>
          <HeaderLeft>
            <BackButton startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />} onClick={onBack}>
              BACK TO WORKSPACES
            </BackButton>
          </HeaderLeft>

          <HeaderCenter sx={{ position: 'relative', zIndex: 50, mx: 2 }}>
            <Box sx={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
              {showPalette ? (
                <CommandPaletteContainer>
                  <CommandInputWrapper>
                    <SearchIcon sx={{ color: 'info.main', fontSize: 20 }} />
                    <CommandInput
                      placeholder="Search tasks to link..."
                      autoFocus
                      value={
                        showPalette && selectTask
                          ? typeof selectedSubtaskIndex === 'number' &&
                            selectTask.subtasks?.[selectedSubtaskIndex]
                            ? selectTask.subtasks[selectedSubtaskIndex].title
                            : selectTask.title
                          : searchTerm
                      }
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onBlur={() => setTimeout(() => setShowPalette(false), 200)}
                      readOnly={!!selectTask} // Maybe make it readonly if selected, or just let them type to search again
                    />
                  </CommandInputWrapper>
                  <ResultList>
                    <ResultHeader>
                      <ResultTitle>AVAILABLE PROJECTS & TASKS</ResultTitle>
                      <ResultCount>{filteredTasks.length} MATCHES</ResultCount>
                    </ResultHeader>
                    <CustomTabsContainer>
                      <CustomTabButton
                        active={filterTab === 'TASKS'}
                        onClick={() => setFilterTab('TASKS')}
                      >
                        TASKS
                      </CustomTabButton>
                      <CustomTabButton
                        active={filterTab === 'SUBTASKS'}
                        onClick={() => setFilterTab('SUBTASKS')}
                      >
                        SUBTASKS
                      </CustomTabButton>
                    </CustomTabsContainer>

                    {filteredTasks.map((task: TaskSearchItems) => {
                      const isSelected = selectTask?.id === task.id;
                      const statusColor =
                        task.status === 'Todo'
                          ? 'info.main'
                          : task.status === 'Done'
                            ? 'success.main'
                            : task.status === 'Pending'
                              ? 'warning.main'
                              : task.status === 'Backlog'
                                ? 'secondary.main'
                                : 'error.main';

                      const statusBg =
                        task.status === 'Todo'
                          ? 'info.light'
                          : task.status === 'Done'
                            ? 'success.light'
                            : task.status === 'Pending'
                              ? 'warning.light'
                              : task.status === 'Backlog'
                                ? 'secondary.light'
                                : 'error.light';

                      return (
                        <Box key={task.id}>
                          {filterTab !== 'SUBTASKS' && (
                            <TaskItemContainer
                              active={isSelected}
                              onClick={() => {
                                handleSelectTask(task, null);
                                setValue('taskId', task.id);
                                setValue('title', task.title);
                                setShowPalette(false);
                              }}
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                              >
                                <Box display="flex" flexDirection="column" gap={0.5}>
                                  <ItemText sx={{ fontWeight: 700, fontSize: '13px' }}>
                                    {task.title}
                                  </ItemText>
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <StyledBadge color={statusColor} bgColor={statusBg}>
                                      {task.status}
                                    </StyledBadge>
                                    {task.category && (
                                      <StyledCategory>{task.category}</StyledCategory>
                                    )}
                                  </Box>
                                </Box>
                                <RadioCircle selected={isSelected} color={statusColor} />
                              </Box>
                            </TaskItemContainer>
                          )}

                          {/* Render Subtasks if any */}
                          {filterTab === 'SUBTASKS' &&
                            task.subtasks?.map((subtask, index) => {
                              const isSubtaskSelected =
                                isSelected && selectedSubtaskIndex === index;
                              return (
                                <SubTaskItemContainer
                                  key={`${task.id}-sub-${index}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectTask(task, index);
                                    setValue('taskId', task.id);
                                    setValue('title', subtask.title);
                                    setShowPalette(false);
                                  }}
                                  sx={{
                                    backgroundColor: isSubtaskSelected
                                      ? 'action.selected'
                                      : 'transparent',
                                    borderLeft: isSubtaskSelected
                                      ? '2px solid'
                                      : '2px solid transparent',
                                    borderColor: 'info.main',
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                    sx={{ flex: 1 }}
                                  >
                                    <SubdirectoryArrowRightIcon
                                      sx={{
                                        color: isSubtaskSelected ? 'info.main' : 'text.disabled',
                                        fontSize: 16,
                                      }}
                                    />
                                    <ItemText
                                      sx={{
                                        color: isSubtaskSelected
                                          ? 'text.primary'
                                          : 'text.secondary',
                                        fontSize: '13px',
                                      }}
                                    >
                                      {subtask.title}
                                    </ItemText>
                                  </Box>

                                  {/* Parent Task Container */}
                                  <Box
                                    sx={{
                                      backgroundColor: 'action.hover',
                                      border: '1px solid',
                                      borderColor: 'divider',
                                      borderRadius: '4px',
                                      padding: '2px 6px',
                                      marginRight: '12px',
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        color: 'text.secondary',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                      }}
                                    >
                                      {task.title}
                                    </Typography>
                                  </Box>

                                  <CheckSquare selected={isSubtaskSelected}>
                                    {isSubtaskSelected && (
                                      <CheckIcon sx={{ fontSize: 12, color: '#0f172a' }} />
                                    )}
                                  </CheckSquare>
                                </SubTaskItemContainer>
                              );
                            })}
                        </Box>
                      );
                    })}
                  </ResultList>
                  <PaletteFooter>
                    <Box display="flex" alignItems="center">
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Press{' '}
                        <Box
                          component="span"
                          sx={{
                            bgcolor: 'divider',
                            px: 0.5,
                            borderRadius: '4px',
                            color: 'text.primary',
                            mx: 0.5,
                          }}
                        >
                          Enter
                        </Box>{' '}
                        to link selection
                      </Typography>
                    </Box>
                    <AddTaskButton>+ Create New Parent Task</AddTaskButton>
                  </PaletteFooter>
                </CommandPaletteContainer>
              ) : selectTask ? (
                <Box display="flex" alignItems="center" gap={2}>
                  <CollapsedSearchContainer
                    onClick={() => setShowPalette(true)}
                    sx={{
                      flex: 1,
                      borderColor: 'action.selected',
                      '&:hover': { borderColor: 'info.main' },
                    }}
                  >
                    <AddIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'info.main',
                        fontWeight: 500,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {typeof selectedSubtaskIndex === 'number' &&
                      selectTask.subtasks?.[selectedSubtaskIndex]
                        ? selectTask.subtasks[selectedSubtaskIndex].title
                        : selectTask.title}

                      {typeof selectedSubtaskIndex === 'number' &&
                        selectTask.subtasks?.[selectedSubtaskIndex] && (
                          <Box
                            sx={{
                              backgroundColor: 'action.hover',
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              marginLeft: '12px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '10px',
                                fontWeight: 600,
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                              }}
                            >
                              {selectTask.title}
                            </Typography>
                          </Box>
                        )}
                    </Typography>
                    <CloseIcon
                      sx={{
                        color: 'text.secondary',
                        fontSize: 20,
                        cursor: 'pointer',
                        '&:hover': { color: 'error.main' },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTask(null);
                        setValue('taskId', undefined);
                      }}
                    />
                  </CollapsedSearchContainer>
                </Box>
              ) : (
                <CollapsedSearchContainer onClick={() => setShowPalette(true)}>
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Search tasks to link...
                  </Typography>
                </CollapsedSearchContainer>
              )}
            </Box>
          </HeaderCenter>

          <HeaderRight />
        </EditorHeader>

        <EditorContent>
          <Box display="flex" alignItems="center" gap={1.5}>
            {currentFolder && (
              <FolderBadge bgColor={currentFolder.color}>
                <FolderIcon sx={{ fontSize: 12 }} />
                <Typography variant="caption" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                  {currentFolder.name}
                </Typography>
              </FolderBadge>
            )}
          </Box>

          <TitleInput
            placeholder="Untitled Document"
            value={currentTitle}
            onChange={(e) => setValue('title', e.target.value)}
          />

          <BlockNoteWrapper>
            <BlockNoteView
              editor={editor}
              theme="dark"
              slashMenu={false}
              onChange={() => {
                setValue('content', JSON.stringify(editor.document));
              }}
            >
              <SuggestionMenuController
                triggerCharacter={'/'}
                getItems={async (query) =>
                  getCustomSlashMenuItems(editor).filter((item) =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                  )
                }
              />
            </BlockNoteView>
          </BlockNoteWrapper>
        </EditorContent>
      </MainEditorArea>

      {/* Right Sidebar */}
      <RightSidebar isOpen={isRightSidebarOpen}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isRightSidebarOpen ? 'space-between' : 'center',
            mb: 3,
          }}
        >
          {isRightSidebarOpen && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                letterSpacing={1}
              >
                HIDDEN SIDEBAR
              </Typography>
            </Box>
          )}
          <IconButton
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            {isRightSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {isRightSidebarOpen && (
          <>
            <SidebarHeader sx={{ mb: 0 }}>
              <SectionTitle sx={{ mt: 0 }}>
                {selectedSubtaskIndex !== null ? 'SUBTASK METADATA' : 'TASK METADATA'}
              </SectionTitle>
            </SidebarHeader>

            <MetadataSection>
              {selectedSubtaskIndex === null && selectTask ? (
                <>
                  <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
                    <MetaLabel>Priority</MetaLabel>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'action.hover', // Dark background like screenshot
                        border: `1px solid ${
                          getPriorityFromLevel(Number(selectTask.priority_level)) === 'High'
                            ? 'error.main' // Dark Red border for High
                            : getPriorityFromLevel(Number(selectTask.priority_level)) === 'Med'
                              ? 'warning.main'
                              : 'success.main'
                        }`,
                      }}
                    >
                      <FlagIcon
                        sx={{
                          fontSize: 14,
                          color:
                            getPriorityFromLevel(Number(selectTask.priority_level)) === 'High'
                              ? 'error.main'
                              : getPriorityFromLevel(Number(selectTask.priority_level)) === 'Med'
                                ? 'warning.main'
                                : 'success.main',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color:
                            getPriorityFromLevel(Number(selectTask.priority_level)) === 'High'
                              ? 'error.main' // Light Red text
                              : getPriorityFromLevel(Number(selectTask.priority_level)) === 'Med'
                                ? 'warning.main'
                                : 'success.main',
                        }}
                      >
                        {getPriorityFromLevel(Number(selectTask.priority_level)) === 'High'
                          ? 'Urgent / High'
                          : getPriorityFromLevel(Number(selectTask.priority_level)) === 'Med'
                            ? 'Medium'
                            : 'Low'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
                    <MetaLabel>Status</MetaLabel>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: 'action.hover',
                        border: `1px solid ${
                          selectTask.status === 'Done'
                            ? 'success.main'
                            : selectTask.status === 'Pending'
                              ? 'warning.main'
                              : selectTask.status === 'Backlog'
                                ? 'secondary.main'
                                : 'info.main'
                        }`,
                      }}
                    >
                      {selectTask.status === 'Done' ? (
                        <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      ) : selectTask.status === 'Pending' ? (
                        <PauseCircleIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      ) : (
                        <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'info.main' }} />
                      )}

                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color:
                            selectTask.status === 'DONE'
                              ? 'success.light'
                              : selectTask.status === 'IN_PROGRESS'
                                ? 'info.light'
                                : 'text.secondary',
                        }}
                      >
                        {selectTask.status === 'Pending'
                          ? 'Pending'
                          : selectTask.status === 'Done'
                            ? 'Done'
                            : selectTask.status === 'Backlog'
                              ? 'Backlog'
                              : 'Todo'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
                    <MetaLabel>Estimated Time</MetaLabel>
                    <MetaValue sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {selectTask?.estimate_timer
                        ? formatDuration(selectTask.estimate_timer)
                        : '0h'}
                    </MetaValue>
                  </Box>
                </>
              ) : (
                <>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <MetaLabel>
                      {selectedSubtaskIndex !== null ? 'Subtask Priority' : 'Priority'}
                    </MetaLabel>
                    <MetaValue sx={{ color: 'text.secondary' }}>
                      {selectTask
                        ? getPriorityFromLevel(Number(selectTask.priority_level))
                        : 'None'}
                    </MetaValue>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <MetaLabel>
                      {selectedSubtaskIndex !== null ? 'Subtask Estimate' : 'Estimated'}
                    </MetaLabel>
                    <MetaValue>
                      <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      {selectedSubtaskIndex !== null
                        ? selectTask?.subtasks?.[selectedSubtaskIndex]?.timer
                          ? formatDuration(selectTask.subtasks[selectedSubtaskIndex].timer)
                          : '0h'
                        : selectTask?.estimate_timer
                          ? formatDuration(selectTask.estimate_timer)
                          : '0h'}
                    </MetaValue>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <MetaLabel>
                      {selectedSubtaskIndex !== null ? 'Subtask Status' : 'Status'}
                    </MetaLabel>
                    <StatusBadge>
                      {selectedSubtaskIndex !== null
                        ? selectTask?.subtasks?.[selectedSubtaskIndex]?.completed
                          ? 'Done'
                          : 'Todo'
                        : selectTask?.status || 'Todo'}
                    </StatusBadge>
                  </Box>
                </>
              )}
            </MetadataSection>

            {selectedSubtaskIndex === null && (
              <>
                <Divider sx={{ borderColor: 'divider', mb: 2, mt: 2 }} />
                <ViewTaskButton
                  startIcon={<OpenInNewIcon />}
                  disabled={!selectTask}
                  onClick={() => {
                    if (selectTask && onOpenTaskDetails) {
                      onOpenTaskDetails(selectTask, 'view');
                    }
                  }}
                >
                  View Full Task Details
                </ViewTaskButton>{' '}
              </>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <StartFocusButton
                startIcon={<FlashOnIcon />}
                disabled={!selectTask}
                onClick={() => {
                  const handleTaskFocus = (
                    task?: TaskSearchItems | null,
                    subtaskIndex?: number | null
                  ) => {
                    if (onStartFocus) {
                      onStartFocus(task || selectTask, subtaskIndex);
                    }
                  };
                  if (onStartFocus && selectTask) {
                    handleTaskFocus(selectTask, selectedSubtaskIndex);
                  }
                }}
              >
                Focus Mode
              </StartFocusButton>
              <MarkDoneButton
                disabled={!selectTask}
              >
                Mark Done
              </MarkDoneButton>
            </Box>
          </>
        )}
      </RightSidebar>
    </EditorContainer>
  );
};
