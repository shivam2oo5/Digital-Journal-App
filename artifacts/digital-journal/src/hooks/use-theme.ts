import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '@/lib/storage';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getSettings().theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    saveSettings({ theme });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}
