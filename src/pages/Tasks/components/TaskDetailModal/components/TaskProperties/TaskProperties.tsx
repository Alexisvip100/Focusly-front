import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Box,
  Typography,
  Chip,
  TextField,
  Popover,
  Stack,
  MenuItem,
  List,
  ListItemText,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Flag as FlagIcon,
  Groups as GroupsIcon,
  Category as CategoryIcon,
  RadioButtonUnchecked as TodoIcon,
  CalendarToday as PlannedIcon,
  Visibility as VisibilityIcon,
  PauseCircleOutline as OnHoldIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  History as HistoryIcon,
  Description as DescriptionIcon,
  Timer as TimerIcon,
  AutoFixHigh as AutoFixHighIcon,
  Assignment as AssignmentIcon,
  Brush as BrushIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon,
  EventNote as EventNoteIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { 
  propertyRowSx, 
  propertyLabelSx, 
  propertyValueSx, 
  tagChipSx, 
  addTagInputSx,
  datePickerPopperSx,
  datePickerPaperSx,
  timePickerPopperSx,
  timePickerPaperSx,
  timePickerLayoutSx
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.styles';
import { getTagColors, TASK_COLORS } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type { TaskStatus } from '@/redux/tasks/task.types';
import {
  propertiesContainerSx,
  metadataRowSx,
  metadataChipSx,
  colorCircleSx,
  timerInputSx,
  popoverPaperSx,
  timerPopoverPaperSx,
  colorPopoverPaperSx,
  colorGridSx
} from './TaskProperties.styles';

interface TaskPropertiesProps {
  status: TaskStatus;
  setStatus: (s: TaskStatus) => void;
  priority: string;
  setPriority: (p: 'High' | 'Med' | 'Low' | 'No priority') => void;
  category: string;
  setCategory: (c: string) => void;
  color: string;
  setColor: (c: string) => void;
  colorAnchor: HTMLElement | null;
  setColorAnchor: (el: HTMLElement | null) => void;
  currentDate: Date | null;
  setCurrentDate: (d: Date | null) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  newTag: string;
  setNewTag: (t: string) => void;
  isAddingTag: boolean;
  setIsAddingTag: (b: boolean) => void;
  handleAddTag: () => void;
  duration: string;
  setDuration: (d: string) => void;
  realTime: string;
  setRealTime: (t: string) => void;
  isPureGoogleTask: boolean;
  timeSlotDisplay: string;
  handleTimerChange: (
    value: string,
    setter: (v: string) => void,
    setSuggestions: (s: string[]) => void,
    setAnchor: (el: HTMLDivElement | null) => void,
    target: HTMLDivElement
  ) => void;
}

export const TaskProperties = ({
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  color,
  setColor,
  colorAnchor,
  setColorAnchor,
  currentDate,
  setCurrentDate,
  tags,
  setTags,
  newTag,
  setNewTag,
  isAddingTag,
  setIsAddingTag,
  handleAddTag,
  duration,
  setDuration,
  realTime,
  setRealTime,
  isPureGoogleTask,
  timeSlotDisplay,
  handleTimerChange,
}: TaskPropertiesProps) => {
  const [statusAnchor, setStatusAnchor] = useState<HTMLElement | null>(null);
  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(null);
  const [categoryAnchor, setCategoryAnchor] = useState<HTMLElement | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const [durationSuggestions, setDurationSuggestions] = useState<string[]>([]);
  const [realTimeSuggestions, setRealTimeSuggestions] = useState<string[]>([]);
  const [durationAnchor, setDurationAnchor] = useState<HTMLDivElement | null>(null);
  const [realTimeAnchor, setRealTimeAnchor] = useState<HTMLDivElement | null>(null);

  const getStatusColor = (s: string) => {
    if (s === 'Done') return 'success.main';
    if (s === 'OnHold') return 'error.main';
    if (s === 'Pending') return 'warning.main';
    if (s === 'Planning') return 'info.main';
    return 'text.secondary';
  };

  const getPriorityColor = (p: string) => {
    if (p === 'High') return 'error.main';
    if (p === 'Med') return 'warning.main';
    if (p === 'Low') return 'success.main';
    return 'text.secondary';
  };

  const getCategoryColor = (c: string) => {
    if (c === 'Deep Work' || c === 'Research') return 'secondary.main';
    if (c === 'Meeting' || c === 'Planning') return 'info.main';
    if (c === 'Design' || c === 'Learning') return 'warning.main';
    if (c === 'Development') return 'primary.main';
    if (c === 'Marketing') return 'error.main';
    return 'text.secondary';
  };

  return (
    <Box sx={propertiesContainerSx}>
      <Box sx={metadataRowSx}>
        {/* Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={
              <>
                {status === 'Todo' && <TodoIcon sx={{ fontSize: 16 }} />}
                {status === 'Planning' && <PlannedIcon sx={{ fontSize: 16 }} />}
                {status === 'Pending' && <AccessTimeIcon sx={{ fontSize: 16 }} />}
                {status === 'OnHold' && <OnHoldIcon sx={{ fontSize: 16 }} />}
                {status === 'Review' && <VisibilityIcon sx={{ fontSize: 16 }} />}
                {status === 'Done' && <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
                {status === 'Backlog' && <HistoryIcon sx={{ fontSize: 16 }} />}
              </>
            }
            label={status === 'OnHold' ? 'On Hold' : status}
            onClick={(e) => setStatusAnchor(e.currentTarget)}
            sx={metadataChipSx(getStatusColor(status))}
          />
        </Box>

        {/* Priority */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={
              <FlagIcon sx={{ fontSize: 16, color: getPriorityColor(priority) }} />
            }
            label={priority}
            onClick={(e) => setPriorityAnchor(e.currentTarget)}
            sx={metadataChipSx('text.primary')}
          />
        </Box>

        {/* Category */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={
              <>
                {category === 'General' && <CategoryIcon sx={{ fontSize: 16 }} />}
                {category === 'Deep Work' && <AutoFixHighIcon sx={{ fontSize: 16 }} />}
                {category === 'Meeting' && <GroupsIcon sx={{ fontSize: 16 }} />}
                {category === 'Admin' && <AssignmentIcon sx={{ fontSize: 16 }} />}
                {category === 'Design' && <BrushIcon sx={{ fontSize: 16 }} />}
                {category === 'Development' && <CodeIcon sx={{ fontSize: 16 }} />}
                {category === 'Marketing' && <TrendingUpIcon sx={{ fontSize: 16 }} />}
                {category === 'Planning' && <EventNoteIcon sx={{ fontSize: 16 }} />}
                {category === 'Research' && <PsychologyIcon sx={{ fontSize: 16 }} />}
                {category === 'Learning' && <SchoolIcon sx={{ fontSize: 16 }} />}
                {category === 'Personal' && <PersonIcon sx={{ fontSize: 16 }} />}
              </>
            }
            label={category || 'General'}
            onClick={(e) => setCategoryAnchor(e.currentTarget)}
            sx={metadataChipSx(getCategoryColor(category))}
          />
        </Box>

        {/* Color */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            onClick={(e) => setColorAnchor(e.currentTarget)}
            sx={colorCircleSx(color)}
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
      {!isPureGoogleTask && (
        <Box sx={propertyRowSx}>
          <Box sx={propertyLabelSx}>
            <DescriptionIcon sx={{ fontSize: 18, transform: 'rotate(180deg)' }} />
            <Typography variant="caption" sx={{ fontSize: '14px', fontWeight: 500 }}>
              Tags
            </Typography>
          </Box>
          <Box sx={{ ...propertyValueSx, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {tags.map((tag) => {
                const colors = getTagColors(tag);
                return (
                  <Box
                    key={tag}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  >
                    <Chip
                      label={tag}
                      onDelete={() => setTags(tags.filter((t) => t !== tag))}
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
                  </Box>
                );
              })}
              {isAddingTag ? (
                <Box
                  key="add-tag-input"
                  component={motion.div}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
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
                </Box>
              ) : (
                <Box
                  key="add-tag-button"
                  component={motion.div}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
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
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      )}

      {/* Time Tracking Section */}
      {!isPureGoogleTask && (
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
                    sx={{ color: 'text.secondary', fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px' }}
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
                  }}
                  sx={timerInputSx(false)}
                />
                <Popover
                  open={Boolean(durationAnchor)}
                  anchorEl={durationAnchor}
                  onClose={() => setDurationAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  disableAutoFocus
                  disableEnforceFocus
                  slotProps={{ paper: { sx: timerPopoverPaperSx } }}
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
                    sx={{ color: 'info.main', fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px' }}
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
                  }}
                  sx={timerInputSx(true)}
                />
                <Popover
                  open={Boolean(realTimeAnchor)}
                  anchorEl={realTimeAnchor}
                  onClose={() => setRealTimeAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  disableAutoFocus
                  disableEnforceFocus
                  slotProps={{ paper: { sx: timerPopoverPaperSx } }}
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
      )}

      {/* Popovers */}
      <Popover
        open={Boolean(statusAnchor)}
        anchorEl={statusAnchor}
        onClose={() => setStatusAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: popoverPaperSx }}
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
                {s === 'Pending' && <AccessTimeIcon sx={{ fontSize: 18, color: 'warning.main' }} />}
                {s === 'OnHold' && <OnHoldIcon sx={{ fontSize: 18, color: 'error.main' }} />}
                {s === 'Review' && <VisibilityIcon sx={{ fontSize: 18, color: 'secondary.main' }} />}
                {s === 'Done' && <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'success.main' }} />}
                {s === 'Backlog' && <HistoryIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
                <Typography variant="body2" fontWeight={500}>
                  {s === 'OnHold' ? 'On Hold' : s}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Popover>

      <Popover
        open={Boolean(priorityAnchor)}
        anchorEl={priorityAnchor}
        onClose={() => setPriorityAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: popoverPaperSx }}
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
                <FlagIcon sx={{ fontSize: 18, color: getPriorityColor(p) }} />
                <Typography variant="body2" fontWeight={500}>
                  {p}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Popover>

      <Popover
        open={Boolean(categoryAnchor)}
        anchorEl={categoryAnchor}
        onClose={() => setCategoryAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: popoverPaperSx }}
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
                {c === 'Deep Work' && <AutoFixHighIcon sx={{ fontSize: 18, color: 'secondary.main' }} />}
                {c === 'Meeting' && <GroupsIcon sx={{ fontSize: 18, color: 'info.main' }} />}
                {c === 'Admin' && <AssignmentIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
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
        PaperProps={{ sx: colorPopoverPaperSx }}
      >
        <Box sx={colorGridSx}>
          {TASK_COLORS.map((c: string) => (
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

      <Box sx={{ mt: 2, borderBottom: '1px solid', borderColor: 'divider' }} />
    </Box>
  );
};
