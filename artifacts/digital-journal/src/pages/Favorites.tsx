import { useJournals } from "@/hooks/use-journals";
import { JournalList } from "@/components/journals/JournalList";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { activeJournals } = useJournals();
  
  const favorites = activeJournals
    .filter(j => j.isFavorite)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-destructive/10 p-2 rounded-xl text-destructive">
          <Heart className="h-6 w-6 fill-current" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
      </div>

      <p className="text-muted-foreground mb-8">
        Your most loved and important journal entries, all in one place.
      </p>

      <JournalList 
        journals={favorites}
        emptyState={
          <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="bg-secondary p-6 rounded-full mb-6">
              <Heart className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground max-w-sm">
              Click the heart icon on any journal entry to add it to your favorites.
            </p>
          </div>
        }
      />
    </div>
  );
}
