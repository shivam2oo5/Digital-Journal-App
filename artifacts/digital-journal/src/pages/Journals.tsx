import { useState, useMemo } from "react";
import { useJournals } from "@/hooks/use-journals";
import { SearchBar } from "@/components/journals/SearchBar";
import { JournalList } from "@/components/journals/JournalList";
import { Category, Mood } from "@/lib/storage";
import { FileText, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Journals() {
  const { activeJournals } = useJournals();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [moodFilter, setMoodFilter] = useState<Mood | "all">("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedJournals = useMemo(() => {
    let result = [...activeJournals];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(q) ||
        j.content.toLowerCase().includes(q) ||
        j.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filters
    if (categoryFilter !== "all") {
      result = result.filter(j => j.category === categoryFilter);
    }
    
    if (moodFilter !== "all") {
      result = result.filter(j => j.mood === moodFilter);
    }

    // Sort
    result.sort((a, b) => {
      // Pinned always on top
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [activeJournals, searchQuery, categoryFilter, moodFilter, sortBy]);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold tracking-tight">My Journals</h1>
        <Link href="/journal/new">
          <Button className="rounded-xl h-10 gap-2 shadow-sm">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">New Entry</span>
          </Button>
        </Link>
      </div>

      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        moodFilter={moodFilter}
        setMoodFilter={setMoodFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <JournalList 
        journals={filteredAndSortedJournals}
        emptyState={
          <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="bg-secondary p-6 rounded-full mb-6">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No journals found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {activeJournals.length === 0 
                ? "You haven't written any journal entries yet. Start capturing your thoughts!"
                : "No entries match your current search and filter criteria."}
            </p>
            {activeJournals.length === 0 ? (
              <Link href="/journal/new">
                <Button className="rounded-xl px-8 h-12 shadow-sm font-medium">Create your first entry</Button>
              </Link>
            ) : (
              <Button 
                variant="outline" 
                className="rounded-xl px-6 h-11"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setMoodFilter("all");
                }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
}
