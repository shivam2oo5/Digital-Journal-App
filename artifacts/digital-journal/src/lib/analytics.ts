import { Journal, CATEGORY_COLORS } from './storage';
import { startOfDay, subDays, format, isSameDay, parseISO, differenceInDays } from 'date-fns';

export function getWritingStreak(journals: Journal[]): { current: number; best: number } {
  if (journals.length === 0) return { current: 0, best: 0 };

  const sortedDates = journals
    .map(j => startOfDay(parseISO(j.createdAt)).getTime())
    .sort((a, b) => b - a); // Descending

  // Remove duplicates
  const uniqueDates = [...new Set(sortedDates)];

  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 1;
  
  const today = startOfDay(new Date()).getTime();
  const yesterday = startOfDay(subDays(new Date(), 1)).getTime();

  // Check if there's an entry today or yesterday to start the current streak
  if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = Math.round((uniqueDates[i] - uniqueDates[i + 1]) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate max streak
  if (uniqueDates.length > 0) {
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = Math.round((uniqueDates[i] - uniqueDates[i + 1]) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        tempStreak++;
      } else {
        if (tempStreak > maxStreak) maxStreak = tempStreak;
        tempStreak = 1;
      }
    }
    if (tempStreak > maxStreak) maxStreak = tempStreak;
  }

  return { current: currentStreak, best: maxStreak };
}

export function getJournalsPerDay(journals: Journal[], days: number): { date: string; count: number }[] {
  const result = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const targetDate = subDays(today, i);
    const count = journals.filter(j => isSameDay(parseISO(j.createdAt), targetDate)).length;
    result.push({
      date: format(targetDate, 'MMM dd'),
      count
    });
  }

  return result;
}

export function getJournalsPerMonth(journals: Journal[], months: number): { month: string; count: number }[] {
  const result = [];
  const today = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const targetMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
    
    const count = journals.filter(j => {
      const d = parseISO(j.createdAt);
      return d >= targetMonth && d < nextMonth;
    }).length;

    result.push({
      month: format(targetMonth, 'MMM yyyy'),
      count
    });
  }

  return result;
}

export function getCategoryDistribution(journals: Journal[]): { category: string; count: number; color: string }[] {
  const counts: Record<string, number> = {};
  
  journals.forEach(j => {
    counts[j.category] = (counts[j.category] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#cbd5e1'
    }))
    .sort((a, b) => b.count - a.count);
}

export function getMoodDistribution(journals: Journal[]): { mood: string; count: number }[] {
  const counts: Record<string, number> = {};
  
  journals.forEach(j => {
    counts[j.mood] = (counts[j.mood] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([mood, count]) => ({ mood, count }))
    .sort((a, b) => b.count - a.count);
}
