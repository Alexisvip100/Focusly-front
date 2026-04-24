export const parseDuration = (d: string | undefined | null): number => {
  if (!d || typeof d !== 'string') return 0;
  const norm = d.toLowerCase();
  const h = norm.match(/(\d+)h/)?.[1];
  const m = norm.match(/(\d+)m/)?.[1];
  let val = 0;
  if (h) val += parseInt(h, 10) * 60;
  if (m) val += parseInt(m, 10);
  if (!h && !m && /^\d+$/.test(norm.trim())) val += parseInt(norm.trim(), 10);
  return val;
};

export const formatDuration = (minutes?: number): string => {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

export const parseRealTime = (time: string): number => {
  return parseDuration(time);
};

export const TASK_COLORS = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ];

export type PriorityType = 'High' | 'Med' | 'Low' | 'No priority';

export const getPriorityFromLevel = (level: number): PriorityType => {
  if (level >= 3) return 'High';
  if (level === 1) return 'Low';
  if (level === 2) return 'Med';
  return 'No priority';
};

export const getPriorityLevel = (priority: PriorityType): number => {
  if (priority === 'High') return 4;
  if (priority === 'Low') return 1;
  if (priority === 'Med') return 2;
  return 0;
};

export const getTagColors = (tagName: string = 'General') => {
  // Simple hash for consistency
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Predefined premium HSL base colors
  // These are curated to look good with 12% opacity (background) and 80% opacity (border)
  const hues = [
    210, // Blue
    260, // Purple/Indigo
    330, // Pink/Rose
    15, // Orange/Coral
    160, // Emerald/Green
    195, // Sky/Cyan
    45, // Amber/Gold
    280, // Violet
  ];

  const hue = hues[Math.abs(hash) % hues.length];
  const saturation = 70;
  const lightness = 60;

  return {
    bgcolor: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`,
    color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    borderColor: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.4)`,
  };
};
export const normalizeUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export const deduplicateLinks = (links: { title: string; url: string }[]) => {
  const seen = new Set();
  return links.filter((l) => {
    const norm = normalizeUrl(l.url);
    if (seen.has(norm)) return false;
    seen.add(norm);
    return true;
  });
};

export const getTimerSuggestions = (val: string) => {
  const clean = val.trim();
  if (!clean || clean.length > 8) return [];
  
  const suggestions: string[] = [];
  if (/^\d+$/.test(clean)) {
    suggestions.push(`${clean}h`, `${clean}m`);
  } else if (/^\d+h$/.test(clean)) {
    suggestions.push(`${clean} 00m`, `${clean} 30m`);
  } else {
    const hmMatch = clean.match(/^(\d+h)\s*(\d+)$/);
    if (hmMatch) {
      suggestions.push(`${hmMatch[1]} ${hmMatch[2]}m`);
      if (hmMatch[2].length === 1) {
        suggestions.push(`${hmMatch[1]} ${hmMatch[2]}0m`);
      }
    }
  }
  return suggestions;
};

