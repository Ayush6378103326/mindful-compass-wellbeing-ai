
import React from 'react';
import { Heart, Music, Wind, Brain, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const MentalWellbeing = () => {
  // Mock data for the mental wellbeing status
  const wellbeingScore = 75;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-healthcare-dark mb-2">Mental Wellbeing</h2>
        <p className="text-gray-600">Track your emotional health and get personalized support</p>
      </div>
      
      <Card className="health-card mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 rounded-full border-8 border-healthcare-muted flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-healthcare-primary">{wellbeingScore}</div>
                <div className="text-sm text-gray-500">Wellbeing</div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-healthcare-dark mb-3">Your Mental Health Status</h3>
              
              <div className="space-y-3">
                <WellbeingMetric 
                  label="Mood" 
                  value={80} 
                  color="bg-healthcare-primary" 
                />
                <WellbeingMetric 
                  label="Energy" 
                  value={65} 
                  color="bg-healthcare-secondary" 
                />
                <WellbeingMetric 
                  label="Stress" 
                  value={40} 
                  color="bg-healthcare-success" 
                />
                <WellbeingMetric 
                  label="Sleep Quality" 
                  value={70} 
                  color="bg-healthcare-warning" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold text-healthcare-dark mb-4">Personalized Recommendations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <RecommendationCard 
          title="Deep Breathing" 
          description="Try this 5-minute breathing exercise to reduce stress and anxiety"
          icon={<Wind className="text-healthcare-primary" />}
          action="Start Now"
        />
        <RecommendationCard 
          title="Calming Music" 
          description="Listen to curated sounds to help you relax and focus"
          icon={<Music className="text-healthcare-success" />}
          action="Listen"
        />
        <RecommendationCard 
          title="Self-Care Check" 
          description="Take our quick assessment to gauge your current emotional state"
          icon={<Heart className="text-healthcare-danger" />}
          action="Take Assessment"
        />
        <RecommendationCard 
          title="Talk to a Professional" 
          description="Connect with licensed therapists and counselors"
          icon={<User className="text-healthcare-secondary" />}
          action="Find Help"
        />
      </div>
      
      <div className="bg-healthcare-light rounded-lg p-6 border border-healthcare-muted">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="text-healthcare-primary" size={24} />
          <h3 className="text-lg font-semibold text-healthcare-dark">Daily Mental Health Tip</h3>
        </div>
        <p className="text-gray-600">
          Practice mindfulness by focusing on one task at a time. When your mind wanders, gently bring it back to what you're doing without judgment.
        </p>
      </div>
    </div>
  );
};

interface WellbeingMetricProps {
  label: string;
  value: number;
  color: string;
}

const WellbeingMetric = ({ label, value, color }: WellbeingMetricProps) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-healthcare-dark">{value}%</span>
    </div>
    <Progress 
      value={value} 
      className={cn("h-2", color)} 
    />
  </div>
);

interface RecommendationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
}

const RecommendationCard = ({ title, description, icon, action }: RecommendationCardProps) => (
  <Card className="health-card">
    <CardContent className="pt-6">
      <div className="flex gap-4">
        <div className="mt-1">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-healthcare-dark">{title}</h4>
          <p className="text-sm text-gray-600 mt-1 mb-3">{description}</p>
          <Button 
            variant="outline" 
            className="text-healthcare-primary border-healthcare-primary hover:bg-healthcare-muted"
            size="sm"
          >
            {action}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MentalWellbeing;
