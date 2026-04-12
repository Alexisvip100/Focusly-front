import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($userId: String!, $filters: TaskFilterInput, $sort: TaskSortInput) {
    tasks: getTasksByUser(userId: $userId, filters: $filters, sort: $sort) {
      id
      title
      notes_encrypted
      status
      estimate_timer
      real_timer
      duration
      priority_level
      user_id
      category
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
        links {
          title
          url
        }
      }
      tags {
        name
      }
      filters {
        status
        priorityLevel
        category
      }
      deadline
      created_at
      updated_at
      links {
        title
        url
      }
      google_event_id
      estimated_start_date
      estimated_end_date
      participants {
        name
        email
        avatar
        responseStatus
      }
      workspace {
        id
        title
        content
        updatedAt
      }
    }
  }
`;

export const GET_TASKS_TITLES = gql`
  query GetTasksTitles($userId: String!) {
    tasks: getTasksByUser(userId: $userId) {
      id
      title
      status
      estimate_timer
      real_timer
      priority_level
      category
      notes_encrypted
      links {
        title
        url
      }
      google_event_id
      estimated_start_date
      estimated_end_date
      participants {
        name
        email
        avatar
        responseStatus
      }
      workspace {
        id
        title
        folder {
          id
          name
          color
        }
      }
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
        links {
          title
          url
        }
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      id
      title
      notes_encrypted
      status
      category
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
        links {
          title
          url
        }
      }
      estimate_timer
      real_timer
      duration
      tags {
        name
      }
      deadline
      updated_at
      links {
        title
        url
      }
      google_event_id
      estimated_start_date
      estimated_end_date
      participants {
        name
        email
        avatar
        responseStatus
      }
      priority_level
    }
}
`;

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      title
      notes_encrypted
      status
      category
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
        links {
          title
          url
        }
      }
      estimate_timer
      real_timer
      duration
      tags {
        name
      }
      deadline
      created_at
      links {
        title
        url
      }
      google_event_id
      estimated_start_date
      estimated_end_date
      participants {
        name
        email
        avatar
        responseStatus
      }
      priority_level
    }
}
`;

export const ADD_SUBTASK = gql`
  mutation AddSubtask($taskId: String!, $subtask: SubtaskInput!) {
    addSubtask(taskId: $taskId, subtask: $subtask) {
      id
      title
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
        links {
          title
          url
        }
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`;

export const GET_TAGS = gql`
  query GetTagsByUser($userId: String!) {
    getTagsByUser(userId: $userId) {
      name
    }
  }
`;

export const REMOVE_WORKSPACE = gql`
  mutation RemoveWorkspace($id: ID!) {
    removeWorkspace(id: $id)
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

export const GET_TOTAL_WORKSPACES = gql`
  query GetTotalWorkspaces {
    totalWorkspaces
  }
`;

export const GET_HAS_WORKSPACES = gql`
  query HasWorkspaces {
    hasWorkspaces
  }
`;

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

export const GET_INSIGHTS = gql`
  query GetInsights($userId: String!, $filter: String!) {
    insights: getInsights(userId: $userId, filter: $filter) {
      totalFocusHours {
        value
        change
        trend
      }
      taskCompletion {
        value
        change
        trend
      }
      energyScore {
        value
        change
        trend
      }
      goldenWindow {
        value
        change
        trend
      }
      productivityTrends {
        day
        actual
        planned
      }
      timeDistribution {
        name
        value
        color
      }
      heatmap
    }
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
