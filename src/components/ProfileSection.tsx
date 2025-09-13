import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, Bell, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProfileSection = () => {
  const [profile, setProfile] = useState({
    name: "Student Name",
    email: "student@email.com",
    phone: "+91 9876543210",
    avatar: "",
    lowBalanceAlert: 500
  });
  const [isLowBalance] = useState(false); // This would be calculated based on actual balance
  const { toast } = useToast();

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <div className="flex items-center gap-4">
      {isLowBalance && (
        <div className="flex items-center text-danger">
          <AlertTriangle className="h-5 w-5 mr-1" />
          <span className="text-sm">Low Balance Alert!</span>
        </div>
      )}
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block">{profile.name}</span>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert">Low Balance Alert (₹)</Label>
              <Input
                id="alert"
                type="number"
                value={profile.lowBalanceAlert}
                onChange={(e) => handleProfileUpdate('lowBalanceAlert', e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Bell className="h-4 w-4 text-warning" />
              <span className="text-sm">Alert will trigger when balance falls below ₹{profile.lowBalanceAlert}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};