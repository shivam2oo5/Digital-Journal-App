import { useState, useCallback } from 'react';
import { Journal } from '@/lib/storage';
import * as store from '@/lib/journal-store';

export function useJournals() {
  const [journals, setJournals] = useState<Journal[]>(() => store.getActiveJournals());
  const [allJournals, setAllJournals] = useState<Journal[]>(() => store.getJournals());

  const refresh = useCallback(() => {
    setJournals(store.getActiveJournals());
    setAllJournals(store.getJournals());
  }, []);

  return {
    journals,
    allJournals,
    activeJournals: journals,
    archivedJournals: store.getArchivedJournals(),
    deletedJournals: store.getDeletedJournals(),
    refresh,
    
    createJournal: (data: Parameters<typeof store.createJournal>[0]) => {
      const res = store.createJournal(data);
      refresh();
      return res;
    },
    
    updateJournal: (id: string, data: Parameters<typeof store.updateJournal>[1]) => {
      const res = store.updateJournal(id, data);
      refresh();
      return res;
    },
    
    deleteJournal: (id: string) => {
      store.deleteJournal(id);
      refresh();
    },
    
    restoreJournal: (id: string) => {
      store.restoreJournal(id);
      refresh();
    },
    
    permanentlyDeleteJournal: (id: string) => {
      store.permanentlyDeleteJournal(id);
      refresh();
    },
    
    archiveJournal: (id: string) => {
      store.archiveJournal(id);
      refresh();
    },
    
    restoreFromArchive: (id: string) => {
      store.restoreFromArchive(id);
      refresh();
    },
    
    toggleFavorite: (id: string) => {
      store.toggleFavorite(id);
      refresh();
    },
    
    togglePin: (id: string) => {
      store.togglePin(id);
      refresh();
    },
  };
}
