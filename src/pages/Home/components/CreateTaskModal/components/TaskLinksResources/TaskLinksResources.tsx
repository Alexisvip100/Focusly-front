import {
  Box, Typography, IconButton, Button, TextField, Stack, CircularProgress,
} from '@mui/material';
import {
  Link as LinkIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
  Add as AddIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material';

interface TaskLink {
  title: string;
  url: string;
}

interface TaskLinksResourcesProps {
  links: TaskLink[];
  handleAddLink: (title: string, url: string) => void;
  handleRemoveLink: (index: number) => void;
  newLinkTitle: string;
  setNewLinkTitle: (v: string) => void;
  newLinkUrl: string;
  setNewLinkUrl: (v: string) => void;
  isAddingLink: boolean;
  setIsAddingLink: (v: boolean) => void;
  hasMeetLink: boolean;
  isGeneratingMeet: boolean;
  handleGenerateMeet: () => void;
}

export const TaskLinksResources = ({
  links,
  handleAddLink,
  handleRemoveLink,
  newLinkTitle,
  setNewLinkTitle,
  newLinkUrl,
  setNewLinkUrl,
  isAddingLink,
  setIsAddingLink,
  hasMeetLink,
  isGeneratingMeet,
  handleGenerateMeet,
}: TaskLinksResourcesProps) => (
  <Box sx={{ px: 4, mb: 4 }}>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <LinkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          LINKS & RESOURCES
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          size="small"
          onClick={handleGenerateMeet}
          disabled={isGeneratingMeet || hasMeetLink}
          startIcon={isGeneratingMeet ? <CircularProgress size={14} color="inherit" /> : <VideoCallIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: 'none', borderRadius: '8px', px: 1, py: 0.25,
            fontSize: '12px', fontWeight: 600,
            color: hasMeetLink ? 'text.disabled' : 'secondary.main',
            bgcolor: hasMeetLink ? 'action.hover' : 'secondary.main' + '15',
            '&:hover': { bgcolor: 'secondary.main', color: '#fff' },
          }}
        >
          {hasMeetLink ? 'Meet Added' : 'Add Meet'}
        </Button>
        {!isAddingLink && (
          <IconButton size="small" onClick={() => setIsAddingLink(true)} sx={{ color: 'primary.main' }}>
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
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            p: 1, borderRadius: '8px',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            border: '1px solid', borderColor: 'divider',
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
                sx={{ color: 'text.secondary', display: 'block', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {link.url}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton size="small" component="a" href={link.url} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
              {link.title.toLowerCase().includes('meet') ? (
                <Typography variant="caption" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'white', px: 1, py: 0.5, borderRadius: '4px' }}>
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
          p: 2, borderRadius: '8px',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
          border: '1px dashed', borderColor: 'primary.main',
        }}
      >
        <Stack gap={1.5}>
          <TextField
            size="small" placeholder="Link Title (e.g., Google Meet, Design Doc)"
            value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)}
            fullWidth variant="standard"
            InputProps={{ disableUnderline: true, sx: { fontSize: '14px', fontWeight: 500 } }}
          />
          <TextField
            size="small" placeholder="URL (https://...)"
            value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)}
            fullWidth variant="standard"
            InputProps={{ disableUnderline: true, sx: { fontSize: '13px', color: 'primary.main' } }}
          />
          <Box display="flex" justifyContent="flex-end" gap={1} mt={0.5}>
            <Button size="small" onClick={() => { setIsAddingLink(false); setNewLinkTitle(''); setNewLinkUrl(''); }}>
              Cancel
            </Button>
            <Button
              size="small" variant="contained" disableElevation
              disabled={!newLinkTitle || !newLinkUrl}
              onClick={() => { handleAddLink(newLinkTitle, newLinkUrl); setNewLinkTitle(''); setNewLinkUrl(''); setIsAddingLink(false); }}
            >
              Add Resource
            </Button>
          </Box>
        </Stack>
      </Box>
    )}

    <Box sx={{ mt: 3, borderBottom: '1px solid', borderColor: 'divider' }} />
  </Box>
);
