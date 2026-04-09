import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskState } from './task.types';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    upsertTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      } else {
        state.tasks.push(action.payload);
      }
    },
    softDeleteTask: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index].deleted_at = new Date().toISOString();
      }
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetTask: (state) => {
      state.tasks = [];
      state.loading = false;
      state.error = null;
    },
  },
});


export const { setTasks, addTask, updateTask, upsertTask, softDeleteTask, removeTask, setLoading, setError, resetTask } =
  taskSlice.actions;

export default taskSlice.reducer;
