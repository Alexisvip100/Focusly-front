import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Search as SearchIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  CommandPaletteContainer,
  CommandInputWrapper,
  CommandInput,
  ResultList,
  ResultHeader,
  ResultTitle,
  ResultCount,
  CustomTabsContainer,
  CustomTabButton,
  TaskItemContainer,
  SubTaskItemContainer,
  StyledBadge,
  StyledCategory,
  RadioCircle,
  CheckSquare,
  PaletteFooter,
  AddTaskButton,
  CollapsedSearchContainer,
  ItemText,
} from './SearchPalette.styles';
import type { TaskSearchItems } from '../../../../types/workspace.types';

interface SearchPaletteProps {
  showPalette: boolean;
  setShowPalette: (b: boolean) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filteredTasks: TaskSearchItems[];
  filterTab: 'TASKS' | 'SUBTASKS';
  setFilterTab: (t: 'TASKS' | 'SUBTASKS') => void;
  selectTask: TaskSearchItems | null;
  selectedSubtaskIndex: number | null;
  handleSelectTask: (
    task: TaskSearchItems | null,
    index: number | null,
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (field: any, value: any) => void;
}

export const SearchPalette = ({
  showPalette,
  setShowPalette,
  searchTerm,
  setSearchTerm,
  filteredTasks,
  filterTab,
  setFilterTab,
  selectTask,
  selectedSubtaskIndex,
  handleSelectTask,
  setValue,
}: SearchPaletteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent) => {
    // If the new focus target is inside the palette, don't close it
    if (containerRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    setShowPalette(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
      {showPalette ? (
        <CommandPaletteContainer
          ref={containerRef}
          onBlur={handleBlur}
          tabIndex={-1}
        >
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
              readOnly={!!selectTask}
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
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setFilterTab('TASKS')}
              >
                TASKS
              </CustomTabButton>
              <CustomTabButton
                active={filterTab === 'SUBTASKS'}
                onMouseDown={(e) => e.preventDefault()}
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
                        if (isSelected) {
                          handleSelectTask(null, null);
                          setValue('taskId', undefined);
                        } else {
                          handleSelectTask(task, null);
                          setValue('taskId', task.id);
                          setValue('title', task.title);
                          setShowPalette(false);
                        }
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
                        <RadioCircle
                          selected={isSelected}
                          color={statusColor}
                        />
                      </Box>
                    </TaskItemContainer>
                  )}

                  {filterTab === 'SUBTASKS' &&
                    task.subtasks?.map((subtask, index) => {
                      const isSubtaskSelected =
                        isSelected && selectedSubtaskIndex === index;
                      return (
                        <SubTaskItemContainer
                          key={`${task.id}-sub-${index}`}
                          onClick={(e: MouseEvent<HTMLDivElement>) => {
                            e.stopPropagation();
                            if (isSubtaskSelected) {
                              handleSelectTask(null, null);
                              setValue('taskId', undefined);
                            } else {
                              handleSelectTask(task, index);
                              setValue('taskId', task.id);
                              setValue('title', subtask.title);
                              setShowPalette(false);
                            }
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
                                color: isSubtaskSelected
                                  ? 'info.main'
                                  : 'text.disabled',
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
                              <CheckIcon
                                sx={{ fontSize: 12, color: '#0f172a' }}
                              />
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
            <AddTaskButton onMouseDown={(e) => e.preventDefault()}>
              + Create New Parent Task
            </AddTaskButton>
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
                handleSelectTask(null, null);
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
  );
};
