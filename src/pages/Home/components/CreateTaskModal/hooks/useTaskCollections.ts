import { useState, useCallback, useMemo } from 'react';
import { deduplicateLinks, normalizeUrl, parseDuration } from '../CreateTaskModal.utils';
import type { UseTaskCollectionsProps } from '../types/CreateTaskModal.types';



export const useTaskCollections = ({ initialTask, onAddLink, onRemoveLink }: UseTaskCollectionsProps) => {
  const getInitialCollectionState = useCallback(() => {
    const defaults = {
      tags: [] as string[],
      subtasks: [] as { title: string; completed: boolean; timer: number }[],
      links: [] as { title: string; url: string }[],
    };

    if (!initialTask) return defaults;

    const {
      tags = [],
      subtasks = [],
      links = [],
    } = initialTask;

    const parsedTags = Array.isArray(tags)
      ? tags.map((t) => (typeof t === 'string' ? t : t.name))
      : [];

    const parsedSubtasks = Array.isArray(subtasks)
      ? subtasks.map((s) => {
          if (typeof s === 'string') return { title: s, completed: false, timer: 0 };
          const obj = s as { title?: string; name?: string; completed?: boolean; timer?: number };
          return {
            title: obj.title || obj.name || '',
            completed: !!obj.completed,
            timer: obj.timer || 0,
          };
        })
      : [];

    const parsedLinks = Array.isArray(links)
      ? deduplicateLinks(links.map((l) => ({ ...l })))
      : [];

    return {
      tags: parsedTags,
      subtasks: parsedSubtasks,
      links: parsedLinks,
    };
  }, [initialTask]);

  const initialCollections = useMemo(() => getInitialCollectionState(), [getInitialCollectionState]);

  const [tags, setTags] = useState<string[]>(initialCollections.tags);
  const [subtasks, setSubtasks] = useState<{ title: string; completed: boolean; timer: number }[]>(
    initialCollections.subtasks
  );
  const [links, setLinks] = useState<{ title: string; url: string }[]>(initialCollections.links);
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
    setSubtasks(subtasks.map((st, i) => (i === index ? { ...st, completed: !st.completed } : st)));
  };

  const handleAddLink = (title: string, url: string) => {
    if (url.trim()) {
      const updatedLinks = [
        ...links,
        {
          title: title.trim() || (url.includes('meet.google.com') ? 'Google Meet' : 'Link'),
          url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
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

  return {
    tags, setTags,
    subtasks, setSubtasks,
    links, setLinks,
    newTag, setNewTag,
    isAddingTag, setIsAddingTag,
    newSubtask, setNewSubtask,
    newSubtaskDuration, setNewSubtaskDuration,
    newLinkTitle, setNewLinkTitle,
    newLinkUrl, setNewLinkUrl,
    isAddingLink, setIsAddingLink,
    handleAddTag,
    handleAddSubtask,
    handleToggleSubtask,
    handleAddLink,
    handleRemoveLink,
    handleUpdateLink,
    initialCollections,
  };
};
