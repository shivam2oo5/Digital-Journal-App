import { useState, useEffect } from 'react';
import { getSettings, saveSettings, Settings } from '@/lib/storage';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => getSettings());

  const updateSettings = (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    saveSettings(newSettings);
    
    // Apply font size class to body if it changes
    if (updates.fontSize) {
      document.body.classList.remove('text-sm', 'text-base', 'text-lg');
      if (updates.fontSize === 'small') document.body.classList.add('text-sm');
      else if (updates.fontSize === 'large') document.body.classList.add('text-lg');
      else document.body.classList.add('text-base');
    }
  };

  // Initialize body class on mount
  useEffect(() => {
    document.body.classList.remove('text-sm', 'text-base', 'text-lg');
    if (settings.fontSize === 'small') document.body.classList.add('text-sm');
    else if (settings.fontSize === 'large') document.body.classList.add('text-lg');
    else document.body.classList.add('text-base');
  }, []);

  return { settings, updateSettings };
}
