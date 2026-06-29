import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodChartProps {
  data: { mood: string; count: number }[];
}

const MOOD_COLORS: Record<string, string> = {
  Happy: "#fde047",
  Motivated: "#fb923c",
  Calm: "#60a5fa",
  Excited: "#f472b6",
  Neutral: "#94a3b8",
  Stressed: "#f87171",
  Sad: "#818cf8",
};

export function MoodChart({ data }: MoodChartProps) {
  if (data.length === 0) {
    return (
      <Card className="rounded-[20px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[20px] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Mood Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="mood" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--secondary))' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24} name="Entries">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={MOOD_COLORS[entry.mood] || "hsl(var(--primary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
