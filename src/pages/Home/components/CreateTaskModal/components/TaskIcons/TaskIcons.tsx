import {
  RadioButtonUnchecked as TodoIcon,
  CalendarToday as PlannedIcon,
  AccessTime as AccessTimeIcon,
  PauseCircleOutline as OnHoldIcon,
  Visibility as VisibilityIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  History as HistoryIcon,
  Category as CategoryIcon,
  AutoFixHigh as AutoFixHighIcon,
  Groups as GroupsIcon,
  Assignment as AssignmentIcon,
  Brush as BrushIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon,
  EventNote as EventNoteIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

export const getStatusIcon = (status: string | null, fontSize = 16) => {
  const sx = { fontSize };
  switch (status) {
    case 'Todo':
      return <TodoIcon sx={{ ...sx, color: 'text.secondary' }} />;
    case 'Planning':
      return <PlannedIcon sx={{ ...sx, color: 'info.main' }} />;
    case 'Pending':
      return <AccessTimeIcon sx={{ ...sx, color: 'warning.main' }} />;
    case 'OnHold':
      return <OnHoldIcon sx={{ ...sx, color: 'error.main' }} />;
    case 'Review':
      return <VisibilityIcon sx={{ ...sx, color: 'secondary.main' }} />;
    case 'Done':
      return <CheckCircleOutlineIcon sx={{ ...sx, color: 'success.main' }} />;
    case 'Backlog':
      return <HistoryIcon sx={{ ...sx, color: 'text.secondary' }} />;
    default:
      return <TodoIcon sx={{ ...sx, color: 'text.secondary' }} />;
  }
};

export const getCategoryIcon = (category: string | null, fontSize = 16) => {
  const sx = { fontSize };
  switch (category) {
    case 'General':
      return <CategoryIcon sx={{ ...sx, color: 'text.secondary' }} />;
    case 'Deep Work':
      return <AutoFixHighIcon sx={{ ...sx, color: 'secondary.main' }} />;
    case 'Meeting':
      return <GroupsIcon sx={{ ...sx, color: 'info.main' }} />;
    case 'Admin':
      return <AssignmentIcon sx={{ ...sx, color: 'text.secondary' }} />;
    case 'Design':
      return <BrushIcon sx={{ ...sx, color: 'warning.main' }} />;
    case 'Development':
      return <CodeIcon sx={{ ...sx, color: 'primary.main' }} />;
    case 'Marketing':
      return <TrendingUpIcon sx={{ ...sx, color: 'error.main' }} />;
    case 'Planning':
      return <EventNoteIcon sx={{ ...sx, color: 'info.main' }} />;
    case 'Research':
      return <PsychologyIcon sx={{ ...sx, color: 'secondary.main' }} />;
    case 'Learning':
      return <SchoolIcon sx={{ ...sx, color: 'warning.main' }} />;
    case 'Personal':
      return <PersonIcon sx={{ ...sx, color: 'text.secondary' }} />;
    default:
      return <CategoryIcon sx={{ ...sx, color: 'text.secondary' }} />;
  }
};
