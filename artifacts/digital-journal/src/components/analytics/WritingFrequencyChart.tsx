import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WritingFrequencyChartProps {
  data: { date: string; count: number }[];
}

export function WritingFrequencyChart({ data }: WritingFrequencyChartProps) {
  return (
    <Card className="rounded-[20px] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Writing Frequency (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
                tickFormatter={(value) => {
                  const parts = value.split(' ');
                  return parts[1]; // just return the day number
                }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                allowDecimals={false}
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--secondary))' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
                name="Entries"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
