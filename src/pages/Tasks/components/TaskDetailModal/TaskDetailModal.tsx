import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { sileo } from 'sileo';
import type { TaskDetailModalProps } from './types/TaskDetailModal.types';
import type { Task } from '@/redux/tasks/task.types';
import {
  modalBackdropSx,
  paperPropsSx,
  dialogContentSx,
  titleInputPropsSx,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.styles';
import { useTaskDetailModal } from './hooks/useTaskDetailModal.hooks';
import { getTimerSuggestions } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';

// Sub-components
import { Collaborators } from './components/Collaborators/Collaborators';
import { TaskProperties } from './components/TaskProperties/TaskProperties';
import { TaskHeader } from './components/TaskHeader/TaskHeader';
import { TaskResources } from './components/TaskResources/TaskResources';
import { TaskDescription } from './components/TaskDescription/TaskDescription';
import { TaskActions } from './components/TaskActions/TaskActions';

export const TaskDetailModal = ({
  open,
  onClose,
  onSave,
  initialStart,
  initialTask,
  handleDelete: onDelete,
  parentTask,
  subtaskIndex,
}: TaskDetailModalProps) => {
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
    timeSlotDisplay,
    errors,
    duration, setDuration,
    color, setColor,
    currentDate, setCurrentDate,
    loadingSave,
    links, handleAddLink, handleRemoveLink,
    newLinkTitle, setNewLinkTitle,
    newLinkUrl, setNewLinkUrl,
    isAddingLink, setIsAddingLink,
    shouldGenerateMeet, setShouldGenerateMeet,
    generateMeetLinkNow,
    collaborators, handleAddCollaborator,
  } = useTaskDetailModal({
    onSave,
    onClose,
    initialStart,
    initialTask,
    onDelete,
    parentTask: parentTask ? (parentTask as unknown as Task) : undefined,
    subtaskIndex,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isGeneratingMeet, setIsGeneratingMeet] = useState(false);
  const [isLinksExpanded, setIsLinksExpanded] = useState(true);
  const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);
  
  const isPureGoogleTask = initialTask?.task_type === 'GoogleTask';

  const handleTimerChange = (
    value: string,
    setter: (v: string) => void,
    setSuggestions: (s: string[]) => void,
    setAnchor: (el: HTMLDivElement | null) => void,
    target: HTMLDivElement
  ) => {
    setter(value);
    const suggestions = getTimerSuggestions(value);
    setSuggestions(suggestions);
    setAnchor(suggestions.length > 0 ? target : null);
  };

  const handleGenerateMeet = async () => {
    setIsGeneratingMeet(true);
    try {
      const meetUrl = await generateMeetLinkNow(undefined, {
        title,
        description,
        deadline: currentDate ?? undefined,
        duration,
      });
      if (meetUrl) {
        handleAddLink('Google Meet', meetUrl);
        setShouldGenerateMeet(true);
        sileo.success({ title: 'Google Meet link generated!', description: 'Link added to resources.', fill: '#ecfdf5' });
      } else {
        sileo.error({ title: 'Could not generate Meet link', description: 'Make sure you are signed in with Google.', fill: '#fef2f2' });
      }
    } catch {
      sileo.error({ title: 'Error generating Meet link', fill: '#fef2f2' });
    } finally {
      setIsGeneratingMeet(false);
    }
  };

  const hasMeetLink = shouldGenerateMeet || links.some(l => 
    l.url.includes('meet.google.com') || 
    l.title.toLowerCase().includes('google meet') || 
    l.url.includes('hangouts')
  );

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
          parentTask={parentTask ? (parentTask as unknown as Task) : undefined}
          title={title}
          onClose={onClose}
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
            status={status} setStatus={setStatus}
            priority={priority} setPriority={setPriority}
            category={category} setCategory={setCategory}
            color={color} setColor={setColor}
            colorAnchor={colorAnchor} setColorAnchor={setColorAnchor}
            currentDate={currentDate} setCurrentDate={setCurrentDate}
            tags={tags} setTags={setTags}
            newTag={newTag} setNewTag={setNewTag}
            isAddingTag={isAddingTag} setIsAddingTag={setIsAddingTag}
            handleAddTag={handleAddTag}
            duration={duration} setDuration={setDuration}
            realTime={realTime} setRealTime={setRealTime}
            isPureGoogleTask={isPureGoogleTask}
            timeSlotDisplay={timeSlotDisplay}
            handleTimerChange={handleTimerChange}
          />

          <TaskResources
            links={links}
            isLinksExpanded={isLinksExpanded}
            setIsLinksExpanded={setIsLinksExpanded}
            isGeneratingMeet={isGeneratingMeet}
            handleGenerateMeet={handleGenerateMeet}
            hasMeetLink={hasMeetLink}
            setIsAddingLink={setIsAddingLink}
            isAddingLink={isAddingLink}
            newLinkTitle={newLinkTitle}
            setNewLinkTitle={setNewLinkTitle}
            newLinkUrl={newLinkUrl}
            setNewLinkUrl={setNewLinkUrl}
            handleAddLink={handleAddLink}
            handleRemoveLink={handleRemoveLink}
          />

          <Collaborators
            collaborators={collaborators}
            handleAddCollaborator={handleAddCollaborator}
          />

          <TaskDescription
            description={description}
            setDescription={setDescription}
          />
        </DialogContent>

        <TaskActions
          initialTask={initialTask}
          handleDelete={handleDelete}
          onClose={onClose}
          handleUpdate={handleUpdate}
          handleSave={handleSave}
          loadingSave={loadingSave}
        />
      </Dialog>
    </LocalizationProvider>
  );
};
