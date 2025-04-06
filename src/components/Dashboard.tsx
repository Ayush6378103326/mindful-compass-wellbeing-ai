
import { useState } from 'react';
import MedicineSearch from './MedicineSearch';
import ChatBot from './ChatBot';
import MentalWellbeing from './MentalWellbeing';
import EmergencyServices from './EmergencyServices';
import { Search, MessageSquare, Activity, Ambulance } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('medicines');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-healthcare-dark text-center mb-8">
        Your Wellness <span className="text-healthcare-primary">Assistant</span>
      </h1>
      
      <Tabs defaultValue="medicines" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabTrigger value="medicines" icon={<Search size={18} />} label="Medicines" active={activeTab === 'medicines'} />
          <TabTrigger value="chat" icon={<MessageSquare size={18} />} label="Chat" active={activeTab === 'chat'} />
          <TabTrigger value="wellbeing" icon={<Activity size={18} />} label="Wellbeing" active={activeTab === 'wellbeing'} />
          <TabTrigger value="emergency" icon={<Ambulance size={18} />} label="Emergency" active={activeTab === 'emergency'} />
        </TabsList>
        
        <TabsContent value="medicines" className="animate-fade-in">
          <MedicineSearch />
        </TabsContent>
        
        <TabsContent value="chat" className="animate-fade-in">
          <ChatBot />
        </TabsContent>
        
        <TabsContent value="wellbeing" className="animate-fade-in">
          <MentalWellbeing />
        </TabsContent>
        
        <TabsContent value="emergency" className="animate-fade-in">
          <EmergencyServices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TabTriggerProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const TabTrigger = ({ value, icon, label, active }: TabTriggerProps) => (
  <TabsTrigger 
    value={value} 
    className={cn(
      "flex items-center justify-center gap-2 py-3",
      active ? "text-healthcare-primary" : "text-gray-500"
    )}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </TabsTrigger>
);

export default Dashboard;
