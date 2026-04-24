import { Box, Typography, TextField } from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';
import {
  descriptionContainerSx,
  descriptionHeaderSx,
  descriptionInputSx
} from './TaskDescription.styles';

interface TaskDescriptionProps {
  description: string;
  setDescription: (d: string) => void;
}

export const TaskDescription = ({ description, setDescription }: TaskDescriptionProps) => {
  return (
    <Box sx={descriptionContainerSx}>
      <Box sx={descriptionHeaderSx}>
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
  );
};
