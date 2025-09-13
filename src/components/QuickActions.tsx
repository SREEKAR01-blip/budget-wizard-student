import { Button } from "@/components/ui/button";
import { Plus, Receipt, Target, Settings, Banknote } from "lucide-react";

interface QuickActionsProps {
  onAddMoney: () => void;
}

export const QuickActions = ({ onAddMoney }: QuickActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="default" size="sm" onClick={onAddMoney}>
        <Banknote className="h-4 w-4 mr-2" />
        Add Money
      </Button>
      <Button variant="outline" size="sm">
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