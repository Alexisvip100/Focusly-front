import { 
  Box, 
  Typography, 
  IconButton, 
  Divider,
  Menu,
  MenuItem,
  alpha,
  useTheme
} from '@mui/material';
import {
  ChevronRight,
  ChevronLeft,
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
  PauseCircle as PauseCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  FlashOn as FlashOnIcon,
  OpenInNew as OpenInNewIcon,
  History as HistoryIcon,
  Visibility as VisibilityIcon,
  EventNote as PlannedIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import {
  getPriorityFromLevel,
  getPriorityLevel,
  formatDuration,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type { PriorityType } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import {
  RightSidebar,
  SidebarHeader,
  SectionTitle,
  MetadataSection,
  MetaLabel,
  MetaValue,
  ViewTaskButton,
  StartFocusButton,
  MarkDoneButton,
  DescriptionContainer,
  DescriptionHeader,
} from './EditorSidebar.styles';
import type { TaskSearchItems } from '../../../../types/workspace.types';

interface EditorSidebarProps {
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (b: boolean) => void;
  selectedSubtaskIndex: number | null;
  selectTask: TaskSearchItems | null;
  handleUpdateTask?: (taskId: string, updates: Partial<TaskSearchItems>) => Promise<void>;
  onOpenTaskDetails?: (task: any, mode?: any) => void;
  onStartFocus?: (task: any, subtaskIndex: number | null) => void;
}

export const EditorSidebar = ({
  isRightSidebarOpen,
  setIsRightSidebarOpen,
  selectedSubtaskIndex,
  selectTask,
  handleUpdateTask,
  onOpenTaskDetails,
  onStartFocus,
}: EditorSidebarProps) => {
  const theme = useTheme();
  const [priorityAnchor, setPriorityAnchor] = useState<null | HTMLElement>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);

  const getPriorityColor = (level: number) => {
    const priority = getPriorityFromLevel(level);
    if (priority === 'High') return theme.palette.error.main;
    if (priority === 'Med') return theme.palette.warning.main;
    if (priority === 'Low') return theme.palette.success.main;
    return theme.palette.text.secondary;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Done') return theme.palette.success.main;
    if (status === 'Pending') return theme.palette.warning.main;
    if (status === 'Backlog') return theme.palette.secondary.main;
    if (status === 'Planning') return theme.palette.info.main;
    return theme.palette.info.main;
  };

  const handlePriorityClick = (event: React.MouseEvent<HTMLElement>) => {
    setPriorityAnchor(event.currentTarget);
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchor(event.currentTarget);
  };

  const handlePrioritySelect = async (level: number) => {
    setPriorityAnchor(null);
    if (!selectTask || !handleUpdateTask) return;

    if (selectedSubtaskIndex !== null) {
      const updatedSubtasks = [...(selectTask.subtasks || [])];
      updatedSubtasks[selectedSubtaskIndex] = {
        ...updatedSubtasks[selectedSubtaskIndex],
        priority_level: level,
      };
      await handleUpdateTask(selectTask.id, { subtasks: updatedSubtasks });
    } else {
      await handleUpdateTask(selectTask.id, { priority_level: level });
    }
  };

  const handleStatusSelect = async (status: string) => {
    setStatusAnchor(null);
    if (!selectTask || !handleUpdateTask) return;

    if (selectedSubtaskIndex !== null) {
      const updatedSubtasks = [...(selectTask.subtasks || [])];
      updatedSubtasks[selectedSubtaskIndex] = {
        ...updatedSubtasks[selectedSubtaskIndex],
        status,
        completed: status === 'Done',
      };
      await handleUpdateTask(selectTask.id, { subtasks: updatedSubtasks });
    } else {
      await handleUpdateTask(selectTask.id, { status });
    }
  };

  const handleMarkDone = async () => {
    if (!selectTask || !handleUpdateTask) return;
    await handleStatusSelect('Done');
  };

  const currentStatus = selectedSubtaskIndex !== null
    ? selectTask?.subtasks?.[selectedSubtaskIndex]?.status || (selectTask?.subtasks?.[selectedSubtaskIndex]?.completed ? 'Done' : 'Todo')
    : selectTask?.status || 'Todo';

  const currentPriorityLevel = selectedSubtaskIndex !== null
    ? selectTask?.subtasks?.[selectedSubtaskIndex]?.priority_level ?? 0
    : selectTask?.priority_level ?? 0;

  const cleanDescription = (desc?: string) => {
    if (!desc) return 'No description provided.';
    return desc
      .replace(/\[COLOR:(.*?)\]/g, '')
      .replace(/\[START_DATE:(.*?)\]/g, '')
      .replace(/https?:\/\/(www\.)?(calendar\.google\.com|google\.com\/calendar|meet\.google\.com)[^\s]*/g, '')
      .trim() || 'No description provided.';
  };

  return (
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
              TASK DETAILS
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
            {selectTask ? (
              <>
                <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
                  <MetaLabel>Priority</MetaLabel>
                  <Box
                    onClick={handlePriorityClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'action.hover',
                      border: `1px solid ${alpha(getPriorityColor(Number(currentPriorityLevel)), 0.3)}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: alpha(getPriorityColor(Number(currentPriorityLevel)), 0.1),
                        borderColor: getPriorityColor(Number(currentPriorityLevel)),
                      }
                    }}
                  >
                    <FlagIcon
                      sx={{
                        fontSize: 14,
                        color: getPriorityColor(Number(currentPriorityLevel)),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: getPriorityColor(Number(currentPriorityLevel)),
                      }}
                    >
                      {getPriorityFromLevel(Number(currentPriorityLevel))}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
                  <MetaLabel>Status</MetaLabel>
                  <Box
                    onClick={handleStatusClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'action.hover',
                      border: `1px solid ${alpha(getStatusColor(currentStatus), 0.3)}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: alpha(getStatusColor(currentStatus), 0.1),
                        borderColor: getStatusColor(currentStatus),
                      }
                    }}
                  >
                    {currentStatus === 'Done' ? (
                      <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : currentStatus === 'Pending' ? (
                      <PauseCircleIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                    ) : currentStatus === 'Planning' ? (
                      <PlannedIcon sx={{ fontSize: 16, color: 'info.main' }} />
                    ) : currentStatus === 'Backlog' ? (
                      <HistoryIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'info.main' }} />
                    )}

                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: getStatusColor(currentStatus),
                      }}
                    >
                      {currentStatus}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={3} alignItems="center">
                  <MetaLabel>Estimated Time</MetaLabel>
                  <MetaValue sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {selectedSubtaskIndex !== null
                      ? selectTask?.subtasks?.[selectedSubtaskIndex]?.timer
                        ? formatDuration(selectTask.subtasks[selectedSubtaskIndex].timer)
                        : '0h'
                      : selectTask?.estimate_timer
                        ? formatDuration(selectTask.estimate_timer)
                        : '0h'}
                  </MetaValue>
                </Box>

                <DescriptionContainer>
                  <DescriptionHeader>
                    <DescriptionIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption" fontWeight={700}>DESCRIPTION</Typography>
                  </DescriptionHeader>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      fontSize: '13px'
                    }}
                  >
                    {selectedSubtaskIndex !== null
                      ? cleanDescription(selectTask?.subtasks?.[selectedSubtaskIndex]?.notes_encrypted)
                      : cleanDescription(selectTask?.notes_encrypted)}
                  </Typography>
                </DescriptionContainer>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Select a task to see details
              </Typography>
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
              </ViewTaskButton>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <StartFocusButton
              startIcon={<FlashOnIcon />}
              disabled={!selectTask}
              onClick={() => {
                if (onStartFocus && selectTask) {
                  onStartFocus(selectTask, selectedSubtaskIndex);
                }
              }}
            >
              Focus Mode
            </StartFocusButton>
            <MarkDoneButton 
              disabled={!selectTask || currentStatus === 'Done'}
              onClick={handleMarkDone}
            >
              {currentStatus === 'Done' ? 'Completed' : 'Mark Done'}
            </MarkDoneButton>
          </Box>
        </>
      )}

      {/* Menus */}
      <Menu
        anchorEl={priorityAnchor}
        open={Boolean(priorityAnchor)}
        onClose={() => setPriorityAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: '160px',
            mt: 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '1px solid',
            borderColor: 'divider',
          }
        }}
      >
        {(['High', 'Med', 'Low', 'No priority'] as PriorityType[]).map((p) => (
          <MenuItem 
            key={p} 
            onClick={() => handlePrioritySelect(getPriorityLevel(p))}
            sx={{ gap: 1.5, py: 1.2, borderRadius: '8px', mx: 1, my: 0.5 }}
          >
            <FlagIcon sx={{ fontSize: 18, color: getPriorityColor(getPriorityLevel(p)) }} />
            <Typography variant="body2" fontWeight={600}>{p}</Typography>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={statusAnchor}
        open={Boolean(statusAnchor)}
        onClose={() => setStatusAnchor(null)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: '180px',
            mt: 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '1px solid',
            borderColor: 'divider',
          }
        }}
      >
        {['Todo', 'Planning', 'Pending', 'OnHold', 'Review', 'Done', 'Backlog'].map((s) => (
          <MenuItem 
            key={s} 
            onClick={() => handleStatusSelect(s)}
            sx={{ gap: 1.5, py: 1.2, borderRadius: '8px', mx: 1, my: 0.5 }}
          >
            {s === 'Todo' && <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'info.main' }} />}
            {s === 'Planning' && <PlannedIcon sx={{ fontSize: 18, color: 'info.main' }} />}
            {s === 'Pending' && <PauseCircleIcon sx={{ fontSize: 18, color: 'warning.main' }} />}
            {s === 'OnHold' && <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'error.main' }} />}
            {s === 'Review' && <VisibilityIcon sx={{ fontSize: 18, color: 'secondary.main' }} />}
            {s === 'Done' && <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />}
            {s === 'Backlog' && <HistoryIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
            <Typography variant="body2" fontWeight={600}>{s === 'OnHold' ? 'On Hold' : s}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </RightSidebar>
  );
};
