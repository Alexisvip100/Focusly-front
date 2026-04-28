import { useState, useEffect } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { EditNote as EditNoteIcon } from '@mui/icons-material';
import { BaseModal } from '@/components/modals';
import { Button, TextField } from '@/components/ui';
import type { FolderTypes } from '../../../types/workspace.types';

interface UpdateFolderModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, name: string, color: string) => void;
  folder: FolderTypes | null;
}

export const UpdateFolderModal = ({
  open,
  onClose,
  onUpdate,
  folder,
}: UpdateFolderModalProps) => {
  const [name, setName] = useState(folder?.name || '');
  const [selectedColor, setSelectedColor] = useState(
    folder?.color || '#3b82f6',
  );

  useEffect(() => {
    if (folder) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(folder.name);

      setSelectedColor(folder.color || '#3b82f6');
    }
  }, [folder, open]);

  const colors = [
    { name: 'Black', value: '#18181b' },
    { name: 'Slate', value: '#475569' },
    { name: 'Zinc', value: '#a1a1aa' },
    { name: 'Dark Green', value: '#054314ff' },
    { name: 'Purple', value: '#2d0436ff' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Seafoam', value: '#5eead4' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Sky', value: '#0ea5e9' },
  ];

  const handleUpdate = () => {
    if (name.trim() && folder) {
      onUpdate(folder.id, name.trim(), selectedColor);
      onClose();
    }
  };

  const modalActions = (
    <>
      <Button onClick={onClose} variant="text" sx={{ color: 'text.secondary' }}>
        Cancel
      </Button>
      <Button
        onClick={handleUpdate}
        variant="contained"
        disabled={!name.trim()}
        sx={{
          bgcolor: selectedColor,
          '&:hover': {
            bgcolor: selectedColor,
            filter: 'brightness(1.1)',
            boxShadow: `0 12px 24px ${selectedColor}55`,
          },
          boxShadow: `0 8px 16px ${selectedColor}33`,
        }}
      >
        Update Folder
      </Button>
    </>
  );

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Update Folder"
      subtitle="Modify the folder name and color to better organize your workspaces."
      icon={<EditNoteIcon sx={{ fontSize: 28 }} />}
      iconBgColor={selectedColor}
      actions={modalActions}
    >
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            mb: 1.5,
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Folder Name
        </Typography>
        <TextField
          placeholder="e.g., Marketing Strategy, Q1 Plans..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate();
            }
          }}
          sx={{ mb: 4 }}
        />

        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            mb: 2,
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Folder Color
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
          {colors.map((color) => (
            <Tooltip key={color.value} title={color.name}>
              <Box
                onClick={() => setSelectedColor(color.value)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: color.value,
                  cursor: 'pointer',
                  border: '3px solid',
                  borderColor:
                    selectedColor === color.value ? 'white' : 'transparent',
                  boxShadow:
                    selectedColor === color.value
                      ? `0 0 0 2px ${color.value}`
                      : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'scale(1.15)',
                    boxShadow: `0 4px 12px ${color.value}66`,
                  },
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>
    </BaseModal>
  );
};
