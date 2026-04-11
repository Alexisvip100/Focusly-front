import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  Popover,
  MenuItem,
  CircularProgress,
  List,
  ListItemText,
} from '@mui/material';
import {
  Close as CloseIcon, AccessTime as AccessTimeIcon, Add as AddIcon,
  RadioButtonUnchecked as TodoIcon, CalendarToday as PlannedIcon,
  Palette as PaletteIcon, Description as DescriptionIcon,
  OpenInFull as OpenInFullIcon, AutoFixHigh as AutoFixHighIcon,
  AttachFile as AttachFileIcon, History as HistoryIcon,
  Timer as TimerIcon, Flag as FlagIcon, Groups as GroupsIcon,
  Assignment as AssignmentIcon, Brush as BrushIcon,
  CheckCircleOutline as CheckCircleOutlineIcon, ArrowForwardIos,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
  Delete as DeleteIcon, Link as LinkIcon, Launch as LaunchIcon,
  CloseFullscreen as CloseFullscreenIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon,
  EventNote as EventNoteIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  Visibility as VisibilityIcon,
  PauseCircleOutline as OnHoldIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { sileo } from 'sileo';
import type { CreateTaskModalProps } from './types/CreateTaskModal.types';
import type { TaskStatus, Task } from '@/redux/tasks/task.types';
import {
  modalBackdropSx,
  paperPropsSx,
  headerIconSx,
  dialogContentSx,
  titleInputPropsSx,
  propertyListSx,
  propertyRowSx,
  propertyLabelSx,
  propertyValueSx,
  tagChipSx,
  addTagInputSx,
  dialogActionsSx,
  cancelButtonSx,
  saveButtonSx,
  descriptionInputSx,
  deleteButtonSx,
  datePickerPopperSx,
  datePickerPaperSx,
  timePickerPopperSx,
  timePickerPaperSx,
  timePickerLayoutSx,
} from './CreateTaskModal.styles';
import { useCreateTaskModal } from './hooks/useCreateTaskModal.hooks';
import { format } from 'date-fns';
import { getTagColors, TASK_COLORS } from './CreateTaskModal.utils';

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
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    category,
    setCategory,
    status,
    setStatus,
    tags,
    setTags,
    newTag,
    setNewTag,
    isAddingTag,
    setIsAddingTag,
    handleSave,
    handleAddTag,
    handleUpdate,
    handleDelete,
    realTime,
    setRealTime,
    timeSlotDisplay,
    errors,
    duration,
    setDuration,
    color,
    setColor,
    currentDate,
    loadingSave,
    setCurrentDate,
    links,
    handleAddLink,
    handleRemoveLink,
    newLinkTitle,
    setNewLinkTitle,
    newLinkUrl,
    setNewLinkUrl,
    isAddingLink,
    setIsAddingLink,
    shouldGenerateMeet,
    setShouldGenerateMeet,
    generateMeetLinkNow,
  } = useCreateTaskModal({
    onSave,
    onClose,
    initialStart,
    initialTask,
    onDelete,
    parentTask: parentTask ? (parentTask as unknown as Task) : undefined,
    subtaskIndex,
  });


  const [statusAnchor, setStatusAnchor] = useState<HTMLElement | null>(null);
  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(null);
  const [categoryAnchor, setCategoryAnchor] = useState<HTMLElement | null>(null);
  const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  // Timer Suggestions State
  const [durationSuggestions, setDurationSuggestions] = useState<string[]>([]);
  const [realTimeSuggestions, setRealTimeSuggestions] = useState<string[]>([]);
  const [durationAnchor, setDurationAnchor] = useState<HTMLDivElement | null>(null);
  const [realTimeAnchor, setRealTimeAnchor] = useState<HTMLDivElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isGeneratingMeet, setIsGeneratingMeet] = useState(false);

  const getTimerSuggestions = (val: string) => {
    const clean = val.trim();
    if (!clean || clean.length > 8) return [];
    
    const suggestions: string[] = [];
    if (/^\d+$/.test(clean)) {
      suggestions.push(`${clean}h`, `${clean}m`);
    } else if (/^\d+h$/.test(clean)) {
      suggestions.push(`${clean} 00m`, `${clean} 30m`);
    } else {
      const hmMatch = clean.match(/^(\d+h)\s*(\d+)$/);
      if (hmMatch) {
        suggestions.push(`${hmMatch[1]} ${hmMatch[2]}m`);
        if (hmMatch[2].length === 1) {
          suggestions.push(`${hmMatch[1]} ${hmMatch[2]}0m`);
        }
      }
    }
    return suggestions;
  };

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
        sileo.success({
          title: 'Google Meet link generated!',
          description: 'Link added to resources.',
          fill: '#ecfdf5',
        });
      } else {
        sileo.error({
          title: 'Could not generate Meet link',
          description: 'Make sure you are signed in with Google.',
          fill: '#fef2f2',
        });
      }
    } catch {
      sileo.error({
        title: 'Error generating Meet link',
        fill: '#fef2f2',
      });
    } finally {
      setIsGeneratingMeet(false);
    }
  };

  const hasMeetLink = shouldGenerateMeet || links.some(l => l.url.includes('meet.google.com') || l.title.includes('Google Meet') || l.url.includes('hangouts'));

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            ...(TASK_COLORS.includes(color)
              ? {
                  pt: 1,
                  pb: 20,
                  margin: '15px',
                }
              : {
                  pt: 2,
                  pb: 1,
                }),
            color: TASK_COLORS.includes(color) ? '#fff' : 'text.secondary',
            backgroundColor: TASK_COLORS.includes(color) ? color : 'transparent',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <Box display="flex" gap={1}>
            <IconButton
              size="small"
              onClick={() => setIsFullScreen(!isFullScreen)}
              sx={{
                ...headerIconSx,
                color: TASK_COLORS.includes(color) ? '#fff' : 'text.secondary',
                '&:hover': {
                  backgroundColor: TASK_COLORS.includes(color)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'action.hover',
                },
              }}
            >
              {isFullScreen ? (
                <CloseFullscreenIcon sx={{ fontSize: 18 }} />
              ) : (
                <OpenInFullIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => setColorAnchor(e.currentTarget)}
              sx={{
                ...headerIconSx,
                color: TASK_COLORS.includes(color) ? '#fff' : 'text.secondary',
                '&:hover': {
                  backgroundColor: TASK_COLORS.includes(color)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'action.hover',
                },
              }}
            >
              <PaletteIcon
                sx={{
                  fontSize: 18,
                  color: TASK_COLORS.includes(color)
                    ? '#fff'
                    : 'text.secondary',
                }}
              />
            </IconButton>
            {parentTask && (
              <Box display="flex" alignItems="center" gap={1} sx={{ px: 5, mb: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <SubdirectoryArrowRightIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  {parentTask.title}
                </Typography>
                <IconButton size="small" onClick={onClose} disabled sx={{ padding: 0 }}>
                  <ArrowForwardIos sx={{ fontSize: 10, color: 'text.secondary' }} />
                </IconButton>
                {title.length === 0 ? (
                  <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>
                    New SubTask
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {title}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                ...headerIconSx,
                color: TASK_COLORS.includes(color) ? '#fff' : 'text.secondary',
                '&:hover': {
                  backgroundColor: TASK_COLORS.includes(color)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'action.hover',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>

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

          <Box sx={propertyListSx}>
            <Box sx={propertyRowSx}>
              <Box sx={propertyLabelSx}>
                <TodoIcon sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Status
                </Typography>
              </Box>
              <Box sx={propertyValueSx}>
                <Chip
                  icon={
                    <>
                      {status === 'Todo' && <TodoIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                      {status === 'Planning' && <PlannedIcon sx={{ fontSize: 16, color: 'info.main' }} />}
                      {status === 'Pending' && <AccessTimeIcon sx={{ fontSize: 16, color: 'warning.main' }} />}
                      {status === 'OnHold' && <OnHoldIcon sx={{ fontSize: 16, color: 'error.main' }} />}
                      {status === 'Review' && <VisibilityIcon sx={{ fontSize: 16, color: 'secondary.main' }} />}
                      {status === 'Done' && <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'success.main' }} />}
                      {status === 'Backlog' && <HistoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                      {!status && <TodoIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                    </>
                  }
                  label={status === 'OnHold' ? 'On Hold' : status || 'Todo'}
                  onClick={(e) => setStatusAnchor(e.currentTarget)}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(0, 0, 0, 0.04)',
                    border: '1px solid',
                    borderColor: 'divider',
                    color:
                      status === 'Todo' ? 'text.secondary' :
                      status === 'Planning' ? 'info.main' :
                      status === 'Pending' ? 'warning.main' :
                      status === 'OnHold' ? 'error.main' :
                      status === 'Review' ? 'secondary.main' :
                      status === 'Done' ? 'success.main' :
                      status === 'Backlog' ? 'text.secondary' :
                      'primary.main',
                    borderRadius: '8px',
                    px: 1,
                    height: '32px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                    '& .MuiChip-icon': {
                      marginRight: '-4px',
                      color: 'inherit'
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Priority Property */}
            <Box sx={propertyRowSx}>
              <Box sx={propertyLabelSx}>
                <AttachFileIcon sx={{ fontSize: 18, transform: 'rotate(45deg)' }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Priority
                </Typography>
              </Box>
              <Box sx={propertyValueSx}>
                <Chip
                  icon={
                    <FlagIcon sx={{ 
                      fontSize: 16, 
                      color: priority === 'High' ? 'error.main' : priority === 'Med' ? 'warning.main' : priority === 'Low' ? 'success.main' : 'inherit'
                    }} />
                  }
                  label={priority || 'No priority'}
                  onClick={(e) => setPriorityAnchor(e.currentTarget)}
                  sx={{
                    bgcolor:
                      priority === 'High'
                        ? 'rgba(239, 68, 68, 0.1)'
                        : priority === 'Med'
                          ? 'rgba(245, 158, 11, 0.1)'
                          : priority === 'Low'
                            ? 'rgba(16, 185, 129, 0.1)'
                            : (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    border: '1px solid',
                    borderColor:
                      priority === 'High'
                        ? 'error.main'
                        : priority === 'Med'
                          ? 'warning.main'
                          : priority === 'Low'
                            ? 'success.main'
                            : 'divider',
                    color:
                      priority === 'High'
                        ? 'error.main'
                        : priority === 'Med'
                          ? 'warning.main'
                          : priority === 'Low'
                            ? 'success.main'
                            : 'text.secondary',
                    borderRadius: '8px',
                    px: 1,
                    height: '32px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                    '& .MuiChip-icon': {
                      marginRight: '-4px', // Tighter spacing with the label
                      color: 'inherit'
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Category Property */}
            <Box sx={propertyRowSx}>
              <Box sx={propertyLabelSx}>
                <AutoFixHighIcon sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Category
                </Typography>
              </Box>
              <Box sx={propertyValueSx}>
                <Chip
                  icon={
                    <>
                      {category === 'General' && <CategoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                      {category === 'Deep Work' && <AutoFixHighIcon sx={{ fontSize: 16, color: 'secondary.main' }} />}
                      {category === 'Meeting' && <GroupsIcon sx={{ fontSize: 16, color: 'info.main' }} />}
                      {category === 'Admin' && <AssignmentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                      {category === 'Design' && <BrushIcon sx={{ fontSize: 16, color: 'warning.main' }} />}
                      {category === 'Development' && <CodeIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
                      {category === 'Marketing' && <TrendingUpIcon sx={{ fontSize: 16, color: 'error.main' }} />}
                      {category === 'Planning' && <EventNoteIcon sx={{ fontSize: 16, color: 'info.main' }} />}
                      {category === 'Research' && <PsychologyIcon sx={{ fontSize: 16, color: 'secondary.main' }} />}
                      {category === 'Learning' && <SchoolIcon sx={{ fontSize: 16, color: 'warning.main' }} />}
                      {category === 'Personal' && <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                      {!category && <CategoryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                    </>
                  }
                  label={category || 'General'}
                  onClick={(e) => setCategoryAnchor(e.currentTarget)}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(0, 0, 0, 0.04)',
                    border: '1px solid',
                    borderColor: 'divider',
                    color:
                      category === 'General' ? 'text.secondary' :
                      category === 'Deep Work' ? 'secondary.main' :
                      category === 'Meeting' ? 'info.main' :
                      category === 'Admin' ? 'text.secondary' :
                      category === 'Design' ? 'warning.main' :
                      category === 'Development' ? 'primary.main' :
                      category === 'Marketing' ? 'error.main' :
                      category === 'Planning' ? 'info.main' :
                      category === 'Research' ? 'secondary.main' :
                      category === 'Learning' ? 'warning.main' :
                      category === 'Personal' ? 'text.secondary' :
                      'text.secondary',
                    borderRadius: '8px',
                    px: 1,
                    height: '32px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                    '& .MuiChip-icon': {
                      marginRight: '-4px',
                      color: 'inherit'
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Date Property */}
            <Box sx={propertyRowSx}>
              <Box sx={propertyLabelSx}>
                <PlannedIcon sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Date
                </Typography>
              </Box>
              <Box sx={{ ...propertyValueSx, position: 'relative' }}>
                <Chip
                  label={currentDate ? format(currentDate, 'PPP') : 'Pick a date'}
                  onClick={() => setDatePickerOpen(true)}
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    height: '32px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                />
                <DatePicker
                  open={datePickerOpen}
                  onClose={() => setDatePickerOpen(false)}
                  value={currentDate}
                  onChange={(newValue) => {
                    setCurrentDate(newValue);
                    setDatePickerOpen(false);
                  }}
                  slotProps={{
                    textField: {
                      sx: { 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        pointerEvents: 'none'
                      },
                    },
                    popper: {
                      sx: datePickerPopperSx,
                      placement: 'bottom-start',
                    },
                    desktopPaper: {
                      sx: datePickerPaperSx
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Time Property */}
            <Box sx={propertyRowSx}>
              <Box sx={propertyLabelSx}>
                <AccessTimeIcon sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Time
                </Typography>
              </Box>
              <Box sx={{ ...propertyValueSx, position: 'relative' }}>
                <Chip
                  label={currentDate ? format(currentDate, 'hh:mm a') : 'Pick a time'}
                  onClick={() => setTimePickerOpen(true)}
                  variant="outlined"
                  sx={{
                    borderRadius: '8px',
                    height: '32px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                />
                <TimePicker
                  open={timePickerOpen}
                  onClose={() => setTimePickerOpen(false)}
                  value={currentDate}
                  onChange={(newValue) => {
                    setCurrentDate(newValue);
                    setTimePickerOpen(false);
                  }}
                  slotProps={{
                    textField: {
                      sx: { 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        pointerEvents: 'none'
                      },
                    },
                    popper: {
                      sx: timePickerPopperSx,
                      placement: 'bottom-start',
                    },
                    desktopPaper: {
                      sx: timePickerPaperSx
                    },
                    layout: {
                      sx: timePickerLayoutSx
                    }
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', ml: 1.5, fontStyle: 'italic' }}
                >
                  ({timeSlotDisplay})
                </Typography>
              </Box>
            </Box>

            {/* Tags Property */}
            <Box sx={propertyRowSx}>
              <Box sx={propertyLabelSx}>
                <DescriptionIcon sx={{ fontSize: 18, transform: 'rotate(180deg)' }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Tags
                </Typography>
              </Box>
              <Box sx={propertyValueSx}>
                {tags.map((tag, index) => {
                  const colors = getTagColors(tag);
                  return (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => setTags(tags.filter((_, i) => i !== index))}
                      sx={{
                        ...tagChipSx,
                        bgcolor: colors.bgcolor,
                        color: colors.color,
                        border: '1px solid',
                        borderColor: colors.borderColor,
                        borderRadius: '12px',
                        fontSize: '12px',
                        height: '24px',
                        '& .MuiChip-deleteIcon': {
                          color: colors.color,
                          fontSize: '14px',
                          opacity: 0.7,
                          '&:hover': { opacity: 1 },
                        },
                      }}
                    />
                  );
                })}
                {isAddingTag ? (
                  <TextField
                    autoFocus
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onBlur={() => handleAddTag()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTag();
                      else if (e.key === 'Escape') setIsAddingTag(false);
                    }}
                    size="small"
                    sx={addTagInputSx}
                    placeholder="#"
                  />
                ) : (
                  <Chip
                    icon={<AddIcon sx={{ fontSize: 14 }} />}
                    label="Add Tag"
                    onClick={() => setIsAddingTag(true)}
                    sx={{
                      height: 28,
                      fontSize: 12,
                      bgcolor: 'transparent',
                      color: 'text.secondary',
                      border: '1px dashed',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ ...propertyRowSx, alignItems: 'center' }}>
              <Box sx={propertyLabelSx}>
                <AccessTimeIcon sx={{ fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
                  Time Tracking
                </Typography>
              </Box>
              <Box sx={{ ...propertyValueSx, gap: 6 }}>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                      <TimerIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                        }}
                      >
                        ESTIMATED
                      </Typography>
                    </Box>
                    <TextField
                      variant="standard"
                      value={duration}
                      onChange={(e) => 
                        handleTimerChange(
                          e.target.value, 
                          setDuration, 
                          setDurationSuggestions, 
                          setDurationAnchor, 
                          e.currentTarget.parentElement as HTMLDivElement
                        )
                      }
                      onBlur={() => setTimeout(() => setDurationAnchor(null), 200)}
                      placeholder="2h 00m"
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: '15px', fontWeight: 700, color: 'text.primary' },
                      }}
                      sx={{
                        width: '80px',
                        bgcolor: 'background.default',
                        borderRadius: '10px',
                        px: 1,
                      }}
                    />
                    <Popover
                      open={Boolean(durationAnchor)}
                      anchorEl={durationAnchor}
                      onClose={() => setDurationAnchor(null)}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      disableAutoFocus
                      disableEnforceFocus
                      slotProps={{ paper: { sx: { minWidth: 80, borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' } } }}
                    >
                      <List dense sx={{ py: 0 }}>
                        {durationSuggestions.map((s) => (
                          <MenuItem key={s} onClick={() => { setDuration(s); setDurationAnchor(null); }}>
                            <ListItemText primary={s} primaryTypographyProps={{ fontSize: '13px', fontWeight: 600 }} />
                          </MenuItem>
                        ))}
                      </List>
                    </Popover>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                      <HistoryIcon sx={{ fontSize: 14, color: 'info.main' }} />
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'info.main',
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                        }}
                      >
                        REAL
                      </Typography>
                    </Box>
                    <TextField
                      variant="standard"
                      value={realTime}
                      onChange={(e) => 
                        handleTimerChange(
                          e.target.value, 
                          setRealTime, 
                          setRealTimeSuggestions, 
                          setRealTimeAnchor, 
                          e.currentTarget.parentElement as HTMLDivElement
                        )
                      }
                      onBlur={() => setTimeout(() => setRealTimeAnchor(null), 200)}
                      placeholder="1h 30m"
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: '15px', color: 'info.main', fontWeight: 700 },
                      }}
                      sx={{
                        width: '80px',
                        bgcolor: 'background.default',
                        borderRadius: '10px',
                        px: 1,
                      }}
                    />
                    <Popover
                      open={Boolean(realTimeAnchor)}
                      anchorEl={realTimeAnchor}
                      onClose={() => setRealTimeAnchor(null)}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      disableAutoFocus
                      disableEnforceFocus
                      slotProps={{ paper: { sx: { minWidth: 80, borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' } } }}
                    >
                      <List dense sx={{ py: 0 }}>
                        {realTimeSuggestions.map((s) => (
                          <MenuItem key={s} onClick={() => { setRealTime(s); setRealTimeAnchor(null); }}>
                            <ListItemText primary={s} primaryTypographyProps={{ fontSize: '13px', fontWeight: 600, color: 'info.main' }} />
                          </MenuItem>
                        ))}
                      </List>
                    </Popover>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 2, borderBottom: '1px solid', borderColor: 'divider' }} />
          </Box>

          <Box sx={{ px: 4, mb: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <LinkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  LINKS & RESOURCES
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {/* VIDEO MEETING BUTTON */}
                <Button
                  size="small"
                  onClick={handleGenerateMeet}
                  disabled={isGeneratingMeet || hasMeetLink}
                  startIcon={isGeneratingMeet ? <CircularProgress size={14} color="inherit" /> : <VideoCallIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 1,
                    py: 0.25,
                    fontSize: '12px',
                    fontWeight: 600,
                    color: hasMeetLink ? 'text.disabled' : 'secondary.main',
                    bgcolor: hasMeetLink ? 'action.hover' : 'secondary.main' + '15',
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: '#fff',
                    },
                  }}
                >
                  {hasMeetLink ? 'Meet Added' : 'Add Meet'}
                </Button>

                {!isAddingLink && (
                <IconButton
                  size="small"
                  onClick={() => setIsAddingLink(true)}
                  sx={{ color: 'primary.main' }}
                >
                  <AddIcon sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Box>
          </Box>

            <Stack gap={1} mb={isAddingLink ? 2 : 0}>
              {links.map((link, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    borderRadius: '8px',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <LinkIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                        {link.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          display: 'block',
                          maxWidth: '300px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {link.url}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      size="small"
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: 'primary.main' }}
                    >
                      {link.title.toLowerCase().includes('meet') ? (
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: '4px',
                          }}
                        >
                          JOIN
                        </Typography>
                      ) : (
                        <LaunchIcon sx={{ fontSize: 16 }} />
                      )}
                    </IconButton>
                    <IconButton size="small" onClick={() => handleRemoveLink(index)}>
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Stack>

            {isAddingLink && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: '1px dashed',
                  borderColor: 'primary.main',
                }}
              >
                <Stack gap={1.5}>
                  <TextField
                    size="small"
                    placeholder="Link Title (e.g., Google Meet, Design Doc)"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    fullWidth
                    variant="standard"
                    InputProps={{ disableUnderline: true, sx: { fontSize: '14px', fontWeight: 500 } }}
                  />
                  <TextField
                    size="small"
                    placeholder="URL (https://...)"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    fullWidth
                    variant="standard"
                    InputProps={{ disableUnderline: true, sx: { fontSize: '13px', color: 'primary.main' } }}
                  />
                  <Box display="flex" justifyContent="flex-end" gap={1} mt={0.5}>
                    <Button
                      size="small"
                      onClick={() => {
                        setIsAddingLink(false);
                        setNewLinkTitle('');
                        setNewLinkUrl('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      disableElevation
                      disabled={!newLinkTitle || !newLinkUrl}
                      onClick={() => {
                        handleAddLink(newLinkTitle, newLinkUrl);
                        setNewLinkTitle('');
                        setNewLinkUrl('');
                        setIsAddingLink(false);
                      }}
                    >
                      Add Resource
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}

            <Box sx={{ mt: 3, borderBottom: '1px solid', borderColor: 'divider' }} />
          </Box>

          <Box sx={{ px: 4, mb: 4 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DescriptionIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                DESCRIPTION
              </Typography>
            </Box>
            <TextField
              multiline
              fullWidth
              minRows={3}
              placeholder="Add more details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={descriptionInputSx}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={dialogActionsSx}>
          <Box display={initialTask ? 'flex' : 'none'} sx={{ flex: 1 }} justifyContent="flex-start">
            <Button
              onClick={() => {
                sileo.warning({
                  title: 'Delete Task',
                  description: 'Are you sure you want to delete this task?',
                  fill: 'rgba(239, 68, 68, 0.9)', // Solid Red
                  button: {
                    title: 'Confirm',
                    onClick: () => {
                      sileo.promise(handleDelete(), {
                        loading: { title: 'Deleting...', fill: 'rgba(239, 68, 68, 0.9)' },
                        success: {
                          title: 'Task deleted successfully!',
                          duration: 4000,
                          fill: 'rgba(239, 68, 68, 0.9)',
                        },
                        error: { title: 'Error deleting task', fill: 'rgba(239, 68, 68, 0.9)' },
                      });
                      onClose();
                    },
                  },
                });
              }}
              variant="contained"
              disableElevation
              sx={deleteButtonSx}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
              Delete
            </Button>
          </Box>
          <Button onClick={onClose} sx={cancelButtonSx}>
            Cancel
          </Button>
          <Button
            onClick={
              initialTask && initialTask.user_id !== 'google-user'
                ? handleUpdate
                : handleSave
            }
            variant="contained"
            sx={saveButtonSx}
          >
            {loadingSave ? (
              <CircularProgress size={24} color="inherit" />
            ) : initialTask && initialTask.user_id !== 'google-user' ? (
              'Save Changes'
            ) : (
              'Create Task'
            )}
          </Button>
        </DialogActions>

        {/* Status Popover */}
        <Popover
          open={Boolean(statusAnchor)}
          anchorEl={statusAnchor}
          onClose={() => setStatusAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{
            sx: { borderRadius: '12px', mt: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
          }}
        >
          <Stack sx={{ p: 1, minWidth: '180px' }}>
            {['Todo', 'Planning', 'Pending', 'OnHold', 'Review', 'Done', 'Backlog'].map((s) => (
              <MenuItem
                key={s}
                onClick={() => {
                  setStatus(s as TaskStatus);
                  setStatusAnchor(null);
                }}
                sx={{ borderRadius: '8px', py: 1 }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  {s === 'Todo' && <TodoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
                  {s === 'Planning' && <PlannedIcon sx={{ fontSize: 18, color: 'info.main' }} />}
                  {s === 'Pending' && (
                    <AccessTimeIcon sx={{ fontSize: 18, color: 'warning.main' }} />
                  )}
                  {s === 'OnHold' && <OnHoldIcon sx={{ fontSize: 18, color: 'error.main' }} />}
                  {s === 'Review' && <VisibilityIcon sx={{ fontSize: 18, color: 'secondary.main' }} />}
                  {s === 'Done' && (
                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'success.main' }} />
                  )}
                  {s === 'Backlog' && (
                    <HistoryIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  )}
                  <Typography variant="body2" fontWeight={500}>
                    {s === 'OnHold' ? 'On Hold' : s}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Stack>
        </Popover>

        {/* Priority Popover */}
        <Popover
          open={Boolean(priorityAnchor)}
          anchorEl={priorityAnchor}
          onClose={() => setPriorityAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{
            sx: { borderRadius: '12px', mt: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
          }}
        >
          <Stack sx={{ p: 1, minWidth: '150px' }}>
            {['High', 'Med', 'Low', 'No priority'].map((p) => (
              <MenuItem
                key={p}
                onClick={() => {
                  setPriority(p as 'High' | 'Med' | 'Low' | 'No priority');
                  setPriorityAnchor(null);
                }}
                sx={{ borderRadius: '8px', py: 1 }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <FlagIcon
                    sx={{
                      fontSize: 18,
                      color:
                        p === 'High' ? 'error.main' : p === 'Med' ? 'warning.main' : p === 'Low' ? 'success.main' : 'text.secondary',
                    }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    {p}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Stack>
        </Popover>

        {/* Category Popover */}
        <Popover
          open={Boolean(categoryAnchor)}
          anchorEl={categoryAnchor}
          onClose={() => setCategoryAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{
            sx: { borderRadius: '12px', mt: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
          }}
        >
          <Stack sx={{ p: 1, minWidth: '180px' }}>
            {['General', 'Deep Work', 'Meeting', 'Admin', 'Design', 'Development', 'Marketing', 'Planning', 'Research', 'Learning', 'Personal'].map((c) => (
              <MenuItem
                key={c}
                onClick={() => {
                  setCategory(c);
                  setCategoryAnchor(null);
                }}
                sx={{ borderRadius: '8px', py: 1 }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  {c === 'General' && <CategoryIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
                  {c === 'Deep Work' && (
                    <AutoFixHighIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  )}
                  {c === 'Meeting' && <GroupsIcon sx={{ fontSize: 18, color: 'info.main' }} />}
                  {c === 'Admin' && (
                    <AssignmentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  )}
                  {c === 'Design' && <BrushIcon sx={{ fontSize: 18, color: 'warning.main' }} />}
                  {c === 'Development' && <CodeIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
                  {c === 'Marketing' && <TrendingUpIcon sx={{ fontSize: 18, color: 'error.main' }} />}
                  {c === 'Planning' && <EventNoteIcon sx={{ fontSize: 18, color: 'info.main' }} />}
                  {c === 'Research' && <PsychologyIcon sx={{ fontSize: 18, color: 'secondary.main' }} />}
                  {c === 'Learning' && <SchoolIcon sx={{ fontSize: 18, color: 'warning.main' }} />}
                  {c === 'Personal' && <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
                  <Typography variant="body2" fontWeight={500}>
                    {c}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Stack>
        </Popover>

        <Popover
          open={Boolean(colorAnchor)}
          anchorEl={colorAnchor}
          onClose={() => setColorAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          PaperProps={{
            sx: { borderRadius: '16px', mt: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
          }}
        >
          <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1.5 }}>
            {TASK_COLORS.map((c) => (
              <Box
                key={c}
                onClick={() => {
                  setColor(c);
                  setColorAnchor(null);
                }}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: c,
                  cursor: 'pointer',
                  border: color === c ? '2px solid white' : 'none',
                  outline: color === c ? '1px solid black' : 'none',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.1)' },
                }}
              />
            ))}
          </Box>
        </Popover>
      </Dialog>
    </LocalizationProvider>
  );
};
