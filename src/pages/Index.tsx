import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  // Mock data for demonstration
  const [financialData] = useState({
    totalBalance: 2847.50,
    monthlyBudget: 1200.00,
    spent: 847.32,
    goals: [
      { id: "1", name: "Emergency Fund", target: 1000, current: 650 },
      { id: "2", name: "Laptop", target: 800, current: 320 },
      { id: "3", name: "Spring Break", target: 500, current: 150 }
    ],
    recentExpenses: [
      { id: "1", description: "Coffee & Pastry", amount: 8.50, category: "Food", date: "2024-01-15" },
      { id: "2", description: "Bus Pass", amount: 45.00, category: "Transport", date: "2024-01-14" },
      { id: "3", description: "Textbooks", amount: 120.00, category: "Education", date: "2024-01-13" },
      { id: "4", description: "Groceries", amount: 67.80, category: "Food", date: "2024-01-12" },
      { id: "5", description: "Movie Night", amount: 15.00, category: "Entertainment", date: "2024-01-11" },
      { id: "6", description: "Lunch", amount: 12.50, category: "Food", date: "2024-01-10" },
      { id: "7", description: "Gas", amount: 35.00, category: "Transport", date: "2024-01-09" }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Dashboard 
        totalBalance={financialData.totalBalance}
        monthlyBudget={financialData.monthlyBudget}
        spent={financialData.spent}
        goals={financialData.goals}
        recentExpenses={financialData.recentExpenses}
      />
    </div>
  );
};

export default Index;
