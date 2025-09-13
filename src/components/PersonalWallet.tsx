import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiggyBank, Plus, CreditCard, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PersonalWallet = () => {
  const [savings, setSavings] = useState(2450.00);
  const [addAmount, setAddAmount] = useState("");
  const { toast } = useToast();

  const handleAddToWallet = () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      setSavings(prev => prev + amount);
      setAddAmount("");
      toast({
        title: "Money Added!",
        description: `₹${amount} added to your savings wallet.`,
      });
    }
  };

  const upiApps = [
    { name: "PhonePe", color: "bg-purple-500" },
    { name: "GPay", color: "bg-blue-500" },
    { name: "Paytm", color: "bg-cyan-500" },
    { name: "BHIM", color: "bg-orange-500" }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <PiggyBank className="h-5 w-5" />
          Personal Savings Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Savings</p>
            <p className="text-3xl font-bold text-success">₹{savings.toFixed(2)}</p>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount to add"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddToWallet} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Quick Add via UPI</p>
            <div className="grid grid-cols-2 gap-2">
              {upiApps.map((app) => (
                <Button
                  key={app.name}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => toast({ 
                    title: "UPI Integration", 
                    description: `${app.name} integration coming soon!` 
                  })}
                >
                  <div className={`w-3 h-3 rounded-full ${app.color} mr-2`} />
                  {app.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Card
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Smartphone className="h-4 w-4 mr-2" />
              UPI
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};