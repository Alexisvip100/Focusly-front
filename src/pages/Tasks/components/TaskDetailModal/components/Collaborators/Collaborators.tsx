import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { 
  Avatar, 
  Box, 
  Button, 
  IconButton, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import {
  Groups as GroupsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  collaboratorContainerSx,
  collaboratorHeaderSx,
  collaboratorCountSx,
  collaboratorsListSx,
  addCollaboratorFormSx,
  collaboratorItemSx,
  avatarSx
} from './Collaborators.styles';

interface Collaborator {
  name: string;
  email: string;
  avatar?: string;
}

interface CollaboratorsProps {
  collaborators: Collaborator[];
  handleAddCollaborator: (name: string, email: string) => void;
}

export const Collaborators = ({ 
  collaborators, 
  handleAddCollaborator 
}: CollaboratorsProps) => {
  const [isAddingCollaborator, setIsAddingCollaborator] = useState(false);
  const [isCollaboratorsExpanded, setIsCollaboratorsExpanded] = useState(() => {
    return (collaborators && collaborators.length > 0) || false;
  });
  const [newCollaboratorName, setNewCollaboratorName] = useState('');
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');

  const onAdd = () => {
    if (newCollaboratorEmail.trim()) {
      handleAddCollaborator(newCollaboratorName, newCollaboratorEmail);
      setNewCollaboratorName('');
      setNewCollaboratorEmail('');
      setIsAddingCollaborator(false);
    }
  };

  return (
    <Box sx={collaboratorContainerSx}>
      <Box
        sx={collaboratorHeaderSx(isCollaboratorsExpanded)}
        onClick={() => setIsCollaboratorsExpanded(!isCollaboratorsExpanded)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <GroupsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.5px' }}>
            COLLABORATORS
          </Typography>
          {!isCollaboratorsExpanded && collaborators.length > 0 && (
            <Box sx={collaboratorCountSx}>
              {collaborators.length}
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <IconButton size="small" sx={{ p: 0.5 }}>
            {isCollaboratorsExpanded ? <ExpandLessIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Box>
      </Box>

      <AnimatePresence mode="popLayout">
        {isCollaboratorsExpanded && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ overflow: 'hidden' }}
          >
            <Box sx={collaboratorsListSx}>
              <Stack gap={1}>
                <AnimatePresence mode="popLayout" initial={false}>
                  {isAddingCollaborator && (
                    <Box 
                      key="add-collaborator-form"
                      component={motion.div}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      sx={addCollaboratorFormSx}
                    >
                      <TextField
                        autoFocus
                        size="small"
                        fullWidth
                        placeholder="Name (Optional)"
                        value={newCollaboratorName}
                        onChange={(e) => setNewCollaboratorName(e.target.value)}
                        sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                      />
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Email"
                        value={newCollaboratorEmail}
                        onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                      />
                      <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button 
                          size="small" 
                          onClick={() => setIsAddingCollaborator(false)}
                          sx={{ textTransform: 'none', borderRadius: '8px' }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained" 
                          disabled={!newCollaboratorEmail.trim()}
                          onClick={onAdd}
                          sx={{ textTransform: 'none', borderRadius: '8px', px: 3 }}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {collaborators.map((collaborator, idx) => (
                    <Box 
                      key={`${collaborator.email}-${idx}`} 
                      component={motion.div}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      sx={collaboratorItemSx}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          src={collaborator.avatar || undefined}
                          sx={avatarSx(!!collaborator.avatar)}
                        >
                          {collaborator.name?.charAt(0) || collaborator.email?.charAt(0) || '?'}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.2 }}>
                            {collaborator?.name || collaborator?.email || 'Unknown Collaborator'}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {collaborator?.email || 'No email provided'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </AnimatePresence>
              </Stack>
            </Box>
          </Box>
        )}
      </AnimatePresence>
      <Box sx={{ mt: 3, borderBottom: '1px solid', borderColor: 'divider' }} />
    </Box>
  );
};