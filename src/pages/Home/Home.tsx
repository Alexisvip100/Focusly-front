import { Box, styled } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar';
import CalendarView from './components/CalendarView';
import RightPanel from './components/RightPanel';
import { Tasks } from '../Tasks/Tasks';
import { TaskBar } from './components/Sidebar/types/Sidebar.types';
import { Insights } from '../Insights/Insights';
import Workspace from '../Workspace/Workspace';
import { ChatAI } from '@/components/chat';
import { FocusMode } from './components/FocusMode/FocusMode';
import { TaskDetailModal } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal';
import { TaskDetailsFullModal } from '../Workspace/components/TaskDetailsFull/TaskDetailsFullModal';
import { useHome } from './hooks/useHome.hook';
import { Settings } from '../Settings/Settings';
import type { Task } from '@/redux/tasks/task.types';
import type { TaskSearchItems } from '../Workspace/types/workspace.types';
import { OnboardingTour } from '@/components/Onboarding';

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
});

export const Home = () => {
  const {
    activeTab,
    changeStatusTab,
    isWorkspaceEditorOpen,
    setIsWorkspaceEditorOpen,
    isWorkspaceSidebarOpen,
    setIsWorkspaceSidebarOpen,
    isRightPanelOpen,
    setIsRightPanelOpen,
    isFocusModeOpen,
    setIsFocusModeOpen,
    isFocusModeActive,
    setIsFocusModeActive,
    activeFocusTask,
    activeFocusSubtaskIndex,
    handleStartFocus,
    handleOpenTaskDetails,
    taskDetailsTask,
    isFullViewOpen,
    isEditModalOpen,
    closeTaskDetails,
    handleToggleSubtask,
    handleSaveTask,
    deleteTask,
    initialStart,
    initialEnd,
  } = useHome();

  return (
    <>
      <LayoutContainer>
        <Sidebar activeTab={activeTab} changeStatusTab={changeStatusTab} />
        <MainContent id="joyride-main-content">
          {activeTab === TaskBar.DailyPlan && (
            <CalendarView onStartFocus={() => handleStartFocus(null)} />
          )}
          {activeTab === TaskBar.Tasks && <Tasks />}
          {activeTab === TaskBar.Workspace && (
            <Workspace
              isEditorOpen={isWorkspaceEditorOpen}
              onEditorChange={setIsWorkspaceEditorOpen}
              onStartFocus={handleStartFocus}
              onOpenTaskDetails={handleOpenTaskDetails}
              isSidebarOpen={isWorkspaceSidebarOpen}
              onSidebarChange={setIsWorkspaceSidebarOpen}
              activeFocusTaskId={isFocusModeActive ? activeFocusTask?.id : null}
            />
          )}
          {activeTab === TaskBar.Insights && <Insights />}
          {activeTab === TaskBar.Settings && <Settings />}
        </MainContent>
        {activeTab !== TaskBar.Workspace && (
          <Box id="joyride-right-panel">
            <RightPanel
              isOpen={isRightPanelOpen}
              onToggle={() => setIsRightPanelOpen(!isRightPanelOpen)}
            />
          </Box>
        )}
        <Box id="joyride-chat-ai">
          <ChatAI
            rightOffset={
              activeTab === TaskBar.Workspace && isWorkspaceEditorOpen
                ? isWorkspaceSidebarOpen
                  ? 352
                  : 92
                : activeTab === TaskBar.Workspace
                  ? 32
                  : isRightPanelOpen
                    ? 352
                    : 92
            }
          />
        </Box>
      </LayoutContainer>

      <FocusMode
        key={
          activeFocusTask?.id
            ? `${activeFocusTask.id}-${activeFocusSubtaskIndex ?? 'main'}`
            : 'default-focus'
        }
        open={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
        task={activeFocusTask}
        subtaskIndex={activeFocusSubtaskIndex}
        onActiveChange={setIsFocusModeActive}
      />

      {isEditModalOpen && (
        <TaskDetailModal
          key={
            taskDetailsTask?.google_event_id ||
            taskDetailsTask?.id ||
            'create-task-modal'
          }
          open={isEditModalOpen}
          onClose={closeTaskDetails}
          onSave={handleSaveTask}
          initialTask={taskDetailsTask as unknown as Task}
          initialStart={initialStart}
          initialEnd={initialEnd}
          handleDelete={deleteTask}
        />
      )}

      {isFullViewOpen && taskDetailsTask && (
        <TaskDetailsFullModal
          open={isFullViewOpen}
          onClose={closeTaskDetails}
          task={taskDetailsTask as unknown as TaskSearchItems}
          onStartFocus={handleStartFocus}
          onToggleSubtask={handleToggleSubtask}
          activeFocusTaskId={activeFocusTask?.id}
        />
      )}

      <OnboardingTour activeTab={activeTab} onTabChange={changeStatusTab} />
    </>
  );
};

export default Home;
