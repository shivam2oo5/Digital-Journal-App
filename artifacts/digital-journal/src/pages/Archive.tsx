import { useJournals } from "@/hooks/use-journals";
import { JournalList } from "@/components/journals/JournalList";
import { Archive as ArchiveIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Archive() {
  const { archivedJournals } = useJournals();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-muted p-2 rounded-xl text-muted-foreground">
          <ArchiveIcon className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Archive</h1>
      </div>

      <p className="text-muted-foreground mb-8 max-w-2xl">
        Journals you've archived. They don't appear in your main lists or analytics, but they're safely stored here.
      </p>

      <JournalList 
        journals={archivedJournals}
        emptyState={
          <div className="flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="bg-secondary p-6 rounded-full mb-6">
              <ArchiveIcon className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Archive is empty</h3>
            <p className="text-muted-foreground max-w-sm">
              Archived journals will appear here. You can archive journals to declutter your main view without deleting them.
            </p>
          </div>
        }
      />
    </div>
  );
}
