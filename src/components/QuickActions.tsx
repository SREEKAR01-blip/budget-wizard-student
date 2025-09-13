import { Button } from "@/components/ui/button";
import { Plus, Receipt, Target, Settings } from "lucide-react";

export const QuickActions = () => {
  return (
    <div className="flex gap-2">
      <Button variant="default" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Expense
      </Button>
      <Button variant="outline" size="sm">
        <Receipt className="h-4 w-4 mr-2" />
        Scan Receipt
      </Button>
      <Button variant="outline" size="sm">
        <Target className="h-4 w-4 mr-2" />
        Set Goal
      </Button>
      <Button variant="ghost" size="sm">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};