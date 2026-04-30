import React, { useEffect } from 'react';
import { Dialog, Slide, useTheme } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

import type { FocusModeProps } from './FocusMode.types';
import type { Task } from '@/redux/tasks/task.types';
import { EndSessionModal } from './components/EndSessionModal';
import { CompletesSessionModal } from './components/CompletesSessionModal';
import {
  FocusModeLayout,
  MainArea,
  MainContentContainer,
  getDialogPaperProps,
} from './FocusMode.styles';

// New Sub-components
import { FocusHeader } from './components/FocusHeader';
import { FocusMetadata } from './components/FocusMetadata';
import { FocusTimerDisplay } from './components/FocusTimerDisplay';
import { FocusFooter } from './components/FocusFooter';
import { MiniMode } from './components/MiniMode';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
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
    open,
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

  const { timeLeft, setTimeLeft, progress, formatTime, isActive, setIsActive } =
    timer;

  const {
    activeItem,
    todaysTasks,
    handleCompleteTask,
    handleUpdateStatus,
    handleUpdatePriority,
  } = tasks;

  const theme = useTheme();

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
            <FocusHeader
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setViewMode={setViewMode}
              handleCloseRequest={handleCloseRequest}
            />

            <MainContentContainer>
              {isSessionCompleted ? (
                <CompletesSessionModal
                  activeTask={activeItem as unknown as Task}
                  todaysTasks={todaysTasks as unknown as Task[]}
                  onClose={onClose}
                />
              ) : (
                <>
                  <FocusMetadata
                    activeItem={activeItem}
                    handleUpdateStatus={handleUpdateStatus}
                    handleUpdatePriority={handleUpdatePriority}
                  />

                  <FocusTimerDisplay
                    timeLeft={timeLeft}
                    formatTime={formatTime}
                    progress={progress}
                  />

                  <FocusFooter
                    isActive={isActive}
                    setIsActive={setIsActive}
                    setTimeLeft={setTimeLeft}
                    handleCompleteTask={handleCompleteTask}
                  />
                </>
              )}
            </MainContentContainer>
          </MainArea>
        </FocusModeLayout>
      </Dialog>

      <EndSessionModal
        open={showExitConfirmation}
        onClose={() => setShowExitConfirmation(false)}
        onConfirm={confirmExit}
      />

      {viewMode === 'mini' && open && (
        <MiniMode
          position={position}
          handleMouseDown={handleMouseDown}
          formatTime={formatTime}
          timeLeft={timeLeft}
          isActive={isActive}
          setIsActive={setIsActive}
          activeItem={activeItem}
          progress={progress}
          handleCloseRequest={handleCloseRequest}
          setViewMode={setViewMode}
        />
      )}
    </>
  );
};
