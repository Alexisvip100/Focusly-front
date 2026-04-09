import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog,
  Slide,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import {
  Close as CloseIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  FlashOn as FlashOnIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  PauseCircle as PauseCircleIcon,
  CheckCircle as CheckCircleIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
  History as HistoryIcon,
  AccessTime as AccessTimeIcon,
  Folder as FolderIcon,
  KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
  OpenInFull as OpenInFullIcon
} from '@mui/icons-material';

import type { FocusModeProps } from './FocusMode.types';
import type { Task, TaskStatus } from '@/redux/tasks/task.types';
import { EndSessionModal } from './components/EndSessionModal';
import { CompletesSessionModal } from './components/CompletesSessionModal';
import { getPriorityFromLevel } from './../CreateTaskModal/CreateTaskModal.utils';
import {
  MiniModeContainer,
  MiniTimerBox,
  MiniInfoBox,
  MiniControlsBox,
  MiniExpandButton,
  MiniPlayButton,
  RippleDot,
  TimerCard,
  CurrentTaskBadge,
  HeaderContainer,
  HeaderTitleGroup,
  HeaderActionGroup,
  HeaderIconButton,
  MainContentContainer,
  TaskTitleContainer,
  TaskMetadataContainer,
  TimerContainer,
  TimerSeparator,
  ProgressContainer,
  ProgressLabels,
  FooterContainer,
  AddTimeButton,
  PlayPauseButton,
  CompleteButton,
  FocusModeLayout,
  MainArea,
  getDialogPaperProps,
} from './FocusMode.styles';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { useFocusMode } from './hooks/useFocusMode.hooks';

