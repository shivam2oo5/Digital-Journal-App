import { useJournals } from "@/hooks/use-journals";
import { JournalList } from "@/components/journals/JournalList";
import { Trash2 } from "lucide-react";

export default function Trash() {
  const { deletedJournals } = useJournals();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-destructive/10 p-2 rounded-xl text-destructive">
          <Trash2 className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Trash</h1>
      </div>

      <p className="text-muted-foreground mb-8 max-w-2xl">
        Deleted journals are moved here. You can restore them or delete them permanently.
      </p>

      <JournalList 
        journals={deletedJournals}
        emptyState={
          <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="bg-secondary p-6 rounded-full mb-6">
              <Trash2 className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trash is empty</h3>
            <p className="text-muted-foreground max-w-sm">
              Deleted journals will appear here before they are permanently removed.
            </p>
          </div>
        }
      />
    </div>
  );
}
