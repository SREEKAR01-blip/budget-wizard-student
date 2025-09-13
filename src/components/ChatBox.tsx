import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your financial assistant. How can I help you manage your money better today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const predefinedResponses: Record<string, string> = {
    "budget": "Based on your spending pattern, I recommend setting aside 30% for needs, 20% for wants, and 50% for savings. Your current budget utilization is good!",
    "save": "Great question! Try the 52-week savings challenge - save ₹1 in week 1, ₹2 in week 2, and so on. You'll save ₹1,378 by year-end!",
    "expense": "I notice you spend most on food and transport. Consider meal planning and using student discounts for transportation to save 15-20%.",
    "goal": "Setting realistic goals is key! Start with an emergency fund of ₹5,000, then work towards larger goals like a laptop or course fees.",
    "invest": "As a student, start with a simple savings account, then explore SIPs in mutual funds with as little as ₹500/month when you're ready."
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple keyword-based response
    setTimeout(() => {
      const lowercaseMessage = newMessage.toLowerCase();
      let response = "I understand your concern. Here are some general tips: Track your expenses daily, set realistic budgets, and always keep some money aside for emergencies. Would you like specific advice on budgeting or saving?";

      for (const [keyword, reply] of Object.entries(predefinedResponses)) {
        if (lowercaseMessage.includes(keyword)) {
          response = reply;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full h-14 w-14 shadow-lg">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-md h-[500px] flex flex-col p-0">
          <Card className="h-full flex flex-col border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                Financial Assistant
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col gap-4 p-4 pt-0">
              <div className="flex-1 overflow-y-auto space-y-3 max-h-[350px]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0">
                        <Bot className="h-6 w-6 text-primary mt-1" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0">
                        <User className="h-6 w-6 text-muted-foreground mt-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about budgeting, saving, expenses..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};