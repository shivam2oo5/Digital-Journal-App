import { Journal, Mood } from "@/lib/storage";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, Heart, Calendar } from "lucide-react";
import { Link } from "wouter";
import { format, parseISO } from "date-fns";

const MOOD_ICONS: Record<Mood, string> = {
  Happy: "😊",
  Motivated: "💪",
  Calm: "😌",
  Excited: "🎉",
  Neutral: "😐",
  Stressed: "😰",
  Sad: "😢",
};

interface JournalCardProps {
  journal: Journal;
}

export function JournalCard({ journal }: JournalCardProps) {
  const snippet = journal.content.length > 120 
    ? journal.content.substring(0, 120) + "..."
    : journal.content;

  return (
    <Link href={`/journal/${journal.id}`}>
      <Card className="h-full flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-[20px] overflow-hidden group border-border/50 hover:border-border">
        <div 
          className="h-2 w-full transition-all duration-300 group-hover:h-3" 
          style={{ backgroundColor: journal.colorLabel }} 
        />
        <CardHeader className="p-5 pb-3">
          <div className="flex justify-between items-start mb-2">
            <Badge 
              variant="secondary" 
              className="rounded-full px-3 font-medium bg-secondary"
              style={{ color: journal.colorLabel }}
            >
              {journal.category}
            </Badge>
            <div className="flex gap-1.5 text-muted-foreground">
              {journal.isPinned && <Pin className="h-4 w-4 fill-primary text-primary" />}
              {journal.isFavorite && <Heart className="h-4 w-4 fill-destructive text-destructive" />}
            </div>
          </div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {journal.title}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1 gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{format(parseISO(journal.createdAt), "MMM d, yyyy")}</span>
            <span className="mx-1">•</span>
            <span className="text-sm" title={journal.mood}>{MOOD_ICONS[journal.mood]}</span>
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {snippet}
          </p>
        </CardContent>
        {journal.tags.length > 0 && (
          <CardFooter className="p-5 pt-0 flex flex-wrap gap-1.5 mt-auto">
            {journal.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="rounded-full text-[10px] font-normal px-2 py-0 h-5 text-muted-foreground/80 border-border/50">
                #{tag}
              </Badge>
            ))}
            {journal.tags.length > 3 && (
              <span className="text-xs text-muted-foreground/50 ml-1">+{journal.tags.length - 3}</span>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
