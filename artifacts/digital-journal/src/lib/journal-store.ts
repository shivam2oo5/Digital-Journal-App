import { getJournals, saveJournals, Journal, Category, Mood, generateId } from './storage';
import { seedData } from './seed-data';

// Initialize with seed data if empty
const journals = getJournals();
if (journals.length === 0) {
  saveJournals(seedData);
}

export function createJournal(data: Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>): Journal {
  const journals = getJournals();
  const now = new Date().toISOString();
  
  const newJournal: Journal = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  
  saveJournals([newJournal, ...journals]);
  return newJournal;
}

export function updateJournal(id: string, updates: Partial<Journal>): Journal | undefined {
  const journals = getJournals();
  const index = journals.findIndex(j => j.id === id);
  
  if (index === -1) return undefined;
  
  const updatedJournal = {
    ...journals[index],
    ...updates,
    id, // Ensure ID cannot be changed
    updatedAt: new Date().toISOString(),
  };
  
  journals[index] = updatedJournal;
  saveJournals(journals);
  
  return updatedJournal;
}

export function deleteJournal(id: string): void {
  updateJournal(id, { isDeleted: true });
}

export function restoreJournal(id: string): void {
  updateJournal(id, { isDeleted: false, isArchived: false });
}

export function permanentlyDeleteJournal(id: string): void {
  const journals = getJournals();
  saveJournals(journals.filter(j => j.id !== id));
}

export function archiveJournal(id: string): void {
  updateJournal(id, { isArchived: true });
}

export function restoreFromArchive(id: string): void {
  updateJournal(id, { isArchived: false });
}

export function toggleFavorite(id: string): void {
  const journals = getJournals();
  const journal = journals.find(j => j.id === id);
  if (journal) {
    updateJournal(id, { isFavorite: !journal.isFavorite });
  }
}

export function togglePin(id: string): void {
  const journals = getJournals();
  const journal = journals.find(j => j.id === id);
  if (journal) {
    updateJournal(id, { isPinned: !journal.isPinned });
  }
}

export function getActiveJournals(): Journal[] {
  return getJournals().filter(j => !j.isDeleted && !j.isArchived);
}

export function getArchivedJournals(): Journal[] {
  return getJournals().filter(j => j.isArchived && !j.isDeleted);
}

export function getDeletedJournals(): Journal[] {
  return getJournals().filter(j => j.isDeleted);
}

export function searchJournals(query: string, filters?: { category?: Category; mood?: Mood }): Journal[] {
  let results = getActiveJournals();
  
  if (filters?.category) {
    results = results.filter(j => j.category === filters.category);
  }
  
  if (filters?.mood) {
    results = results.filter(j => j.mood === filters.mood);
  }
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    results = results.filter(j => 
      j.title.toLowerCase().includes(lowercaseQuery) ||
      j.content.toLowerCase().includes(lowercaseQuery) ||
      j.tags.some(t => t.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  return results;
}
