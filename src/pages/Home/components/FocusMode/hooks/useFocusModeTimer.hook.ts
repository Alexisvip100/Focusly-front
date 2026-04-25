import { useState, useEffect, useMemo } from 'react';

interface UseFocusModeTimerProps {
  initialMinutes: number;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  onComplete: () => void;
  onTick?: (secondsPassed: number) => void;
}

export const useFocusModeTimer = ({
  initialMinutes,
  isActive,
  setIsActive,
  onComplete,
  onTick,
}: UseFocusModeTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  const progress = useMemo(() => {
    const totalSeconds = initialMinutes * 60;
    if (totalSeconds === 0) return 0;
    return Math.min(((totalSeconds - timeLeft) / totalSeconds) * 100, 100);
  }, [timeLeft, initialMinutes]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            onComplete();
            return 0;
          }
          onTick?.(1);
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete, onTick, setIsActive]);

  return {
    timeLeft,
    setTimeLeft,
    progress,
    formatTime,
  };
};
