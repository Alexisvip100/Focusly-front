import { 
  Box, 
  Typography, 
  IconButton, 
  Divider 
} from '@mui/material';
import {
  ChevronRight,
  ChevronLeft,
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
  PauseCircle as PauseCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  AccessTime as AccessTimeIcon,
  FlashOn as FlashOnIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import {
  getPriorityFromLevel,
  formatDuration,
} from '@/pages/Home/components/CreateTaskModal/CreateTaskModal.utils';
import {
  RightSidebar,
  SidebarHeader,
  SectionTitle,
  MetadataSection,
  MetaLabel,
  MetaValue,
  StatusBadge,
  ViewTaskButton,
  StartFocusButton,
  MarkDoneButton
} from './EditorSidebar.styles';
import type { TaskSearchItems } from '../../../../types/workspace.types';

interface EditorSidebarProps {
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (b: boolean) => void;
  selectedSubtaskIndex: number | null;
  selectTask: TaskSearchItems | null;
  onOpenTaskDetails?: (task: any, mode?: any) => void;
  onStartFocus?: (task: any, subtaskIndex: number | null) => void;
}

export const EditorSidebar = ({
  isRightSidebarOpen,
  setIsRightSidebarOpen,
  selectedSubtaskIndex,
  selectTask,
  onOpenTaskDetails,
  onStartFocus,
}: EditorSidebarProps) => {
  const getPriorityColor = (level: number) => {
    const priority = getPriorityFromLevel(level);
    if (priority === 'High') return 'error.main';
    if (priority === 'Med') return 'warning.main';
    return 'success.main';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Done') return 'success.main';
    if (status === 'Pending') return 'warning.main';
    if (status === 'Backlog') return 'secondary.main';
    return 'info.main';
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
                      backgroundColor: 'action.hover',
                      border: `1px solid ${getPriorityColor(Number(selectTask.priority_level))}`,
                    }}
                  >
                    <FlagIcon
                      sx={{
                        fontSize: 14,
                        color: getPriorityColor(Number(selectTask.priority_level)),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: getPriorityColor(Number(selectTask.priority_level)),
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
                      border: `1px solid ${getStatusColor(selectTask.status)}`,
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
                        color: selectTask.status === 'Done' ? 'success.light' : 'text.secondary',
                      }}
                    >
                      {selectTask.status}
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
            <MarkDoneButton disabled={!selectTask}>
              Mark Done
            </MarkDoneButton>
          </Box>
        </>
      )}
    </RightSidebar>
  );
};
