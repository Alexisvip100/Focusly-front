import { client } from '@/api/apollo';
import { REMOVE_WORKSPACE, GET_WORKSPACES } from '../workspaces.graphql';
import { sileo } from 'sileo';

export const useWorkspaceActions = () => {
  const handleOpen = (id: string): void => {
    sileo.warning({
      title: 'Remove Workspace',
      description: 'Are you sure you want to remove this workspace?',
      fill: 'var(--sileo-warning-bg)',
      button: {
        title: 'Confirm',
        onClick: () => {
          deleteWorkspace(id);
        },
      },
    });
  };

  const deleteWorkspace = async (id: string) => {
    try {
      await client.mutate({
        mutation: REMOVE_WORKSPACE,
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              workspaces(existingWorkspaces = [], { readField }) {
                return existingWorkspaces.filter(
                  (workspaceRef: import('@apollo/client').Reference) =>
                    id !== readField('id', workspaceRef)
                );
              },
              totalWorkspaces(existingTotal = 0) {
                return Math.max(0, existingTotal - 1);
              },
            },
          });
        },
      });
      sileo.success({ 
        title: 'Workspace deleted', 
        fill: 'var(--sileo-delete-bg)', 
        });
    } catch (error) {
      console.error('Error deleting workspace:', error);
      sileo.error({ 
        title: 'Error deleting workspace', 
        fill: 'var(--sileo-error-bg)', 
        });
    }
  };

  // ... rest of the hook
  const searchWorkspaces = async (query: string) => {
    try {
      const result = await client.query({
        query: GET_WORKSPACES,
        variables: { search: query },
      });
      return result.data.workspaces;
    } catch (error) {
      console.error('Error searching workspaces:', error);
      return [];
    }
  };

  return {
    handleOpen,
    searchWorkspaces,
    deleteWorkspace,
    open: false, // Placeholder
    handleClose: () => {}, // Placeholder
    onConfirm: () => {}, // Placeholder
  };
};
