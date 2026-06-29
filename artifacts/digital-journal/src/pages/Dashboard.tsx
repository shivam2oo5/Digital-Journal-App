import { useJournals } from "@/hooks/use-journals";
import { getWritingStreak } from "@/lib/analytics";
import { exportToJson } from "@/lib/export";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JournalList } from "@/components/journals/JournalList";
import { CategoryChart } from "@/components/analytics/CategoryChart";
import { WritingFrequencyChart } from "@/components/analytics/WritingFrequencyChart";
import { getJournalsPerDay, getCategoryDistribution } from "@/lib/analytics";
import { Link } from "wouter";
import { PlusCircle, FileText, Download, BarChart3, FolderOpen, Heart, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { activeJournals } = useJournals();

  const totalCount = activeJournals.length;
  const pinnedCount = activeJournals.filter(j => j.isPinned).length;
  const favoritesCount = activeJournals.filter(j => j.isFavorite).length;
  const streak = getWritingStreak(activeJournals);
  
  const recentJournals = [...activeJournals]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const freqData = getJournalsPerDay(activeJournals, 14);
  const catData = getCategoryDistribution(activeJournals);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Welcome back.</h2>
          <p className="text-muted-foreground">You have {totalCount} active journals in your workspace.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/journal/new">
            <Button className="rounded-xl h-10 px-4 gap-2 font-medium shadow-sm" size="sm">
              <PlusCircle className="h-4 w-4" />
              New Entry
            </Button>
          </Link>
          <Button variant="outline" className="rounded-xl h-10 px-4 gap-2 font-medium bg-card" size="sm" onClick={exportToJson}>
            <Download className="h-4 w-4 text-muted-foreground" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-[20px] shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Entries</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{favoritesCount}</div>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{streak.current} <span className="text-sm text-muted-foreground font-normal">days</span></div>
            <p className="text-xs text-muted-foreground mt-1">Best: {streak.best} days</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pinned</CardTitle>
            <PinIcon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pinnedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Recent Entries</h3>
            <Link href="/journals">
              <Button variant="ghost" size="sm" className="text-primary font-medium hover:text-primary/80">View All</Button>
            </Link>
          </div>
          
          <JournalList 
            journals={recentJournals} 
            emptyState={
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No entries yet.</p>
                <Link href="/journal/new">
                  <Button variant="outline" className="rounded-xl">Create your first entry</Button>
                </Link>
              </div>
            }
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/categories">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 rounded-[20px] bg-card hover:bg-secondary/80 border-border/50 shadow-sm">
                <FolderOpen className="h-5 w-5 text-primary" />
                <span>Categories</span>
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" className="w-full h-24 flex flex-col gap-2 rounded-[20px] bg-card hover:bg-secondary/80 border-border/50 shadow-sm">
                <BarChart3 className="h-5 w-5 text-accent" />
                <span>Analytics</span>
              </Button>
            </Link>
          </div>

          <div className="mt-8">
            <CategoryChart data={catData} />
          </div>
        </div>
      </div>

    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="17" x2="12" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  );
}
