import { useState } from 'react';
import { Dialog, DialogContent, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { CreateTaskModalProps } from './types/CreateTaskModal.types';
import type { Task } from '@/redux/tasks/task.types';
import {
  modalBackdropSx,
  paperPropsSx,
  dialogContentSx,
  titleInputPropsSx,
} from './CreateTaskModal.styles';
import { useCreateTaskModal } from './hooks/useCreateTaskModal.hooks';

// Sub-components
import { TaskHeader } from './components/TaskHeader/TaskHeader';
import { TaskProperties } from './components/TaskProperties/TaskProperties';
import { TaskLinksResources } from './components/TaskLinksResources/TaskLinksResources';
import { TaskDescription } from './components/TaskDescription/TaskDescription';
import { TaskFooterActions } from './components/TaskFooterActions/TaskFooterActions';
import { TaskPopovers } from './components/TaskPopovers/TaskPopovers';

export const CreateTaskModal = ({
  open,
  onClose,
  onSave,
  initialStart,
  initialTask,
  handleDelete: onDelete,
  parentTask,
  subtaskIndex,
}: CreateTaskModalProps) => {
  const {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    category, setCategory,
    status, setStatus,
    tags, setTags,
    newTag, setNewTag,
    isAddingTag, setIsAddingTag,
    handleSave, handleAddTag, handleUpdate, handleDelete,
    realTime, setRealTime,
    timeSlotDisplay, errors,
    duration, setDuration,
    color, setColor,
    currentDate, loadingSave, setCurrentDate,
    links, handleAddLink, handleRemoveLink,
    newLinkTitle, setNewLinkTitle,
    newLinkUrl, setNewLinkUrl,
    isAddingLink, setIsAddingLink,
    isGeneratingMeet,
    handleGenerateMeet,
    handleTimerChange,
    hasMeetLink,
  } = useCreateTaskModal({
    onSave,
    onClose,
    initialStart,
    initialTask,
    onDelete,
    parentTask: parentTask ? (parentTask as unknown as Task) : undefined,
    subtaskIndex,
  });

  // Popover anchors
  const [statusAnchor, setStatusAnchor] = useState<HTMLElement | null>(null);
  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(null);
  const [categoryAnchor, setCategoryAnchor] = useState<HTMLElement | null>(null);
  const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);

  // Timer Suggestions State
  const [durationSuggestions, setDurationSuggestions] = useState<string[]>([]);
  const [realTimeSuggestions, setRealTimeSuggestions] = useState<string[]>([]);
  const [durationAnchor, setDurationAnchor] = useState<HTMLDivElement | null>(null);
  const [realTimeAnchor, setRealTimeAnchor] = useState<HTMLDivElement | null>(null);

  // UI State
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              ...paperPropsSx,
              width: isFullScreen ? '100%' : '800px',
              height: isFullScreen ? '100%' : 'auto',
              maxWidth: isFullScreen ? '100%' : '800px',
              maxHeight: isFullScreen ? '100%' : '90vh',
              margin: isFullScreen ? 0 : 2,
              borderRadius: isFullScreen ? 0 : '16px',
            },
          },
          backdrop: { sx: modalBackdropSx },
        }}
      >
        <TaskHeader
          color={color}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          setColorAnchor={setColorAnchor}
          onClose={onClose}
          parentTask={parentTask}
          title={title}
        />

        <DialogContent sx={dialogContentSx}>
          <Box sx={{ px: 1, mb: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Give your task a clear name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={titleInputPropsSx}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Box>

          <TaskProperties
            status={status}
            setStatusAnchor={setStatusAnchor}
            priority={priority}
            setPriorityAnchor={setPriorityAnchor}
            category={category}
            setCategoryAnchor={setCategoryAnchor}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            timeSlotDisplay={timeSlotDisplay}
            tags={tags}
            setTags={setTags}
            newTag={newTag}
            setNewTag={setNewTag}
            isAddingTag={isAddingTag}
            setIsAddingTag={setIsAddingTag}
            handleAddTag={handleAddTag}
            duration={duration}
            setDuration={setDuration}
            realTime={realTime}
            setRealTime={setRealTime}
            handleTimerChange={handleTimerChange}
            durationSuggestions={durationSuggestions}
            setDurationSuggestions={setDurationSuggestions}
            durationAnchor={durationAnchor}
            setDurationAnchor={setDurationAnchor}
            realTimeSuggestions={realTimeSuggestions}
            setRealTimeSuggestions={setRealTimeSuggestions}
            realTimeAnchor={realTimeAnchor}
            setRealTimeAnchor={setRealTimeAnchor}
          />

          <TaskLinksResources
            links={links}
            handleAddLink={handleAddLink}
            handleRemoveLink={handleRemoveLink}
            newLinkTitle={newLinkTitle}
            setNewLinkTitle={setNewLinkTitle}
            newLinkUrl={newLinkUrl}
            setNewLinkUrl={setNewLinkUrl}
            isAddingLink={isAddingLink}
            setIsAddingLink={setIsAddingLink}
            hasMeetLink={hasMeetLink}
            isGeneratingMeet={isGeneratingMeet}
            handleGenerateMeet={handleGenerateMeet}
          />

          <TaskDescription
            description={description}
            setDescription={setDescription}
          />
        </DialogContent>

        <TaskFooterActions
          initialTask={initialTask}
          onClose={onClose}
          handleSave={handleSave}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          loadingSave={loadingSave}
        />

        <TaskPopovers
          statusAnchor={statusAnchor}
          setStatusAnchor={setStatusAnchor}
          setStatus={setStatus}
          priorityAnchor={priorityAnchor}
          setPriorityAnchor={setPriorityAnchor}
          setPriority={(p) => setPriority(p as typeof priority)}
          categoryAnchor={categoryAnchor}
          setCategoryAnchor={setCategoryAnchor}
          setCategory={setCategory}
          colorAnchor={colorAnchor}
          setColorAnchor={setColorAnchor}
          color={color}
          setColor={setColor}
        />
      </Dialog>
    </LocalizationProvider>
  );
};
