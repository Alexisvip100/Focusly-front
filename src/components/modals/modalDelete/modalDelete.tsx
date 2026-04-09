import { Typography, Box } from '@mui/material';
import { WarningRounded as WarningRoundedIcon } from '@mui/icons-material';
import { BaseModal } from '../BaseModal';
import { Button } from '../../ui/Button';

export interface ModalItemsProps {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ModalDelete = ({ title, description, open, onClose, onConfirm }: ModalItemsProps) => {
  const modalActions = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
      <Button
        variant="contained"
        fullWidth
        onClick={onConfirm}
        sx={{
          bgcolor: '#f24848',
          color: 'white',
          '&:hover': { bgcolor: '#d83a3a' },
        }}
      >
        Delete Workspace
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={onClose}
        sx={{
          color: '#cbd5e1',
          borderColor: '#283447',
          '&:hover': { borderColor: '#475569', bgcolor: 'rgba(255,255,255,0.05)' },
        }}
      >
        Cancel
      </Button>
    </Box>
  );

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={title}
      subtitle="Confirming permanent deletion"
      icon={<WarningRoundedIcon sx={{ color: '#f24848' }} />}
      iconBgColor="rgba(242, 72, 72, 0.15)"
      actions={modalActions}
      sx={{ bgcolor: '#151c28', border: '1px solid #283447' }}
    >
      <Box
        sx={{
          background: '#1a2432',
          padding: 2.5,
          borderRadius: 2,
          mt: 1,
          border: '1px solid #283447',
        }}
      >
        <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
          {description}
        </Typography>
      </Box>
    </BaseModal>
  );
};
