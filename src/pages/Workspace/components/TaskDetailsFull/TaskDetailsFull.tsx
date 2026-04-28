import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  FlashOn as FlashOnIcon,
  Check as CheckIcon,
  AccessTime as AccessTimeIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import {
  getPriorityFromLevel,
  formatDuration,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type { TaskSearchItems } from '../../types/workspace.types';

// Import local styles
import {
  SidebarTopNav,
  SidebarBreadcrumbs,
  SidebarTaskTitle,
  PropertyGrid,
  PropertyCard,
  PropertyLabel,
  PropertyValue,
  SidebarSubtaskList,
  SidebarSubtaskItem,
  SidebarFooter,
  ProgressSection,
  ProgressBar,
  ViewTaskButton,
  SectionSubtitle,
  DescriptionContainer,
  SubtaskCheck,
  FocusButton,
} from './TaskDetailsFull.styles';

// Import shared styles from WorkspaceEditor
import { MarkDoneButton } from '../Editor/WorkspaceEditor.styles';

interface TaskDetailsFullProps {
  task: TaskSearchItems;
  onClose: () => void;
  onMarkDone?: (task: TaskSearchItems) => void;
  onStartFocus?: (task: TaskSearchItems, subtaskIndex?: number | null) => void;
  onToggleSubtask?: (taskId: string, index: number) => void;
  activeFocusTaskId?: string | null;
}

export const TaskDetailsFull: React.FC<TaskDetailsFullProps> = ({
  task,
  onClose,
  onMarkDone,
  onStartFocus,
  onToggleSubtask,
  activeFocusTaskId,
}) => {
  const isTaskInFocus = activeFocusTaskId === task.id;
  const theme = useTheme();
  const [selectedSubtaskDetails, setSelectedSubtaskDetails] = React.useState<
    NonNullable<TaskSearchItems['subtasks']>[0] | null
  >(null);

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const completedSubtasksCount =
    task.subtasks?.filter((s) => s.completed).length || 0;
  const progressPercent = hasSubtasks
    ? Math.round((completedSubtasksCount / (task.subtasks?.length || 1)) * 100)
    : 0;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        pt: 1,
        overflowY: 'auto',
      }}
    >
      <SidebarTopNav>
        <Button
          onClick={onClose}
          startIcon={
            <KeyboardArrowRightIcon
              sx={{ fontSize: 20, color: theme.palette.text.primary }}
            />
          }
          sx={{
            textTransform: 'none',
            color: theme.palette.text.primary,
            fontWeight: 700,
            fontSize: '14px',
            padding: 0,
            minWidth: 'auto',
            '&:hover': {
              bgcolor: 'transparent',
              opacity: 0.8,
            },
          }}
        >
          Task Details
        </Button>
        {isTaskInFocus ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: `${theme.palette.primary.main}15`,
              color: theme.palette.primary.main,
              px: 2,
              borderRadius: '99px',
              border: `1px solid ${theme.palette.primary.main}33`,
              height: '32px',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: theme.palette.primary.main,
                boxShadow: `0 0 8px ${theme.palette.primary.main}`,
              }}
            />
            <Typography variant="caption" fontWeight={700} letterSpacing={1}>
              IN PROGRESS
            </Typography>
          </Box>
        ) : (
          <Button
            variant="contained"
            startIcon={<FlashOnIcon sx={{ fontSize: 16 }} />}
            onClick={() => onStartFocus && onStartFocus(task)}
            sx={{
              minWidth: 'auto',
              padding: '6px 16px',
              fontSize: '11px',
              height: '32px',
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Start Focus Mode
          </Button>
        )}
      </SidebarTopNav>

      <SidebarBreadcrumbs>
        WORKSPACE / {task.category || 'PROJECTS'}
      </SidebarBreadcrumbs>
      <SidebarTaskTitle>{task.title}</SidebarTaskTitle>

      <PropertyGrid>
        <PropertyCard
          sx={{
            border: `1px solid ${
              task.status === 'DONE'
                ? theme.palette.success.main
                : task.status === 'IN_PROGRESS'
                  ? theme.palette.primary.main
                  : theme.palette.warning.main
            }40`,
            bgcolor: `${
              task.status === 'DONE'
                ? theme.palette.success.main
                : task.status === 'IN_PROGRESS'
                  ? theme.palette.primary.main
                  : theme.palette.warning.main
            }08`,
          }}
        >
          <PropertyLabel>STATUS</PropertyLabel>
          <PropertyValue>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor:
                  task.status === 'DONE'
                    ? theme.palette.success.main
                    : task.status === 'IN_PROGRESS'
                      ? theme.palette.primary.main
                      : theme.palette.warning.main,
              }}
            />
            {task.status === 'IN_PROGRESS'
              ? 'In Progress'
              : task.status?.replace('_', ' ') || 'Todo'}
          </PropertyValue>
        </PropertyCard>
        <PropertyCard
          sx={{
            border: `1px solid ${
              getPriorityFromLevel(Number(task.priority_level)) === 'High'
                ? theme.palette.error.main
                : getPriorityFromLevel(Number(task.priority_level)) === 'Med'
                  ? theme.palette.warning.main
                  : theme.palette.success.main
            }40`,
            bgcolor: `${
              getPriorityFromLevel(Number(task.priority_level)) === 'High'
                ? theme.palette.error.main
                : getPriorityFromLevel(Number(task.priority_level)) === 'Med'
                  ? theme.palette.warning.main
                  : theme.palette.success.main
            }08`,
          }}
        >
          <PropertyLabel>PRIORITY</PropertyLabel>
          <PropertyValue>
            <FlashOnIcon
              sx={{
                fontSize: 12,
                color:
                  getPriorityFromLevel(Number(task.priority_level)) === 'High'
                    ? theme.palette.error.main
                    : '#f59e0b',
              }}
            />
            {getPriorityFromLevel(Number(task.priority_level))}
          </PropertyValue>
        </PropertyCard>
        <PropertyCard sx={{ bgcolor: theme.palette.background.default }}>
          <PropertyLabel>ESTIMATE</PropertyLabel>
          <PropertyValue>
            <AccessTimeIcon
              sx={{ fontSize: 12, color: theme.palette.text.secondary }}
            />
            {task.estimate_timer ? formatDuration(task.estimate_timer) : '0h'}
          </PropertyValue>
        </PropertyCard>
      </PropertyGrid>

      {task.links && task.links.length > 0 && (
        <>
          <SectionSubtitle>Links & Resources</SectionSubtitle>
          <Box display="flex" flexDirection="column" gap={1} mb={3}>
            {task.links.map((link, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderRadius: '8px',
                  bgcolor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <LinkIcon
                    sx={{ fontSize: 18, color: theme.palette.primary.main }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        lineHeight: 1.2,
                      }}
                    >
                      {link.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        display: 'block',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {link.url}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: '4px',
                    ...(link.title.toLowerCase().includes('meet') && {
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      border: 'none',
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                        border: 'none',
                      },
                    }),
                  }}
                >
                  {link.title.toLowerCase().includes('meet') ? 'JOIN' : 'OPEN'}
                </Button>
              </Box>
            ))}
          </Box>
        </>
      )}

      {/* Main Description */}
      <SectionSubtitle>Description</SectionSubtitle>
      <DescriptionContainer
        dangerouslySetInnerHTML={{
          __html:
            task.notes_encrypted && task.notes_encrypted !== '<p></p>'
              ? task.notes_encrypted
              : '<p style="color: grey; font-style: italic;">No description provided for this task.</p>',
        }}
      />

      {hasSubtasks && (
        <>
          <SectionSubtitle>
            Subtasks ({task.subtasks?.length || 0})
          </SectionSubtitle>
          <ProgressSection>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                fontWeight={700}
                color={theme.palette.text.primary}
              >
                {completedSubtasksCount} of {task.subtasks?.length} completed
              </Typography>
              <Typography
                variant="caption"
                fontWeight={700}
                color={theme.palette.primary.main}
              >
                {progressPercent}%
              </Typography>
            </Box>
            <ProgressBar value={progressPercent} />
          </ProgressSection>

          <SidebarSubtaskList>
            {task.subtasks?.map((subtask, index) => {
              const hasSubNotes =
                subtask.notes_encrypted &&
                subtask.notes_encrypted.trim().length > 0 &&
                subtask.notes_encrypted !== '<p></p>';

              const subPriority = subtask.priority_level
                ? getPriorityFromLevel(subtask.priority_level)
                : getPriorityFromLevel(task.priority_level);

              return (
                <SidebarSubtaskItem key={index} completed={subtask.completed}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    sx={{ flex: 1 }}
                  >
                    <SubtaskCheck
                      completed={subtask.completed}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleSubtask) {
                          onToggleSubtask(task.id, index);
                        }
                      }}
                    >
                      {subtask.completed && (
                        <CheckIcon sx={{ fontSize: 12, color: '#fff' }} />
                      )}
                    </SubtaskCheck>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: subtask.completed
                            ? theme.palette.text.secondary
                            : theme.palette.text.primary,
                          fontSize: '13px',
                          fontWeight: 500,
                          textDecoration: subtask.completed
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {subtask.title}
                      </Typography>

                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                        {/* Subtask Status Badge */}
                        <Box
                          sx={{
                            fontSize: '9px',
                            fontWeight: 700,
                            color: subtask.completed
                              ? theme.palette.success.main
                              : theme.palette.warning.main,
                            textTransform: 'uppercase',
                            px: 0.5,
                            borderRadius: '2px',
                            bgcolor: subtask.completed
                              ? `${theme.palette.success.main}15`
                              : `${theme.palette.warning.main}15`,
                          }}
                        >
                          {subtask.completed ? 'Done' : 'In Progress'}
                        </Box>

                        {/* Subtask Priority */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.3,
                          }}
                        >
                          <FlashOnIcon
                            sx={{
                              fontSize: 10,
                              color:
                                subPriority === 'High'
                                  ? theme.palette.error.main
                                  : '#f59e0b',
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '9px',
                              fontWeight: 600,
                              color: theme.palette.text.secondary,
                            }}
                          >
                            {subPriority}
                          </Typography>
                        </Box>

                        {subtask.timer !== undefined && subtask.timer > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: '9px',
                              color: theme.palette.text.secondary,
                              fontFamily: 'monospace',
                            }}
                          >
                            • {formatDuration(subtask.timer)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Tooltip title="Focus Mode on this subtask">
                      <FocusButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onStartFocus) {
                            onStartFocus(task, index);
                          }
                        }}
                      >
                        <PlayArrowIcon sx={{ fontSize: 18 }} />
                      </FocusButton>
                    </Tooltip>

                    {hasSubNotes && (
                      <Tooltip title="View subtask notes">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubtaskDetails(subtask);
                          }}
                          sx={{
                            color: theme.palette.info.main,
                            '&:hover': {
                              bgcolor: `${theme.palette.info.main}15`,
                            },
                          }}
                        >
                          <LaunchIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </SidebarSubtaskItem>
              );
            })}
          </SidebarSubtaskList>
        </>
      )}

      {/* Subtask Info Dialog */}
      <Dialog
        open={!!selectedSubtaskDetails}
        onClose={() => setSelectedSubtaskDetails(null)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: '12px',
            border: `1px solid ${theme.palette.divider}`,
            minWidth: '400px',
            maxWidth: '500px',
            backgroundImage: 'none',
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: theme.palette.text.primary, fontSize: '14px' }}
          >
            {selectedSubtaskDetails?.title}
          </Typography>
          <IconButton
            onClick={() => setSelectedSubtaskDetails(null)}
            sx={{
              color: theme.palette.text.secondary,
              padding: '6px',
              '&:hover': {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: '24px !important' }}>
          <Box
            sx={{
              color: theme.palette.text.primary,
              fontSize: '13px',
              lineHeight: 1.6,
              '& p': {
                margin: 0,
                marginBottom: '12px',
                '&:last-child': { marginBottom: 0 },
              },
              '& ul, & ol': {
                marginTop: '4px',
                marginBottom: '12px',
                paddingLeft: '20px',
              },
              '& a': {
                color: theme.palette.info.main,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              },
            }}
            dangerouslySetInnerHTML={{
              __html:
                selectedSubtaskDetails?.notes_encrypted ||
                'No information provided.',
            }}
          />
        </DialogContent>
      </Dialog>

      <SidebarFooter>
        <ViewTaskButton onClick={onClose} startIcon={undefined}>
          CLOSE
        </ViewTaskButton>
        {!isTaskInFocus && (
          <MarkDoneButton
            onClick={() => onMarkDone && onMarkDone(task)}
            sx={{
              flex: 1,
              padding: '12px',
              fontSize: '11px',
              bgcolor: theme.palette.text.primary,
              color: theme.palette.background.default,
              border: 'none',
              '&:hover': {
                bgcolor: theme.palette.text.secondary,
                color: theme.palette.background.default,
                borderColor: 'transparent',
              },
            }}
          >
            MARK AS DONE
          </MarkDoneButton>
        )}
      </SidebarFooter>
    </Box>
  );
};
