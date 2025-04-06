
import { useState } from 'react';
import { Search, MapPin, PlusCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Medicine {
  id: string;
  name: string;
  description: string;
  usedFor: string[];
  sideEffects: string[];
}

const MedicineSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Mock search - in a real app, this would be an API call
    setTimeout(() => {
      const mockResults: Medicine[] = [
        {
          id: '1',
          name: 'Paracetamol',
          description: 'Common pain reliever and fever reducer',
          usedFor: ['Headache', 'Fever', 'Minor aches'],
          sideEffects: ['Nausea', 'Liver damage (with overuse)']
        },
        {
          id: '2',
          name: 'Ibuprofen',
          description: 'Non-steroidal anti-inflammatory drug (NSAID)',
          usedFor: ['Pain', 'Inflammation', 'Fever'],
          sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness']
        }
      ].filter(medicine => 
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-healthcare-dark mb-2">Find Medicines</h2>
        <p className="text-gray-600">Search for medications, check availability, and learn about alternatives</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Enter medicine name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 health-input"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-healthcare-primary hover:bg-healthcare-secondary"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </form>
      
      {searchResults.length > 0 ? (
        <div className="space-y-4 animate-fade-in">
          {searchResults.map((medicine) => (
            <Card key={medicine.id} className="health-card">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-healthcare-dark">{medicine.name}</h3>
                    <p className="text-gray-600 mt-1">{medicine.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>Find Nearby</span>
                  </Button>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium flex items-center gap-1 text-healthcare-dark">
                      <PlusCircle size={16} className="text-healthcare-success" />
                      Used For
                    </h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {medicine.usedFor.map((use, index) => (
                        <li key={index}>{use}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center gap-1 text-healthcare-dark">
                      <Info size={16} className="text-healthcare-warning" />
                      Side Effects
                    </h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {medicine.sideEffects.map((effect, index) => (
                        <li key={index}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-healthcare-muted flex justify-between">
                  <Button variant="link" className="text-healthcare-primary p-0">
                    View Alternatives
                  </Button>
                  <Button variant="link" className="text-healthcare-primary p-0">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchQuery && !isSearching ? (
        <div className="text-center p-8 bg-healthcare-light rounded-lg border border-healthcare-muted">
          <p className="text-gray-600">No medicines found matching "{searchQuery}"</p>
        </div>
      ) : null}
      
      {!searchQuery && !searchResults.length && (
        <div className="text-center p-8 bg-healthcare-light rounded-lg border border-healthcare-muted">
          <p className="text-gray-600">Enter a medicine name to begin your search</p>
        </div>
      )}
    </div>
  );
};

export default MedicineSearch;
