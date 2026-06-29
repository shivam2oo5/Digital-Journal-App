import { Journal, getJournals } from './storage';

export function exportToJson(): void {
  const journals = getJournals();
  const dataStr = JSON.stringify(journals, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `digital-journal-export-${new Date().toISOString().slice(0, 10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function exportToText(): void {
  const journals = getJournals();
  
  let text = 'DIGITAL JOURNAL PRO EXPORT\n';
  text += `Generated: ${new Date().toLocaleString()}\n`;
  text += `Total Entries: ${journals.length}\n`;
  text += '='.repeat(50) + '\n\n';
  
  journals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .forEach(j => {
      text += `[${new Date(j.createdAt).toLocaleString()}]\n`;
      text += `TITLE: ${j.title}\n`;
      text += `CATEGORY: ${j.category} | MOOD: ${j.mood}\n`;
      if (j.tags.length > 0) {
        text += `TAGS: ${j.tags.join(', ')}\n`;
      }
      text += `STATUS: ${j.isDeleted ? 'DELETED' : j.isArchived ? 'ARCHIVED' : 'ACTIVE'}\n`;
      text += '-'.repeat(30) + '\n';
      text += `${j.content}\n`;
      text += '='.repeat(50) + '\n\n';
    });
    
  const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(text);
  
  const exportFileDefaultName = `digital-journal-export-${new Date().toISOString().slice(0, 10)}.txt`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