export const FocusMode: React.FC<FocusModeProps> = ({
  open,
  onClose,
  task,
  onActiveChange,
  subtaskIndex,
}) => {
  const { ui, timer, tasks } = useFocusMode({
    task,
    onActiveChange,
    subtaskIndex,
    onClose,
  });

  const {
    viewMode,
    setViewMode,
    isSidebarOpen,
    setIsSidebarOpen,
    showExitConfirmation,
    setShowExitConfirmation,
    isSessionCompleted,
    position,
    handleMouseDown,
    handleCloseRequest,
    confirmExit,
  } = ui;

  const { timeLeft, setTimeLeft, progress, formatTime, isActive, setIsActive } = timer;

  const { activeItem, todaysTasks, handleCompleteTask, handleUpdateStatus, handleUpdatePriority } =
    tasks;

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [statusAnchor, setStatusAnchor] = React.useState<null | HTMLElement>(null);
  const [priorityAnchor, setPriorityAnchor] = React.useState<null | HTMLElement>(null);

  // Update browser tab title with remaining time only when timer is running
  useEffect(() => {
    if (isActive) {
      const formatted = formatTime(timeLeft);
      document.title = `${formatted} – Focus Mode`;
    } else {
      document.title = 'Focusly';
    }

    // Cleanup title when component unmounts
    return () => {
      document.title = 'Focusly';
    };
  }, [timeLeft, formatTime, isActive]);

  return (
    <>
      <Dialog
        fullScreen
        open={open && viewMode === 'full'}
        onClose={handleCloseRequest}
        TransitionComponent={Transition}
        PaperProps={getDialogPaperProps(theme)}
      >
        <FocusModeLayout>
          <MainArea>
            <HeaderContainer>
              <HeaderTitleGroup>
                {!isSidebarOpen && (
                  <IconButton
                    onClick={() => setIsSidebarOpen(true)}
                    sx={{ color: theme.palette.text.secondary, mr: 1 }}
                  >
                    <KeyboardDoubleArrowRightIcon />
                  </IconButton>
                )}
                <IconButton
                  sx={{
                    color: '#fff',
                    p: 0.5,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    mr: 1.5,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    letterSpacing: 1,
                    fontSize: '0.75rem',
                  }}
                >
                  FOCUS MODE
                </Typography>
              </HeaderTitleGroup>
              <HeaderActionGroup>
                <HeaderIconButton onClick={() => setViewMode('mini')}>
                  <RemoveIcon />
                </HeaderIconButton>
                <HeaderIconButton onClick={handleCloseRequest}>
                  <CloseIcon />
                </HeaderIconButton>
              </HeaderActionGroup>
            </HeaderContainer>

            <MainContentContainer>
              {isSessionCompleted ? (
                <CompletesSessionModal
                  activeTask={activeItem as unknown as Task}
                  todaysTasks={todaysTasks as unknown as Task[]}
                  onClose={onClose}
                />
              ) : (
                <>
                  <TaskTitleContainer>
                    <CurrentTaskBadge>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: '#3b82f6',
                          boxShadow: '0 0 8px #3b82f6',
                        }}
                      />
                      Active Session
                    </CurrentTaskBadge>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        mt: 2,
                        mb: 1.5,
                        fontSize: '3.5rem',
                        letterSpacing: '-0.02em',
                        background: isDark
                          ? 'linear-gradient(to right, #fff, #94a3b8)'
                          : `linear-gradient(to right, ${theme.palette.text.primary}, ${theme.palette.text.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                      }}
                    >
                      {activeItem?.title || 'Select a task'}
                    </Typography>
                    <TaskMetadataContainer>
                      {activeItem?.workspace?.folder && (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: 'rgba(255,255,255,0.05)',
                            }}
                          >
                            <FolderIcon sx={{ fontSize: 16, color: activeItem.workspace.folder.color || 'primary.main' }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: activeItem.workspace.folder.color || 'primary.main' }}>
                              {activeItem.workspace.folder.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mx: 0.5, opacity: 0.5 }}>
                            •
                          </Typography>
                        </>
                      )}

                      <Box
                        onClick={(e) => setStatusAnchor(e.currentTarget)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            color: theme.palette.text.primary,
                            bgcolor: 'rgba(255,255,255,0.05)',
                          },
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          transition: 'all 0.2s',
                        }}
                      >
                        {(() => {
                          const status = activeItem?.status || 'Todo';
                          switch (status) {
                            case 'Done':
                              return <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />;
                            case 'Pending':
                              return <PauseCircleIcon sx={{ fontSize: 16, color: 'warning.main' }} />;
                            case 'Backlog':
                              return <HistoryIcon sx={{ fontSize: 16, color: 'secondary.main' }} />;
                            default:
                              return <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'info.main' }} />;
                          }
                        })()}
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {activeItem?.status || 'Todo'}
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ mx: 0.5, opacity: 0.5 }}>
                        •
                      </Typography>

                      <Box
                        onClick={(e) => setPriorityAnchor(e.currentTarget)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            color: theme.palette.text.primary,
                            bgcolor: 'rgba(255,255,255,0.05)',
                          },
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          transition: 'all 0.2s',
                        }}
                      >
                        <FlashOnIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {activeItem?.priority_level
                            ? getPriorityFromLevel(Number(activeItem.priority_level))
                            : 'Med'}
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ mx: 0.5, opacity: 0.5 }}>
                        •
                      </Typography>

                      <Box sx={{ px: 1, py: 0.5 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {activeItem?.estimate_timer || 25}m estimated
                        </Typography>
                      </Box>
                    </TaskMetadataContainer>

                    {/* Status Menu */}
                    <Menu
                      anchorEl={statusAnchor}
                      open={Boolean(statusAnchor)}
                      onClose={() => setStatusAnchor(null)}
                      PaperProps={{
                        sx: {
                          bgcolor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                          minWidth: 160,
                        },
                      }}
                    >
                      {[
                        {
                          label: 'Todo',
                          icon: (
                            <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'info.main' }} />
                          ),
                        },
                        {
                          label: 'Pending',
                          icon: <PauseCircleIcon sx={{ fontSize: 18, color: 'warning.main' }} />,
                        },
                        {
                          label: 'Backlog',
                          icon: <HistoryIcon sx={{ fontSize: 18, color: 'secondary.main' }} />,
                        },
                        {
                          label: 'Done',
                          icon: <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />,
                        },
                      ].map((option) => (
                        <MenuItem
                          key={option.label}
                          onClick={() => {
                            handleUpdateStatus(option.label as TaskStatus);
                            setStatusAnchor(null);
                          }}
                          sx={{ gap: 1.5, py: 1 }}
                        >
                          {option.icon}
                          <Typography variant="body2">{option.label}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>

                    {/* Priority Menu */}
                    <Menu
                      anchorEl={priorityAnchor}
                      open={Boolean(priorityAnchor)}
                      onClose={() => setPriorityAnchor(null)}
                      PaperProps={{
                        sx: {
                          bgcolor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                          minWidth: 160,
                        },
                      }}
                    >
                      {[
                        { level: 1, label: 'Low', color: theme.palette.success.main },
                        { level: 2, label: 'Med', color: theme.palette.warning.main },
                        { level: 3, label: 'High', color: theme.palette.error.main },
                        { level: 4, label: 'Critical', color: theme.palette.error.dark },
                      ].map((p) => (
                        <MenuItem
                          key={p.level}
                          onClick={() => {
                            handleUpdatePriority(p.level);
                            setPriorityAnchor(null);
                          }}
                          sx={{ gap: 1.5, py: 1 }}
                        >
                          <FlashOnIcon sx={{ fontSize: 18, color: p.color }} />
                          <Typography variant="body2">{p.label}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                    {activeItem?.isSubtask && (
                      <Box sx={{ mt: 1, display: 'inline-flex' }}>
                        <Typography
                          sx={{
                            color: '#3b82f6',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          SUBTASK
                        </Typography>
                      </Box>
                    )}
                  </TaskTitleContainer>

                  <TimerContainer>
                    <TimerCard>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '6rem',
                          lineHeight: 1,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {formatTime(timeLeft).split(':')[0]}
                      </Typography>
                    </TimerCard>
                    <TimerSeparator>:</TimerSeparator>
                    <TimerCard isSeconds>
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '6rem',
                          lineHeight: 1,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {formatTime(timeLeft).split(':')[1]}
                      </Typography>
                    </TimerCard>
                  </TimerContainer>

                  <ProgressContainer>
                    <ProgressLabels>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                      >
                        Session Progress
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                      >
                        {Math.round(progress)}%
                      </Typography>
                    </ProgressLabels>
                    <Box
                      sx={{
                        height: 6,
                        width: '100%',
                        bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(226, 232, 240, 0.5)',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          width: `${progress}%`,
                          bgcolor: '#3b82f6',
                          transition: 'width 1s linear',
                          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                        }}
                      />
                    </Box>
                  </ProgressContainer>

                  <FooterContainer sx={{ mt: 8 }}>
                    <AddTimeButton
                      startIcon={<HistoryIcon />}
                      onClick={() => setTimeLeft((prev) => prev + 5 * 60)}
                    >
                      +5m
                    </AddTimeButton>

                    <PlayPauseButton onClick={() => setIsActive(!isActive)}>
                      {isActive ? (
                        <PauseIcon sx={{ fontSize: 32 }} />
                      ) : (
                        <PlayArrowIcon sx={{ fontSize: 32 }} />
                      )}
                    </PlayPauseButton>

                    <CompleteButton
                      startIcon={<CheckIcon />}
                      onClick={() => {
                        handleCompleteTask();
                      }}
                    >
                      Complete Task
                    </CompleteButton>
                  </FooterContainer>
                </>
              )}
            </MainContentContainer>
          </MainArea>
        </FocusModeLayout>

        <EndSessionModal
          open={showExitConfirmation}
          onClose={() => setShowExitConfirmation(false)}
          onConfirm={confirmExit}
        />
      </Dialog>

      {viewMode === 'mini' && open && (
        <MiniModeContainer
          onMouseDown={handleMouseDown}
          sx={{
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
            ...(position && {
              left: position.x,
              top: position.y,
              bottom: 'auto',
              right: 'auto',
            }),
          }}
        >
          <RippleDot />
          <MiniTimerBox>
            <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
              {formatTime(timeLeft)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, fontSize: '10px' }}
            >
              LEFT
            </Typography>
          </MiniTimerBox>
          <MiniInfoBox>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {activeItem?.title || 'Focus Session'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {Math.round(progress)}% Complete
              </Typography>
            </Box>
          </MiniInfoBox>
          <MiniControlsBox>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <MiniPlayButton size="small" onClick={() => setIsActive(!isActive)}>
                {isActive ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
              </MiniPlayButton>

              <IconButton size="small" sx={{ color: '#ef4444' }} onClick={handleCloseRequest}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <MiniExpandButton size="small" onClick={() => setViewMode('full')}>
              <OpenInFullIcon fontSize="small" />
            </MiniExpandButton>
          </MiniControlsBox>
        </MiniModeContainer>
      )}
    </>
  );
};
