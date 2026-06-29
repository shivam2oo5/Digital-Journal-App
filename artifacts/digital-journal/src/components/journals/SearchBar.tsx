import { Category, Mood } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: Category | "all";
  setCategoryFilter: (category: Category | "all") => void;
  moodFilter: Mood | "all";
  setMoodFilter: (mood: Mood | "all") => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const CATEGORIES: Category[] = ['Personal', 'Study', 'Work', 'Travel', 'Health', 'Goals', 'Ideas', 'Diary'];
const MOODS: Mood[] = ['Happy', 'Motivated', 'Calm', 'Excited', 'Neutral', 'Stressed', 'Sad'];

export function SearchBar({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  moodFilter,
  setMoodFilter,
  sortBy,
  setSortBy
}: SearchBarProps) {
  
  const hasFilters = categoryFilter !== "all" || moodFilter !== "all" || searchQuery !== "" || sortBy !== "newest";

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setMoodFilter("all");
    setSortBy("newest");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full p-4 bg-card rounded-[20px] shadow-sm border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search journals, tags..." 
          className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-background rounded-xl h-11"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
        <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val as any)}>
          <SelectTrigger className="w-[140px] rounded-xl h-11 bg-secondary/50 border-transparent">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={moodFilter} onValueChange={(val) => setMoodFilter(val as any)}>
          <SelectTrigger className="w-[130px] rounded-xl h-11 bg-secondary/50 border-transparent">
            <SelectValue placeholder="Mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            {MOODS.map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px] rounded-xl h-11 bg-secondary/50 border-transparent">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="title_asc">Title (A-Z)</SelectItem>
            <SelectItem value="title_desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-11 w-11 rounded-xl text-muted-foreground hover:text-foreground shrink-0" 
            onClick={clearFilters}
            title="Clear filters"
          >
            <FilterX className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
