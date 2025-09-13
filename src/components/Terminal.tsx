import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

export const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalCommand[]>([
    {
      command: "welcome",
      output: "💰 Student Finance Manager Terminal v1.0\nType 'help' for available commands.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
• balance - Check current balance
• expenses [period] - View expenses (today, week, month)
• budget [amount] - Set monthly budget
• goal [name] [amount] - Create savings goal
• categories - List expense categories
• export - Export financial data
• clear - Clear terminal
• analyze - AI spending analysis`,

    balance: () => `Current Balance: $2,847.50
Monthly Budget: $1,200.00
Spent This Month: $847.32
Remaining: $352.68`,

    expenses: (period = "today") => {
      const data = {
        today: "Today's Expenses:\n• Coffee - $4.50 (Food)\n• Bus fare - $2.25 (Transport)\n• Lunch - $12.00 (Food)\nTotal: $18.75",
        week: "This Week's Expenses:\n• Groceries - $85.40 (Food)\n• Gas - $45.00 (Transport)\n• Books - $120.00 (Education)\n• Entertainment - $35.50 (Fun)\nTotal: $285.90",
        month: "This Month's Expenses:\n• Rent - $400.00 (Housing)\n• Food - $285.50 (Food)\n• Transport - $67.25 (Transport)\n• Education - $94.57 (Education)\nTotal: $847.32"
      };
      return data[period as keyof typeof data] || data.today;
    },

    budget: (amount?: string) => {
      if (!amount) return "Current budget: $1,200.00\nUsage: budget [amount] to set new budget";
      return `Budget updated to $${amount}`;
    },

    goal: (name?: string, amount?: string) => {
      if (!name || !amount) return "Usage: goal [name] [amount]\nExample: goal laptop 800";
      return `🎯 New goal created: ${name} - $${amount}`;
    },

    categories: () => `Expense Categories:
🏠 Housing (35% of budget)
🍕 Food (25% of budget)
🚗 Transport (15% of budget)
📚 Education (15% of budget)
🎮 Entertainment (10% of budget)`,

    export: () => "📊 Exporting financial data...\n✅ Data exported to student_finances_2024.csv",

    clear: () => "",

    analyze: () => `🤖 AI Analysis:
• Spending pattern: Normal for student
• Highest category: Food (33% above average)
• Recommendation: Consider meal planning
• Savings potential: $127/month
• Risk level: Low`
  };

  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(" ");
    
    let output = "";
    if (command === "clear") {
      setHistory([]);
      return;
    } else if (commands[command as keyof typeof commands]) {
      const commandFn = commands[command as keyof typeof commands] as Function;
      output = commandFn(...args);
    } else if (command === "") {
      return;
    } else {
      output = `Command not found: ${command}\nType 'help' for available commands.`;
    }

    const newCommand: TerminalCommand = {
      command: cmd,
      output,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newCommand]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-terminal-bg border-terminal-border border-t-2 border-x-0 border-b-0 rounded-t-lg">
      <div className="flex items-center justify-between p-3 border-b border-terminal-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-terminal-text" />
          <span className="text-sm font-medium text-terminal-text">Finance Terminal</span>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-terminal-prompt hover:text-terminal-text transition-colors"
        >
          {isMinimized ? "⬆" : "⬇"}
        </button>
      </div>
      
      {!isMinimized && (
        <div className="h-64">
          <div 
            ref={terminalRef}
            className="h-48 overflow-y-auto p-4 font-mono text-sm space-y-2"
          >
            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-terminal-text" />
                  <span className="text-terminal-prompt">student@finance:~$</span>
                  <span className="text-terminal-text">{item.command}</span>
                  <span className="text-xs text-terminal-prompt ml-auto">{item.timestamp}</span>
                </div>
                {item.output && (
                  <div className="ml-6 text-terminal-text whitespace-pre-line">
                    {item.output}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-terminal-border p-4">
            <div className="flex items-center gap-2 font-mono text-sm">
              <ChevronRight className="h-3 w-3 text-terminal-text" />
              <span className="text-terminal-prompt">student@finance:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-terminal-text outline-none placeholder-terminal-prompt"
                placeholder="Type a command..."
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      )}
    </Card>
  );
};