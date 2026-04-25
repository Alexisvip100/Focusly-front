import { gql } from '@apollo/client';

export const GET_WORKSPACES = gql`
  query GetWorkspaces($search: String) {
    workspaces(search: $search) {
      id
      title
      content
      updatedAt
      createdAt
      task {
        id
        title
        status
        estimate_timer
        real_timer
        duration
        priority_level
        subtasks {
          title
          completed
          timer
          notes_encrypted
          estimate_timer
          priority_level
          status
          deadline
          category
        }
        links {
          title
          url
        }
        google_event_id
      }
      folderId
      folder {
        id
        name
        color
      }
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($createWorkspaceInput: CreateWorkspaceInput!) {
    createWorkspace(createWorkspaceInput: $createWorkspaceInput) {
      id
      title
      content
      updatedAt
      taskId
      folderId
      saveStatus
    }
  }
`;

export const UPDATE_WORKSPACE = gql`
  mutation UpdateWorkspace($updateWorkspaceInput: UpdateWorkspaceInput!) {
    updateWorkspace(updateWorkspaceInput: $updateWorkspaceInput) {
      id
      title
      content
      updatedAt
      taskId
      folderId
    }
  }
`;

export const REMOVE_WORKSPACE = gql`
  mutation RemoveWorkspace($id: ID!) {
    removeWorkspace(id: $id)
  }
`;

export const GET_TOTAL_WORKSPACES = gql`
  query GetTotalWorkspaces {
    totalWorkspaces
  }
`;

export const GET_WORKSPACE_BY_ID = gql`
  query GetWorkspaceById($id: ID!) {
    workspace(id: $id) {
      id
      title
      content
      taskId
      task {
        id
        title
        status
        estimate_timer
        real_timer
        duration
        priority_level
        notes_encrypted
        subtasks {
          title
          completed
          timer
          notes_encrypted
          estimate_timer
          priority_level
          status
          deadline
          category
        }
        links {
          title
          url
        }
        google_event_id
      }
    }
}
`;

export const GET_FOLDERS = gql`
  query GetFolders {
    folders {
      id
      name
      color
      workspaceCount
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_FOLDER = gql`
  mutation CreateFolder($createFolderInput: CreateFolderInput!) {
    createFolder(createFolderInput: $createFolderInput) {
      id
      name
      color
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation UpdateFolder($updateFolderInput: UpdateFolderInput!) {
    updateFolder(updateFolderInput: $updateFolderInput) {
      id
      name
      color
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($id: ID!) {
    removeFolder(id: $id)
  }
`;
