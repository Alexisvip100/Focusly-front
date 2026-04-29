import { useState, useCallback, useMemo } from 'react';
import {
  deduplicateLinks,
  normalizeUrl,
  parseDuration,
} from '@/pages/Tasks/components/TaskDetailModal/TaskDetailModal.utils';
import type { UseTaskCollectionsProps } from '../types/TaskDetailModal.types';
import type { TaskResponse } from '@/api/Tasks/apiTaskTypes';

export const useTaskCollections = ({
  initialTask,
  onAddLink,
  onRemoveLink,
}: UseTaskCollectionsProps) => {
  const getInitialCollectionState = useCallback(() => {
    const defaults = {
      tags: [] as string[],
      subtasks: [] as TaskResponse['subtasks'],
      links: [] as { title: string; url: string }[],
      collaborators: [] as { name: string; email: string; avatar?: string }[],
    };

    if (!initialTask) return defaults;

    const {
      tags = [],
      subtasks = [],
      links = [],
      collaborators = [],
    } = initialTask;

    const parsedTags = Array.isArray(tags)
      ? tags.map((t) => (typeof t === 'string' ? t : t.name))
      : [];

    const parsedSubtasks = Array.isArray(subtasks)
      ? subtasks.map((s) => {
          if (typeof s === 'string')
            return { title: s, completed: false, timer: 0 };
          const obj = s as TaskResponse['subtasks'][number];
          return {
            title: obj.title,
            completed: !!obj.completed,
            timer: obj.timer,
            estimate_timer: obj.estimate_timer,
            notes_encrypted: obj.notes_encrypted,
            priority_level: obj.priority_level,
            status: obj.status,
            deadline: obj.deadline,
            category: obj.category,
            links: obj.links,
          };
        })
      : [];

    const parsedLinks = Array.isArray(links)
      ? deduplicateLinks(links.map((l) => ({ ...l })))
      : [];

    const parsedCollaborators = Array.isArray(collaborators)
      ? collaborators.map((c) => ({ ...c }))
      : [];

    return {
      tags: parsedTags,
      subtasks: parsedSubtasks,
      links: parsedLinks,
      collaborators: parsedCollaborators,
    };
  }, [initialTask]);

  const initialCollections = useMemo(
    () => getInitialCollectionState(),
    [getInitialCollectionState],
  );

  const [tags, setTags] = useState<string[]>(initialCollections.tags);
  const [subtasks, setSubtasks] = useState<TaskResponse['subtasks']>(
    initialCollections.subtasks,
  );
  const [links, setLinks] = useState<{ title: string; url: string }[]>(
    initialCollections.links,
  );
  const [collaborators, setCollaborators] = useState<
    { name: string; email: string; avatar?: string }[]
  >(initialCollections.collaborators);
  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [newSubtaskDuration, setNewSubtaskDuration] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isAddingLink, setIsAddingLink] = useState(false);

  const handleAddTag = (keepOpen = false) => {
    if (newTag.trim()) {
      setTags((prev) => [...new Set([...prev, newTag.trim()])]);
      setNewTag('');
    }
    if (!keepOpen) setIsAddingTag(false);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        {
          title: newSubtask.trim(),
          completed: false,
          timer: parseDuration(newSubtaskDuration) || 0,
        },
      ]);
      setNewSubtask('');
      setNewSubtaskDuration('');
    }
  };

  const handleToggleSubtask = (index: number) => {
    setSubtasks(
      subtasks.map((st, i) =>
        i === index ? { ...st, completed: !st.completed } : st,
      ),
    );
  };

  const handleAddLink = (title: string, url: string) => {
    if (url.trim()) {
      const updatedLinks = [
        ...links,
        {
          title:
            title.trim() ||
            (url.includes('meet.google.com') ? 'Google Meet' : 'Link'),
          url: url.trim().startsWith('http')
            ? url.trim()
            : `https://${url.trim()}`,
        },
      ];
      const normNew = normalizeUrl(url.trim());
      const isDuplicate = links.some((l) => normalizeUrl(l.url) === normNew);
      if (!isDuplicate) {
        setLinks(updatedLinks);
        if (onAddLink) onAddLink(updatedLinks);
      }
      setNewLinkTitle('');
      setNewLinkUrl('');
      setIsAddingLink(false);
    }
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    if (onRemoveLink) onRemoveLink(updatedLinks);
  };

  const handleUpdateLink = (index: number, title: string, url: string) => {
    setLinks((prev) => prev.map((l, i) => (i === index ? { title, url } : l)));
  };

  const handleAddCollaborator = (name: string, email: string) => {
    if (email.trim()) {
      setCollaborators((prev) => {
        const exists = prev.some(
          (c) => c.email.toLowerCase() === email.toLowerCase(),
        );
        if (exists) return prev;
        return [...prev, { name: name.trim(), email: email.trim() }];
      });
    }
  };

  const handleRemoveCollaborator = (index: number) => {
    setCollaborators((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    tags,
    setTags,
    subtasks,
    setSubtasks,
    links,
    setLinks,
    collaborators,
    setCollaborators,
    newTag,
    setNewTag,
    isAddingTag,
    setIsAddingTag,
    newSubtask,
    setNewSubtask,
    newSubtaskDuration,
    setNewSubtaskDuration,
    newLinkTitle,
    setNewLinkTitle,
    newLinkUrl,
    setNewLinkUrl,
    isAddingLink,
    setIsAddingLink,
    handleAddTag,
    handleAddSubtask,
    handleToggleSubtask,
    handleAddLink,
    handleRemoveLink,
    handleUpdateLink,
    handleRemoveCollaborator,
    handleAddCollaborator,
    initialCollections,
  };
};
