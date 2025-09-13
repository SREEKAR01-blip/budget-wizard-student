import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, Target, AlertTriangle, Plus, DollarSign, Edit, Share, Banknote, PiggyBank } from "lucide-react";
import { ExpenseChart } from "./ExpenseChart";
import { QuickActions } from "./QuickActions";
import { EditableField } from "./EditableField";
import { ShareExpenses } from "./ShareExpenses";
import { PersonalWallet } from "./PersonalWallet";
import { EnhancedCharts } from "./EnhancedCharts";
import { useToast } from "@/hooks/use-toast";

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
  onUpdateData: (updates: any) => void;
}

export const Dashboard = ({ 
  totalBalance, 
  monthlyBudget, 
  spent, 
  goals, 
  recentExpenses,
  onUpdateData 
}: DashboardProps) => {
  const remaining = monthlyBudget - spent;
  const spentPercentage = (spent / monthlyBudget) * 100;
  const isOverBudget = spent > monthlyBudget;
  const { toast } = useToast();

  const getBalanceColor = (balance: number) => {
    if (balance < 1000) return "text-danger";
    if (balance < 3000) return "text-warning";
    return "text-success";
  };

  const getSavingsMessage = () => {
    if (remaining > 500) {
      return "🎉 Great job saving money! You're on track!";
    }
    if (remaining > 0) {
      return "💪 Good spending control! Keep it up!";
    }
    return "⚠️ Consider reviewing your expenses.";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-muted-foreground mt-1">{getSavingsMessage()}</p>
        </div>
        <div className="flex gap-2">
          <ShareExpenses expenses={recentExpenses} />
          <QuickActions onAddMoney={() => toast({ title: "Add Money", description: "Feature coming soon!" })} />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <EditableField
              value={totalBalance}
              onSave={(value) => onUpdateData({ totalBalance: value })}
              type="currency"
              className={`text-2xl font-bold ${getBalanceColor(totalBalance)}`}
            />
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
            <EditableField
              value={monthlyBudget}
              onSave={(value) => onUpdateData({ monthlyBudget: value })}
              type="currency"
              className="text-2xl font-bold text-foreground"
            />
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

      {/* Enhanced Charts */}
      <EnhancedCharts expenses={recentExpenses} monthlyBudget={monthlyBudget} spent={spent} />

      {/* Goals and Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <PersonalWallet />
      </div>

      {/* Monthly Expenses Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5" />
            This Month's Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExpenses.map((expense, index) => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category} • {expense.date}</p>
                  </div>
                </div>
                <span className="font-bold text-danger">-₹{expense.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};