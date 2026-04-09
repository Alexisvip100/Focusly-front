import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Dialog,
  DialogContent,
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Search as SearchIcon, 
  Folder as FolderIcon 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
import { Button, TextField } from '@/components/ui';
import type { FolderTypes } from '../../../types/workspace.types';

interface AllFoldersModalProps {
  open: boolean;
  onClose: () => void;
  folders: FolderTypes[];
  onSelect: (folderId: string) => void;
  selectedId: string | null;
}

export const AllFoldersModal = ({ open, onClose, folders, onSelect, selectedId }: AllFoldersModalProps) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFolders = folders.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          bgcolor: theme.palette.background.paper,
          backgroundImage: 'none',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>
              All Folders
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.7 }}>
              Browse and select folders for your library view.
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ position: 'relative', my: 3 }}>
          <TextField
            fullWidth
            placeholder={`Search across ${folders.length} folders...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
               input: {
                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />,
               }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            maxHeight: '400px',
            overflowY: 'auto',
            pr: 1,
            // Custom scrollbar
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: '10px',
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredFolders.map((folder) => (
              <Box
                key={folder.id}
                component={motion.div}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onSelect(folder.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2.5,
                  borderRadius: '16px',
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
                  border: `2px solid ${selectedId === folder.id ? '#00f5ff' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    boxShadow: selectedId === folder.id ? '0 0 20px rgba(0, 245, 255, 0.2)' : 'none',
                    borderLeft: `10px solid ${folder.color || theme.palette.primary.main}`,
                    pl: '17px', // Compensate for the 3px border
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: `${folder.color || theme.palette.primary.main}1A`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <FolderIcon sx={{ color: folder.color || theme.palette.primary.main, fontSize: 24 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700} noWrap>
                    {folder.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.7 }}>
                    {folder.workspaceCount || 0} Items
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '12px',
                    bgcolor: selectedId === folder.id ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                    border: `1px solid ${selectedId === folder.id ? '#00f5ff' : 'transparent'}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={800}
                    sx={{ color: selectedId === folder.id ? '#00f5ff' : 'text.secondary', fontSize: '10px' }}
                  >
                    {selectedId === folder.id ? 'VISIBLE' : 'SELECT'}
                  </Typography>
                </Box>
              </Box>
            ))}
          </AnimatePresence>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>

          <Box gap={2} display="flex">
            <Button
              variant="text"
              onClick={onClose}
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: '#00f5ff',
                color: '#000',
                fontWeight: 800,
                borderRadius: '12px',
                px: 3,
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                '&:hover': {
                  bgcolor: '#00e1eb',
                  boxShadow: '0 0 30px rgba(0, 245, 255, 0.6)',
                },
              }}
            >
              Apply Changes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
