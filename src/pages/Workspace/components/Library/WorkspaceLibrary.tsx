import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { motion, AnimatePresence } from 'motion/react';
import { sileo } from 'sileo';
import {
  LibraryContainer,
  LibraryHeader,
  HeaderTitle,
  HeaderSubtitle,
  SearchBar,
  GridContainer,
  WorkspaceCard,
  CreateCard,
  TaskPill,
  TaskPillLabel,
  TaskPillTitle,
  HoverArrowButton,
  FolderSection,
  FolderSectionHeader,
  FolderList,
  FolderCapsule,
  FolderIconCircle,
  AddFolderCapsule,
  ActionCapsule,
  CapsuleIconButton,
  MoreFoldersCapsule,
  MoreFoldersCircle,
} from './WorkspaceLibrary.styles';
import {
  Box,
  Typography,
  Skeleton,
  LinearProgress,
  IconButton,
  useTheme,
} from '@mui/material';
import { EmptyState } from '@/utils/EmptyState';
import {
  Search as SearchIcon,
  PushPin as PushPinIcon,
  Add as AddIcon,
  Close as CloseIcon,
  CheckBox as CheckBoxIcon,
  ArrowForward as ArrowForwardIcon,
  DeleteOutline as DeleteOutlineIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  FolderSpecial as FolderSpecialIcon,
  MoreVert as MoreVertIcon,
  FolderShared as FolderSharedIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useWorkspace } from '../../hooks/useWorkspace.hook';
import {
  GET_WORKSPACES,
  GET_FOLDERS,
  CREATE_FOLDER,
  UPDATE_WORKSPACE,
  UPDATE_FOLDER,
  DELETE_FOLDER,
} from '../../workspaces.graphql';
import type { WorkspaceTypes, FolderTypes } from '../../types/workspace.types';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CreateFolderModal } from './modals/CreateFolderModal';
import { UpdateFolderModal } from './modals/UpdateFolderModal';
import { AllFoldersModal } from './modals/AllFoldersModal';
import { FolderOptionsIconButton } from './WorkspaceLibrary.styles';

interface WorkspaceLibraryProps {
  onCreate: () => void;
  onSelect: (workspace: WorkspaceTypes) => void;
}

