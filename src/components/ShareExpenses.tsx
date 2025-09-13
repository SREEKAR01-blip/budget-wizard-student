import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Share, MessageCircle, Mail, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareExpensesProps {
  expenses: Array<{
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
  }>;
}

export const ShareExpenses = ({ expenses }: ShareExpensesProps) => {
  const { toast } = useToast();
  
  const generateExpenseText = () => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    let text = `💰 My Monthly Expenses Summary:\n\n`;
    
    expenses.forEach((expense, index) => {
      text += `${index + 1}. ${expense.description} - ₹${expense.amount} (${expense.category})\n`;
    });
    
    text += `\n📊 Total Spent: ₹${total.toFixed(2)}\n`;
    text += `\nShared via Student Finance Manager`;
    
    return text;
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(generateExpenseText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('My Monthly Expenses Summary');
    const body = encodeURIComponent(generateExpenseText());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateExpenseText());
    toast({
      title: "Copied!",
      description: "Expense summary copied to clipboard.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share Expenses
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Share Your Expenses
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          <Button onClick={shareViaWhatsApp} className="w-full justify-start" variant="outline">
            <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
            Share via WhatsApp
          </Button>
          
          <Button onClick={shareViaEmail} className="w-full justify-start" variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Share via Email
          </Button>
          
          <Button onClick={copyToClipboard} className="w-full justify-start" variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Preview:</p>
          <p className="text-xs mt-1 whitespace-pre-line">
            {generateExpenseText().substring(0, 150)}...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};