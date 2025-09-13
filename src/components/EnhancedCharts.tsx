import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";

interface EnhancedChartsProps {
  expenses: Array<{
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
  }>;
  monthlyBudget: number;
  spent: number;
}

export const EnhancedCharts = ({ expenses, monthlyBudget, spent }: EnhancedChartsProps) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');

  // Generate mock data for different timeframes
  const generateTimeframeData = () => {
    switch (timeframe) {
      case 'daily':
        return Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return {
            period: date.toLocaleDateString('en-US', { weekday: 'short' }),
            spending: Math.random() * 200 + 50,
            remaining: monthlyBudget - (spent * (i + 1) / 7)
          };
        }).reverse();
      
      case 'weekly':
        return Array.from({ length: 4 }, (_, i) => ({
          period: `Week ${4 - i}`,
          spending: Math.random() * 800 + 200,
          remaining: monthlyBudget - (spent * (i + 1) / 4)
        })).reverse();
      
      case 'monthly':
        return Array.from({ length: 6 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return {
            period: date.toLocaleDateString('en-US', { month: 'short' }),
            spending: Math.random() * 2000 + 500,
            remaining: monthlyBudget - (spent * (i + 1) / 6)
          };
        }).reverse();
      
      case 'yearly':
        return Array.from({ length: 3 }, (_, i) => ({
          period: `${2024 - i}`,
          spending: Math.random() * 15000 + 5000,
          remaining: monthlyBudget * 12 - (spent * 12 * (i + 1) / 3)
        })).reverse();
      
      default:
        return [];
    }
  };

  const data = generateTimeframeData();
  
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as Array<{ category: string; amount: number }>);

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--success))',
    'hsl(var(--warning))',
    'hsl(var(--danger))',
    'hsl(var(--accent))',
    'hsl(var(--muted))',
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="spending" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="remaining" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Line type="monotone" dataKey="spending" stroke="hsl(var(--primary))" strokeWidth={3} />
              <Line type="monotone" dataKey="remaining" stroke="hsl(var(--success))" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <div className="flex items-center justify-center">
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5" />
          Enhanced Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-2 justify-between">
            <div className="flex gap-1">
              {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe(period as any)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-1">
              {['bar', 'line', 'pie'].map((type) => (
                <Button
                  key={type}
                  variant={chartType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType(type as any)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Chart */}
          <div className="w-full">
            {renderChart()}
          </div>
          
          {/* Legend for pie chart */}
          {chartType === 'pie' && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-foreground">{item.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};