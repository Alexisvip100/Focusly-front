import { useState, useCallback, useMemo } from 'react';
import type { Task } from '@/redux/tasks/task.types';
import {
  getPriorityFromLevel,
  formatDuration,
  parseDuration,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type { PriorityType } from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import { addMinutes, format } from 'date-fns';
import type { UseTaskFormStateProps } from '../types/TaskDetailModal.types';


export const useTaskFormState = ({ initialTask, initialStart }: UseTaskFormStateProps) => {
  const getInitialState = useCallback(() => {
    const defaults = {
      title: '',
      description: '',
      color: '#1e293b',
      priority: getPriorityFromLevel(2),
      status: 'Backlog' as Task['status'],
      category: 'General',
      currentDate: initialStart || new Date(),
      duration: '',
      realTime: '00:00',
    };

    if (!initialTask) return defaults;

    const {
      title,
      notes_encrypted = '',
      priority_level,
      status,
      category,
      deadline,
      estimate_timer,
      real_timer,
    } = initialTask;

    let color = '#1e293b';
    const colorMatch = notes_encrypted.match(/\[COLOR:(.*?)\]/);
    if (colorMatch && colorMatch[1]) {
      color = colorMatch[1];
    }

    const cleanDesc = notes_encrypted
      .replace(/\[START_DATE:(.*?)\]/g, '')
      .replace(/\[COLOR:(.*?)\]/g, '')
      .replace(/https?:\/\/(www\.)?(calendar\.google\.com|google\.com\/calendar|meet\.google\.com)[^\s]*/g, '')
      .trim();

    const hasEstimatedStart = initialTask.estimated_start_date && !isNaN(new Date(initialTask.estimated_start_date).getTime());
    const startInitial = hasEstimatedStart ? new Date(initialTask.estimated_start_date!) : new Date(deadline);

    return {
      title,
      description: cleanDesc,
      color,
      priority: getPriorityFromLevel(priority_level),
      status,
      category,
      currentDate: startInitial,
      duration: estimate_timer ? formatDuration(estimate_timer) : '',
      realTime: real_timer ? formatDuration(real_timer) : '',
    };
  }, [initialTask, initialStart]);

  const initialState = useMemo(() => getInitialState(), [getInitialState]);

  const [title, setTitle] = useState(initialState.title);
  const [description, setDescription] = useState(initialState.description);
  const [priority, setPriority] = useState<PriorityType>(initialState.priority);
  const [status, setStatus] = useState<Task['status']>(initialState.status);
  const [category, setCategory] = useState(initialState.category);
  const [currentDate, setCurrentDate] = useState<Date | null>(initialState.currentDate);
  const [duration, setDuration] = useState(initialState.duration);
  const [realTime, setRealTime] = useState(initialState.realTime);
  const [color, setColor] = useState(initialState.color);
  const [errors, setErrors] = useState<{ title?: string; duration?: string }>({});



  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { title?: string; duration?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    if (!duration.trim()) {
      newErrors.duration = 'Duration is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const timeSlotDisplay = useMemo(() => {
    if (!currentDate) return '';
    const mins = parseDuration(duration) || 25;
    const endDate = addMinutes(currentDate, mins);
    return `${format(currentDate, 'hh:mm a')} - ${format(endDate, 'hh:mm a')}`;
  }, [currentDate, duration]);

  return {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    status, setStatus,
    category, setCategory,
    currentDate, setCurrentDate,
    duration, setDuration,
    realTime, setRealTime,
    color, setColor,
    errors, setErrors,
    handleTitleChange,
    validateForm,
    initialState,
    timeSlotDisplay,
  };
};
