
import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigation } from '@/components/Navigation';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Building, 
  User, 
  Calendar, 
  ArrowLeft,
  Phone
} from 'lucide-react';
import { Property } from '@/types';

// Mock properties data
const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Pool',
    description: 'Spacious villa with private pool and garden, perfect for families. This stunning property features high ceilings, marble flooring, and large windows allowing natural light to flood the living spaces. The property includes a modern kitchen with top-of-the-line appliances, a dining area that opens to a terrace, and a landscaped garden with a private swimming pool.',
    price: 850000,
    location: 'Palm Jumeirah, Dubai',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80',
    projectId: '1',
    ownerId: '1'
  },
  {
    id: '2',
    title: 'Modern City Apartment',
    description: 'Contemporary apartment in the heart of the city with amazing views. This luxurious apartment offers floor-to-ceiling windows with panoramic city views, an open-plan living area with designer furnishings, and a state-of-the-art kitchen. The master bedroom includes an en-suite bathroom with a rainfall shower and a walk-in closet.',
    price: 420000,
    location: 'Downtown, Dubai',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80',
    projectId: '2',
    ownerId: '1'
  },
  {
    id: '3',
    title: 'Waterfront Penthouse',
    description: 'Exclusive penthouse with panoramic water views and premium finishes. Located on the top floor, this exceptional penthouse boasts uninterrupted views of the coastline, a spacious terrace perfect for entertaining, and luxury finishes throughout. The property features a gourmet kitchen, a master suite with a spa-like bathroom, and a private elevator entrance.',
    price: 1250000,
    location: 'Marina Bay, Dubai',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 210,
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80',
    projectId: '1',
    ownerId: '1'
  },
];

const PropertyDetails = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const property = properties.find(p => p.id === id);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If property not found
  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="md:pl-64 pt-16 md:pt-0 pb-16 min-h-screen">
          <div className="container px-4 py-8">
            <AnimatedContainer>
              <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold mb-8">Property Not Found</h1>
              <p className="text-muted-foreground mb-6">The property you are looking for does not exist or has been removed.</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </AnimatedContainer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-16 min-h-screen">
        <div className="container px-4 py-8">
          <AnimatedContainer>
            <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Images */}
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden aspect-video mb-4">
                  <img 
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden md:grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-lg overflow-hidden aspect-square bg-muted">
                      <img 
                        src={property.imageUrl}
                        alt={`${property.title} - View ${i}`}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property Info */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin size={16} className="mr-1" />
                        <span>{property.location}</span>
                      </div>
                      <div className="text-3xl font-bold mb-4">${property.price.toLocaleString()}</div>
                      <div className="flex items-center justify-between mb-6 text-sm">
                        <div className="flex items-center">
                          <Bed size={18} className="mr-1" />
                          <span>{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center">
                          <Bath size={18} className="mr-1" />
                          <span>{property.bathrooms} baths</span>
                        </div>
                        <div className="flex items-center">
                          <Square size={18} className="mr-1" />
                          <span>{property.area} m²</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-2">Contact Agent</h3>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">John Smith</div>
                          <div className="text-sm text-muted-foreground">Premier Agent</div>
                        </div>
                      </div>
                      <Button className="w-full mb-2">
                        <Phone size={16} className="mr-2" /> Call Agent
                      </Button>
                      <Button variant="outline" className="w-full">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedContainer>
          
          {/* Property Tabs */}
          <AnimatedContainer className="mt-8" delay={0.1}>
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Property Description</h2>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Property ID</div>
                      <div className="font-medium">{property.id}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Type</div>
                      <div className="font-medium">
                        {property.bedrooms > 3 ? 'Villa' : 'Apartment'}
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                      <div className="font-medium">{property.bedrooms}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                      <div className="font-medium">{property.bathrooms}</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Area</div>
                      <div className="font-medium">{property.area} m²</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-medium">For Sale</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  {['Air Conditioning', 'Balcony', 'Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Elevator', 'Storage'].map(feature => (
                    <div key={feature} className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map View of {property.location}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Nearby Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Schools', 'Hospitals', 'Shopping Centers', 'Parks'].map(amenity => (
                      <div key={amenity} className="p-3 border rounded-lg text-center">
                        <div className="text-sm text-muted-foreground mb-1">Nearest {amenity}</div>
                        <div className="font-medium">0.5 - 2 km</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedContainer>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
