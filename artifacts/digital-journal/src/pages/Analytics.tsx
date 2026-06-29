import { useJournals } from "@/hooks/use-journals";
import { getWritingStreak, getJournalsPerDay, getJournalsPerMonth, getCategoryDistribution, getMoodDistribution } from "@/lib/analytics";
import { WritingFrequencyChart } from "@/components/analytics/WritingFrequencyChart";
import { CategoryChart } from "@/components/analytics/CategoryChart";
import { MoodChart } from "@/components/analytics/MoodChart";
import { MonthlyActivityChart } from "@/components/analytics/MonthlyActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy } from "lucide-react";

export default function Analytics() {
  const { activeJournals } = useJournals();

  const streak = getWritingStreak(activeJournals);
  const freqData = getJournalsPerDay(activeJournals, 30);
  const monthData = getJournalsPerMonth(activeJournals, 12);
  const catData = getCategoryDistribution(activeJournals);
  const moodData = getMoodDistribution(activeJournals);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics</h1>
        <p className="text-muted-foreground">Insights into your writing habits and emotional patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-[20px] shadow-sm border-border/50 bg-gradient-to-br from-card to-orange-50/50 dark:to-orange-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">Current Streak</CardTitle>
            <Flame className="h-6 w-6 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-orange-500">{streak.current}</span>
              <span className="text-muted-foreground font-medium">days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {streak.current === 0 
                ? "Start writing today to build your streak!" 
                : "Keep it up! Consistency is key."}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] shadow-sm border-border/50 bg-gradient-to-br from-card to-yellow-50/50 dark:to-yellow-950/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">Best Streak</CardTitle>
            <Trophy className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-yellow-500">{streak.best}</span>
              <span className="text-muted-foreground font-medium">days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your longest consecutive writing period.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WritingFrequencyChart data={freqData} />
        <MonthlyActivityChart data={monthData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={catData} />
        <MoodChart data={moodData} />
      </div>
    </div>
  );
}
