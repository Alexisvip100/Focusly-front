import { motion, AnimatePresence } from 'motion/react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Avatar,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  Link as LinkIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  VideoCall as VideoCallIcon,
  Add as AddIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  resourcesContainerSx,
  resourcesHeaderSx,
  resourceCountSx,
  addMeetButtonSx,
  addResourceButtonSx,
  resourceItemSx,
  resourceIconContainerSx,
  resourceLinkButtonSx,
  resourceRemoveButtonSx,
  addResourceFormSx
} from './TaskResources.styles';

interface Link {
  title: string;
  url: string;
}

interface TaskResourcesProps {
  links: Link[];
  isLinksExpanded: boolean;
  setIsLinksExpanded: (b: boolean) => void;
  isGeneratingMeet: boolean;
  handleGenerateMeet: () => void;
  hasMeetLink: boolean;
  setIsAddingLink: (b: boolean) => void;
  isAddingLink: boolean;
  newLinkTitle: string;
  setNewLinkTitle: (t: string) => void;
  newLinkUrl: string;
  setNewLinkUrl: (u: string) => void;
  handleAddLink: (title: string, url: string) => void;
  handleRemoveLink: (idx: number) => void;
}

export const TaskResources = ({
  links,
  isLinksExpanded,
  setIsLinksExpanded,
  isGeneratingMeet,
  handleGenerateMeet,
  hasMeetLink,
  setIsAddingLink,
  isAddingLink,
  newLinkTitle,
  setNewLinkTitle,
  newLinkUrl,
  setNewLinkUrl,
  handleAddLink,
  handleRemoveLink,
}: TaskResourcesProps) => {
  const getLinkIcon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return {
        src: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        isImage: true
      };
    } catch {
      return {
        icon: <LinkIcon sx={{ fontSize: 16 }} />,
        isImage: false,
        color: 'primary.main'
      };
    }
  };

  return (
    <Box sx={resourcesContainerSx}>
      <Box
        sx={resourcesHeaderSx(isLinksExpanded)}
        onClick={() => setIsLinksExpanded(!isLinksExpanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <LinkIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.5px' }}>
            LINK AND RESOURCE
          </Typography>
          {!isLinksExpanded && links.length > 0 && (
            <Box sx={resourceCountSx}>
              {links.length}
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <IconButton 
            size="small" 
            sx={{ p: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLinksExpanded(!isLinksExpanded);
            }}
          >
            {isLinksExpanded ? <ExpandLessIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18 }} />}
          </IconButton>
          <AnimatePresence>
            {isLinksExpanded && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                display="flex" 
                alignItems="center" 
                gap={1}
              >
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerateMeet();
                  }}
                  disabled={isGeneratingMeet || hasMeetLink}
                  startIcon={isGeneratingMeet ? <CircularProgress size={14} color="inherit" /> : <VideoCallIcon sx={{ fontSize: 16 }} />}
                  sx={addMeetButtonSx(hasMeetLink)}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={hasMeetLink ? 'added' : 'add'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {hasMeetLink ? 'Meet Added' : 'Add Meet'}
                    </motion.span>
                  </AnimatePresence>
                </Button>

                <Button
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAddingLink(true);
                  }}
                  sx={addResourceButtonSx}
                >
                  Add Resource
                </Button>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      <AnimatePresence mode="popLayout">
        {isLinksExpanded && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ overflow: 'hidden' }}
          >
            {links.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Stack gap={1}>
                  <AnimatePresence initial={false}>
                    {links.map((link, idx) => {
                      const iconInfo = getLinkIcon(link.url);
                      return (
                        <Box 
                          key={`${link.url}-${idx}`} 
                          component={motion.div}
                          layout
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          sx={resourceItemSx}
                        >
                          <Box display="flex" alignItems="center" gap={1.5} sx={{ minWidth: 0, flex: 1 }}>
                            <Box sx={resourceIconContainerSx(iconInfo.isImage, iconInfo.color)}>
                              {iconInfo.isImage ? (
                                <Avatar 
                                  src={iconInfo.src} 
                                  variant="rounded"
                                  sx={{ width: 20, height: 20, bgcolor: 'transparent' }}
                                >
                                  <LinkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                </Avatar>
                              ) : (
                                iconInfo.icon
                              )}
                            </Box>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {link.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {link.url}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconButton
                              size="small"
                              href={link.url}
                              target="_blank"
                              sx={resourceLinkButtonSx}
                            >
                              <LaunchIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveLink(idx)}
                              sx={resourceRemoveButtonSx}
                            >
                              <CloseIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      );
                    })}
                  </AnimatePresence>
                </Stack>
              </Box>
            )}

            <AnimatePresence>
              {isAddingLink && (
                <Box 
                  component={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  sx={addResourceFormSx}
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
            </AnimatePresence>
          </Box>
        )}
      </AnimatePresence>
      <Box sx={{ mt: 1, borderBottom: '1px solid', borderColor: 'divider' }} />
    </Box>
  );
};
