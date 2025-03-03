
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigation } from '@/components/Navigation';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import { DeveloperCard } from '@/components/DeveloperCard';
import { Input } from '@/components/ui/input';
import { Developer } from '@/types';
import { Search } from 'lucide-react';

// Mock developers data
const developers: Developer[] = [
  {
    id: '1',
    name: 'Emaar Properties',
    description: 'Leading global property developer and provider of premium lifestyles.',
    logoUrl: 'https://logo.clearbit.com/emaar.com',
    established: '1997',
    projects: []
  },
  {
    id: '2',
    name: 'Nakheel',
    description: 'World-leading developer of iconic, innovative and sustainable properties.',
    logoUrl: 'https://logo.clearbit.com/nakheel.com',
    established: '2000',
    projects: []
  },
  {
    id: '3',
    name: 'Dubai Properties',
    description: 'Creating destinations that make a difference to people\'s lives.',
    logoUrl: 'https://logo.clearbit.com/dp.ae',
    established: '2004',
    projects: []
  },
  {
    id: '4',
    name: 'Damac Properties',
    description: 'Luxury real estate developer creating dream homes and communities.',
    logoUrl: 'https://logo.clearbit.com/damacproperties.com',
    established: '2002',
    projects: []
  },
  {
    id: '5',
    name: 'Sobha Realty',
    description: 'Premium luxury property developer delivering unmatched quality.',
    logoUrl: 'https://logo.clearbit.com/sobha.com',
    established: '1976',
    projects: []
  },
  {
    id: '6',
    name: 'Meraas',
    description: 'Innovative real estate developer creating unique experiences.',
    logoUrl: 'https://logo.clearbit.com/meraas.com',
    established: '2007',
    projects: []
  }
];

const Developers = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredDevelopers = developers.filter(
    (developer) => 
      developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-16 min-h-screen">
        <div className="container px-4 py-8">
          <AnimatedContainer>
            <h1 className="text-3xl font-bold mb-1">Developers</h1>
            <p className="text-muted-foreground mb-8">
              Explore top real estate developers and their projects
            </p>
          </AnimatedContainer>

          {/* Search Bar */}
          <AnimatedContainer className="max-w-md mb-8" delay={0.1}>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search developers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </AnimatedContainer>

          {/* Developers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.length > 0 ? (
              filteredDevelopers.map((developer, index) => (
                <DeveloperCard key={developer.id} developer={developer} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No developers found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Developers;
