import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, Target, AlertTriangle, Plus, DollarSign } from "lucide-react";
import { ExpenseChart } from "./ExpenseChart";
import { QuickActions } from "./QuickActions";

interface DashboardProps {
  totalBalance: number;
  monthlyBudget: number;
  spent: number;
  goals: Array<{
    id: string;
    name: string;
    target: number;
    current: number;
  }>;
  recentExpenses: Array<{
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
  }>;
}

export const Dashboard = ({ 
  totalBalance, 
  monthlyBudget, 
  spent, 
  goals, 
  recentExpenses 
}: DashboardProps) => {
  const remaining = monthlyBudget - spent;
  const spentPercentage = (spent / monthlyBudget) * 100;
  const isOverBudget = spent > monthlyBudget;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your spending and reach your goals</p>
        </div>
        <QuickActions />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{totalBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available funds
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{monthlyBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Budget limit
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Spent This Month</CardTitle>
            <TrendingUp className={`h-4 w-4 ${isOverBudget ? 'text-danger' : 'text-warning'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isOverBudget ? 'text-danger' : 'text-foreground'}`}>
              ₹{spent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {spentPercentage.toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
            <Target className={`h-4 w-4 ${remaining < 0 ? 'text-danger' : 'text-success'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remaining < 0 ? 'text-danger' : 'text-success'}`}>
              ₹{Math.abs(remaining).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {remaining < 0 ? 'Over budget' : 'Left to spend'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5" />
            Budget Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent: ₹{spent.toFixed(2)}</span>
              <span className="text-muted-foreground">Budget: ₹{monthlyBudget.toFixed(2)}</span>
            </div>
            <Progress 
              value={Math.min(spentPercentage, 100)} 
              className="h-3"
            />
            {isOverBudget && (
              <div className="flex items-center gap-2 text-danger text-sm">
                <AlertTriangle className="h-4 w-4" />
                You're over budget by ₹{(spent - monthlyBudget).toFixed(2)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart expenses={recentExpenses} />
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="h-5 w-5" />
              Financial Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{goal.name}</span>
                      <span className="text-muted-foreground">
                        ₹{goal.current} / ₹{goal.target}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};