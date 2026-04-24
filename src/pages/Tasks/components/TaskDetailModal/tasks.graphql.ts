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
      task_type
      estimated_start_date
      estimated_end_date
      collaborators {
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
      task_type
      estimated_start_date
      estimated_end_date
      collaborators {
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
      task_type
      estimated_start_date
      estimated_end_date
      collaborators {
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
      task_type
      estimated_start_date
      estimated_end_date
      collaborators {
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
