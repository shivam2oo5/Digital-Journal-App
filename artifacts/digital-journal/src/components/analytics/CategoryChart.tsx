import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryChartProps {
  data: { category: string; count: number; color: string }[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <Card className="rounded-[20px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Category Distribution</CardTitle>
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
        <CardTitle className="text-lg font-semibold">Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="count"
                nameKey="category"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
