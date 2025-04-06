
import { MapPin, Phone, Ambulance, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmergencyService {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy';
  distance: string;
  address: string;
  phone: string;
  isOpen24Hours: boolean;
}

const EmergencyServices = () => {
  // Mock data for emergency services
  const nearbyServices: EmergencyService[] = [
    {
      id: '1',
      name: 'City General Hospital',
      type: 'hospital',
      distance: '1.2 miles',
      address: '123 Medical Center Dr, Healthcare City',
      phone: '(555) 123-4567',
      isOpen24Hours: true
    },
    {
      id: '2',
      name: 'Urgent Care Clinic',
      type: 'clinic',
      distance: '0.8 miles',
      address: '456 Health St, Healthcare City',
      phone: '(555) 987-6543',
      isOpen24Hours: false
    },
    {
      id: '3',
      name: 'Community Pharmacy',
      type: 'pharmacy',
      distance: '0.5 miles',
      address: '789 Medication Ave, Healthcare City',
      phone: '(555) 456-7890',
      isOpen24Hours: false
    }
  ];
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-healthcare-dark mb-2">Emergency Services</h2>
        <p className="text-gray-600">Quickly access emergency medical help when needed</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-healthcare-danger text-white border-none">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full">
            <Phone size={32} className="mb-2" />
            <h3 className="text-lg font-semibold">Emergency Call</h3>
            <p className="text-sm mt-1 mb-3">Call emergency services immediately</p>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/20"
            >
              Call 911
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-healthcare-primary text-white border-none">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full">
            <Ambulance size={32} className="mb-2" />
            <h3 className="text-lg font-semibold">Ambulance</h3>
            <p className="text-sm mt-1 mb-3">Request emergency transport</p>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/20"
            >
              Request
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-healthcare-warning text-healthcare-dark border-none">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full">
            <Activity size={32} className="mb-2" />
            <h3 className="text-lg font-semibold">SOS Alert</h3>
            <p className="text-sm mt-1 mb-3">Alert emergency contacts</p>
            <Button 
              variant="outline" 
              className="text-healthcare-dark border-healthcare-dark hover:bg-white/20"
            >
              Send Alert
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold text-healthcare-dark mb-4">Nearby Medical Facilities</h3>
      
      <div className="space-y-4">
        {nearbyServices.map((service) => (
          <Card key={service.id} className="health-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-healthcare-dark">{service.name}</h4>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span>{service.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Phone size={14} className="mr-1" />
                    <span>{service.phone}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-sm text-healthcare-primary font-medium">{service.distance} away</span>
                  {service.isOpen24Hours && (
                    <div className="text-xs bg-healthcare-success/20 text-healthcare-success rounded px-2 py-1 mt-1">
                      Open 24 Hours
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-healthcare-primary border-healthcare-primary hover:bg-healthcare-muted"
                >
                  Call
                </Button>
                <Button 
                  size="sm" 
                  className="bg-healthcare-primary hover:bg-healthcare-secondary"
                >
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyServices;
