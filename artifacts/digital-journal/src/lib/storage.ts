export type Category = 'Personal' | 'Study' | 'Work' | 'Travel' | 'Health' | 'Goals' | 'Ideas' | 'Diary';
export type Mood = 'Happy' | 'Motivated' | 'Calm' | 'Excited' | 'Neutral' | 'Stressed' | 'Sad';

export interface Journal {
  id: string;
  title: string;
  content: string;
  category: Category;
  mood: Mood;
  tags: string[];
  colorLabel: string;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  defaultCategory: Category;
}

const JOURNALS_KEY = 'djp_journals';
const SETTINGS_KEY = 'djp_settings';

export const CATEGORY_COLORS: Record<Category, string> = {
  Study: '#3B82F6',
  Personal: '#8B5CF6',
  Work: '#4F46E5',
  Travel: '#22C55E',
  Ideas: '#F59E0B',
  Diary: '#EC4899',
  Goals: '#F97316',
  Health: '#14B8A6'
};

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  fontSize: 'medium',
  defaultCategory: 'Personal'
};

export function getJournals(): Journal[] {
  try {
    const data = localStorage.getItem(JOURNALS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to get journals from localStorage', error);
    return [];
  }
}

export function saveJournals(journals: Journal[]): void {
  try {
    localStorage.setItem(JOURNALS_KEY, JSON.stringify(journals));
  } catch (error) {
    console.error('Failed to save journals to localStorage', error);
  }
}

export function getSettings(): Settings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    console.error('Failed to get settings from localStorage', error);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<Settings>): void {
  try {
    const current = getSettings();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
  } catch (error) {
    console.error('Failed to save settings to localStorage', error);
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}
