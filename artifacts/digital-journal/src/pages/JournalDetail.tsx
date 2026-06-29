import { useState, useEffect } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { useJournals } from "@/hooks/use-journals";
import { JournalForm } from "@/components/journals/JournalForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit2, Calendar, Clock, Archive, Trash2, Heart, Pin, RefreshCw } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function JournalDetail() {
  const [, params] = useRoute("/journal/:id");
  const [, setLocation] = useLocation();
  const { 
    allJournals, 
    deleteJournal, 
    permanentlyDeleteJournal, 
    restoreJournal,
    archiveJournal,
    restoreFromArchive,
    toggleFavorite,
    togglePin
  } = useJournals();
  
  const isNew = !params || !params.id || params.id === "new";
  const [isEditing, setIsEditing] = useState(isNew);

  const journal = params?.id ? allJournals.find(j => j.id === params.id) : undefined;

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    } else if (journal) {
      setIsEditing(false);
    }
  }, [isNew, journal?.id]);

  if (!isNew && !journal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-2">Journal not found</h2>
        <p className="text-muted-foreground mb-6">The entry you're looking for doesn't exist or was deleted.</p>
        <Link href="/journals">
          <Button className="rounded-xl">Back to Journals</Button>
        </Link>
      </div>
    );
  }

  if (isEditing) {
    return <JournalForm initialData={journal} />;
  }

  if (!journal) return null;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          {journal.isDeleted ? (
            <>
              <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={() => { restoreJournal(journal.id); toast.success("Journal restored"); }}>
                <RefreshCw className="h-4 w-4" /> Restore
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="rounded-xl gap-2">
                    <Trash2 className="h-4 w-4" /> Delete Permanently
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete permanently?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove the journal entry forever. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => { 
                        permanentlyDeleteJournal(journal.id); 
                        toast.success("Journal permanently deleted");
                        setLocation("/trash");
                      }}
                    >
                      Delete Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4" /> Edit
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl h-9 w-9" 
                onClick={() => { togglePin(journal.id); toast.success(journal.isPinned ? "Unpinned" : "Pinned"); }}
              >
                <Pin className={`h-4 w-4 ${journal.isPinned ? "fill-primary text-primary" : ""}`} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl h-9 w-9" 
                onClick={() => { toggleFavorite(journal.id); toast.success(journal.isFavorite ? "Removed from favorites" : "Added to favorites"); }}
              >
                <Heart className={`h-4 w-4 ${journal.isFavorite ? "fill-destructive text-destructive" : ""}`} />
              </Button>

              {journal.isArchived ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl gap-2 h-9 ml-2" 
                  onClick={() => { restoreFromArchive(journal.id); toast.success("Restored from archive"); }}
                >
                  <Archive className="h-4 w-4" /> Unarchive
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground" 
                  onClick={() => { archiveJournal(journal.id); toast.success("Journal archived"); setLocation("/journals"); }}
                  title="Archive"
                >
                  <Archive className="h-4 w-4" />
                </Button>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Move to trash?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will move the journal entry to the trash. You can restore it later.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => { 
                        deleteJournal(journal.id); 
                        toast.success("Moved to trash");
                        setLocation("/journals");
                      }}
                    >
                      Move to Trash
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      <div className="bg-card rounded-[32px] p-8 md:p-12 shadow-sm border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: journal.colorLabel }} />
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge 
            variant="secondary" 
            className="rounded-full px-4 py-1 font-medium bg-secondary/80 text-sm"
            style={{ color: journal.colorLabel }}
          >
            {journal.category}
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 text-sm bg-background">
            Mood: {journal.mood}
          </Badge>
          {journal.isArchived && (
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm bg-muted text-muted-foreground">
              Archived
            </Badge>
          )}
          {journal.isDeleted && (
            <Badge variant="destructive" className="rounded-full px-4 py-1 text-sm">
              In Trash
            </Badge>
          )}
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6 leading-tight text-foreground">
          {journal.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created: {format(parseISO(journal.createdAt), "MMMM d, yyyy 'at' h:mm a")}</span>
          </div>
          {journal.updatedAt !== journal.createdAt && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated: {format(parseISO(journal.updatedAt), "MMM d, yyyy")}</span>
            </div>
          )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {journal.content.split('\n').map((paragraph, index) => (
            <p key={index} className="min-h-[1.5rem] leading-relaxed text-foreground/90">{paragraph}</p>
          ))}
        </div>

        {journal.tags.length > 0 && (
          <div className="pt-8 border-t border-border/50">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
              {journal.tags.map(tag => (
                <Badge key={tag} variant="outline" className="rounded-full text-xs font-normal px-3 py-1 bg-secondary/30">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