export const WorkspaceLibrary = ({
  onCreate,
  onSelect,
}: WorkspaceLibraryProps) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'workspace' | 'folder'>(
    'workspace',
  );

  const { data, loading, error } = useQuery(GET_WORKSPACES, {
    variables: { search: searchMode === 'workspace' ? searchTerm : '' },
  });

  const {
    data: foldersData,
    loading: foldersLoading,
    error: foldersError,
  } = useQuery(GET_FOLDERS);
  const [createFolder] = useMutation(CREATE_FOLDER, {
    refetchQueries: [{ query: GET_FOLDERS }],
  });
  const [updateFolder] = useMutation(UPDATE_FOLDER, {
    refetchQueries: [{ query: GET_FOLDERS }, { query: GET_WORKSPACES }],
  });
  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    refetchQueries: [{ query: GET_FOLDERS }, { query: GET_WORKSPACES }],
  });

  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE, {
    refetchQueries: [{ query: GET_WORKSPACES }, { query: GET_FOLDERS }],
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [folderAnchorEl, setFolderAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceTypes | null>(null);
  const [selectedFolderToManage, setSelectedFolderToManage] =
    useState<FolderTypes | null>(null);
  const [isUpdateFolderModalOpen, setIsUpdateFolderModalOpen] = useState(false);
  const [isAllFoldersModalOpen, setIsAllFoldersModalOpen] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    workspace: WorkspaceTypes,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedWorkspace(workspace);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWorkspace(null);
  };

  const handleFolderMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    folder: FolderTypes,
  ) => {
    event.stopPropagation();
    setFolderAnchorEl(event.currentTarget);
    setSelectedFolderToManage(folder);
  };

  const handleFolderMenuClose = () => {
    setFolderAnchorEl(null);
  };

  const handleMoveToFolder = async (folderId: string | null) => {
    if (!selectedWorkspace) return;
    try {
      await updateWorkspace({
        variables: {
          updateWorkspaceInput: {
            id: selectedWorkspace.id,
            folderId: folderId,
          },
        },
      });
      sileo.success({
        title: 'Workspace moved',
        description: folderId
          ? 'Workspace moved to folder'
          : 'Workspace moved to All Notes',
        fill: 'var(--sileo-success-bg)',
        duration: 3000,
      });
    } catch (err) {
      console.error('Error moving workspace:', err);
    }
    handleMenuClose();
  };

  if (foldersError) {
    console.error('Error fetching folders:', foldersError);
  }

  const folders = (foldersData?.folders || []).filter((f: FolderTypes) =>
    searchMode === 'folder'
      ? f.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true,
  );

  // Move selected folder to first position
  const sortedFolders = [...folders].sort((a, b) => {
    if (a.id === selectedFolderId) return -1;
    if (b.id === selectedFolderId) return 1;
    return 0;
  });

  const visibleFolders = sortedFolders.slice(0, 5);
  const hiddenFoldersCount =
    sortedFolders.length > 5 ? sortedFolders.length - 5 : 0;

  const allWorkspaces = data?.workspaces || [];

  const workspaces = allWorkspaces.filter(
    (w: WorkspaceTypes) => !selectedFolderId || w.folderId === selectedFolderId,
  );

  const { handleOpen } = useWorkspace();

  const handleCreateFolder = async (name: string, color: string) => {
    try {
      const { data: result } = await createFolder({
        variables: {
          createFolderInput: { name, color },
        },
      });

      if (result?.createFolder?.id) {
        setSelectedFolderId(result.createFolder.id);
      }

      setIsFolderModalOpen(false);

      sileo.success({
        title: 'Folder created',
        description: `Folder "${name}" has been created.`,
        fill: 'var(--sileo-success-bg)',
        duration: 4000,
      });
    } catch (err) {
      console.error('Error creating folder:', err);
    }
  };

  const handleUpdateFolder = async (
    id: string,
    name: string,
    color: string,
  ) => {
    try {
      await updateFolder({
        variables: {
          updateFolderInput: { id, name, color },
        },
      });

      sileo.success({
        title: 'Workspace updated',
        description: 'Changes saved successfully',
        fill: 'var(--sileo-update-bg)',
        duration: 3000,
      });
    } catch (err) {
      console.error('Error updating folder:', err);
    }
  };

  const handleDeleteFolder = async () => {
    if (!selectedFolderToManage) return;
    try {
      await deleteFolder({
        variables: { id: selectedFolderToManage.id },
      });

      if (selectedFolderId === selectedFolderToManage.id) {
        setSelectedFolderId(null);
      }

      sileo.success({
        title: 'Folder deleted',
        description:
          'Folder has been removed. All workspaces were moved to All Notes.',
        fill: 'var(--sileo-delete-bg)',
        duration: 4000,
      });
    } catch (err) {
      console.error('Error deleting folder:', err);
    }
    handleFolderMenuClose();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <LibraryContainer sx={{ position: 'relative' }}>
      {/* YouTube-style top progress bar */}
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            zIndex: 1000,
            bgcolor: 'transparent',
            '& .MuiLinearProgress-bar': {
              bgcolor: 'primary.main',
            },
          }}
        />
      )}

      <LibraryHeader>
        <Box>
          <HeaderTitle>Workspace Library</HeaderTitle>
          <HeaderSubtitle>
            Manage your strategic documents and brain dumps.
          </HeaderSubtitle>
        </Box>
        <Box display="flex" alignItems="center">
          <SearchBar id="joyride-workspace-search">
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <input
              placeholder={
                searchMode === 'workspace'
                  ? 'Search workspaces...'
                  : 'Search folders...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                p: 0.5,
                visibility: searchTerm ? 'visible' : 'hidden',
              }}
              onClick={handleClearSearch}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </SearchBar>

          <ActionCapsule>
            <CapsuleIconButton
              active={searchMode === 'folder'}
              onClick={() => {
                setSearchMode('folder');
                if (searchMode !== 'folder') handleClearSearch();
              }}
            >
              <FolderSharedIcon fontSize="small" />
            </CapsuleIconButton>
            <CapsuleIconButton
              active={searchMode === 'workspace'}
              onClick={() => {
                setSearchMode('workspace');
                if (searchMode !== 'workspace') handleClearSearch();
              }}
            >
              <FilterListIcon fontSize="small" />
            </CapsuleIconButton>
          </ActionCapsule>
        </Box>
      </LibraryHeader>

      <FolderSection id="joyride-workspace-folders">
        <FolderSectionHeader>
          <FolderIcon sx={{ fontSize: 16 }} />
          <Typography>FOLDERS</Typography>
        </FolderSectionHeader>

        <FolderList>
          <AnimatePresence mode="popLayout" initial={false}>
            <Box
              component={motion.div}
              layout
              key="all-notes"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              sx={{ flexShrink: 0 }}
            >
              <FolderCapsule
                active={!selectedFolderId}
                onClick={() => setSelectedFolderId(null)}
              >
                <FolderIconCircle color={theme.palette.primary.main}>
                  <FolderSpecialIcon sx={{ fontSize: 20 }} />
                </FolderIconCircle>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    sx={{
                      color: !selectedFolderId
                        ? theme.palette.mode === 'dark'
                          ? '#fff'
                          : 'primary.main'
                        : 'text.primary',
                      lineHeight: 1.2,
                    }}
                  >
                    All Notes
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', opacity: 0.7 }}
                  >
                    {allWorkspaces.length} items
                  </Typography>
                </Box>
              </FolderCapsule>
            </Box>

            {foldersLoading
              ? [1, 2, 3].map((i) => (
                  <Box
                    key={`skeleton-${i}`}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    sx={{ flexShrink: 0 }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={180}
                      height={64}
                      sx={{ borderRadius: '40px' }}
                    />
                  </Box>
                ))
              : visibleFolders.map((folder: FolderTypes) => (
                  <Box
                    key={folder.id}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                    sx={{ flexShrink: 0 }}
                  >
                    <FolderCapsule
                      active={selectedFolderId === folder.id}
                      onClick={() => setSelectedFolderId(folder.id)}
                      color={folder.color}
                    >
                      <FolderOptionsIconButton
                        className="folder-options-btn"
                        onClick={(e) => handleFolderMenuOpen(e, folder)}
                      >
                        <MoreVertIcon sx={{ fontSize: 16 }} />
                      </FolderOptionsIconButton>
                      <FolderIconCircle color={folder.color}>
                        {selectedFolderId === folder.id ? (
                          <FolderOpenIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <FolderIcon sx={{ fontSize: 20 }} />
                        )}
                      </FolderIconCircle>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          sx={{
                            color:
                              selectedFolderId === folder.id
                                ? folder.color || theme.palette.primary.main
                                : 'text.primary',
                            lineHeight: 1.2,
                            maxWidth: '120px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {folder.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', opacity: 0.7 }}
                        >
                          {folder.workspaceCount || 0} items
                        </Typography>
                      </Box>
                    </FolderCapsule>
                  </Box>
                ))}

            {hiddenFoldersCount > 0 && (
              <Box
                component={motion.div}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                sx={{ flexShrink: 0 }}
              >
                <MoreFoldersCapsule
                  onClick={() => setIsAllFoldersModalOpen(true)}
                >
                  <MoreFoldersCircle className="more-count-circle">
                    +{hiddenFoldersCount}
                  </MoreFoldersCircle>
                  <Typography
                    variant="subtitle2"
                    fontWeight={800}
                    sx={{
                      color: 'text.secondary',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    ALL FOLDERS
                  </Typography>
                </MoreFoldersCapsule>
              </Box>
            )}

            <Box
              component={motion.div}
              layout
              key="add-folder"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              sx={{ flexShrink: 0 }}
            >
              <AddFolderCapsule onClick={() => setIsFolderModalOpen(true)}>
                <AddIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography>ADD FOLDER</Typography>
              </AddFolderCapsule>
            </Box>
          </AnimatePresence>
        </FolderList>
      </FolderSection>

      <Box sx={{ height: 4, mb: 1 }} />

      {error ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error">
            Error loading workspaces. Please try again.
          </Typography>
        </Box>
      ) : (
        <GridContainer>
          {searchTerm && !workspaces.length && !loading && (
            <EmptyState
              title="No results found"
              description="No workspaces match your search term. Try a different keyword or create a new one."
              sx={{ gridColumn: '1 / -1', py: 8 }}
            />
          )}

          {!searchTerm && !workspaces.length && !loading && !error && (
            <EmptyState
              icon={<PushPinIcon />}
              title="No workspaces yet"
              description="Lightweight notes to organize your strategic planning. Create your first workspace to get started."
              actionText="Create Workspace"
              onAction={onCreate}
              sx={{ gridColumn: '1 / -1', py: 10 }}
            />
          )}

          {workspaces.length > 0 && (
            <CreateCard id="joyride-workspace-create-note" onClick={onCreate}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'action.hover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 1.5,
                }}
              >
                <AddIcon sx={{ color: 'primary.main' }} />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                Create New Note
              </Typography>
            </CreateCard>
          )}

          {loading && !workspaces.length
            ? [1, 2, 3, 4, 5].map((i) => (
                <WorkspaceCard
                  key={i}
                  sx={{ borderStyle: 'solid', cursor: 'default' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={20}
                      animation="wave"
                    />
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      animation="wave"
                    />
                  </Box>
                  <Skeleton
                    variant="rectangular"
                    width="80%"
                    height={24}
                    sx={{ mb: 1.5, borderRadius: '4px' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={16}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="90%"
                    height={16}
                    animation="wave"
                  />
                  <Box sx={{ mt: 'auto', width: '100%' }}>
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={14}
                      sx={{ mb: 1.5 }}
                      animation="wave"
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={40}
                      sx={{ borderRadius: '24px' }}
                      animation="wave"
                    />
                  </Box>
                </WorkspaceCard>
              ))
            : workspaces.map((workspace: WorkspaceTypes) => {
                let previewText = 'No additional text';
                try {
                  const contentObj = JSON.parse(workspace.content);
                  if (Array.isArray(contentObj) && contentObj.length > 0) {
                    const firstPara = contentObj.find(
                      (block: {
                        type: string;
                        content?: { text?: string }[];
                      }) => block.type === 'paragraph',
                    );
                    if (
                      firstPara &&
                      firstPara.content &&
                      firstPara.content.length > 0
                    ) {
                      previewText = firstPara.content[0].text || previewText;
                    }
                  }
                } catch {
                  // ignore JSON error
                }

                return (
                  <WorkspaceCard
                    key={workspace.id}
                    onClick={() => onSelect(workspace)}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <FolderIcon
                          sx={{
                            fontSize: 16,
                            color: workspace.folder?.color || 'text.secondary',
                            opacity: 0.8,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                            opacity: 0.8,
                          }}
                        >
                          {workspace.folder?.name || 'Uncategorized'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen(workspace.id);
                          }}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'white',
                              backgroundColor: '#ff0090ff',
                            },
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, workspace)}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'white',
                              backgroundColor: '#18f3ffff',
                            },
                          }}
                        >
                          <PushPinIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        fontSize: '16px',
                        mb: 1,
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {workspace.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        mb: 'auto',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {previewText}
                    </Typography>

                    <Box mt="auto" width="100%">
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        mb={workspace.task ? 1.5 : 0}
                      >
                        {formatDistanceToNow(new Date(workspace.updatedAt), {
                          addSuffix: true,
                        })}
                      </Typography>

                      {workspace.task && (
                        <TaskPill>
                          <Box
                            sx={{
                              color: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 1.5,
                              cursor: 'pointer',
                              '&:hover': {
                                color: 'error.main',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.2s',
                            }}
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await updateWorkspace({
                                  variables: {
                                    updateWorkspaceInput: {
                                      id: workspace.id,
                                      taskId: null,
                                    },
                                  },
                                });
                                sileo.success({
                                  title: 'Task unlinked',
                                  description:
                                    'The task association has been removed.',
                                  fill: 'var(--sileo-update-bg)',
                                  duration: 3000,
                                });
                              } catch (err) {
                                console.error('Error unlinking task:', err);
                              }
                            }}
                          >
                            <CheckBoxIcon sx={{ fontSize: 20 }} />
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <TaskPillLabel>ASSIGNED TASK</TaskPillLabel>
                            <TaskPillTitle>
                              {workspace.task.title}
                            </TaskPillTitle>
                          </Box>
                          <HoverArrowButton className="arrow-button">
                            <ArrowForwardIcon sx={{ fontSize: 14 }} />
                          </HoverArrowButton>
                        </TaskPill>
                      )}
                    </Box>
                  </WorkspaceCard>
                );
              })}
        </GridContainer>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            mt: 1,
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            minWidth: 180,
            bgcolor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            display: 'block',
            fontWeight: 800,
            color: 'primary.main',
            letterSpacing: '0.5px',
          }}
        >
          MOVE TO FOLDER
        </Typography>
        <MenuItem
          onClick={() => handleMoveToFolder(null)}
          sx={{ fontSize: '13px', py: 1, fontWeight: 500 }}
        >
          <FolderSpecialIcon sx={{ fontSize: 18, mr: 1.5, opacity: 0.7 }} />
          All Notes (Default)
        </MenuItem>
        <Divider sx={{ my: 0.5, opacity: 0.1 }} />
        {[...folders]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((folder) => (
            <MenuItem
              key={folder.id}
              onClick={() => handleMoveToFolder(folder.id)}
              sx={{ fontSize: '13px', py: 1, fontWeight: 500 }}
            >
              <FolderIcon
                sx={{
                  fontSize: 18,
                  mr: 1.5,
                  color: folder.color || 'primary.main',
                }}
              />
              {folder.name}
            </MenuItem>
          ))}
      </Menu>

      <CreateFolderModal
        open={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onCreate={handleCreateFolder}
      />

      <UpdateFolderModal
        key={selectedFolderToManage?.id || 'new'}
        open={isUpdateFolderModalOpen}
        onClose={() => {
          setIsUpdateFolderModalOpen(false);
          setSelectedFolderToManage(null);
        }}
        onUpdate={handleUpdateFolder}
        folder={selectedFolderToManage}
      />

      <AllFoldersModal
        open={isAllFoldersModalOpen}
        onClose={() => setIsAllFoldersModalOpen(false)}
        folders={folders}
        selectedId={selectedFolderId}
        onSelect={(id) => {
          setSelectedFolderId(id);
          setIsAllFoldersModalOpen(false);
        }}
      />

      <Menu
        anchorEl={folderAnchorEl}
        open={Boolean(folderAnchorEl)}
        onClose={handleFolderMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            mt: 1,
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            minWidth: 160,
            bgcolor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsUpdateFolderModalOpen(true);
            handleFolderMenuClose();
          }}
          sx={{ fontSize: '13px', py: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <EditIcon fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <ListItemText>Edit Folder</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleDeleteFolder}
          sx={{ fontSize: '13px', py: 1, color: 'error.main' }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>Delete Folder</ListItemText>
        </MenuItem>
      </Menu>
    </LibraryContainer>
  );
};
