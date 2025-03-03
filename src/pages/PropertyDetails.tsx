
import React, { useState } from 'react';
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
  Phone,
  Heart,
  Share2,
  MessageSquare,
  Check,
  ExternalLink
} from 'lucide-react';
import { Property, Project, Developer } from '@/types';

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

// Mock projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'Palm Residences',
    description: 'Luxury waterfront living at its finest',
    location: 'Palm Jumeirah, Dubai',
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    completionDate: '2021-05-15',
    developerId: '1',
    properties: []
  },
  {
    id: '2',
    title: 'Downtown Heights',
    description: 'Urban luxury in the heart of the city',
    location: 'Downtown, Dubai',
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    completionDate: '2023-11-30',
    developerId: '2',
    properties: []
  }
];

// Mock developers data
const developers: Developer[] = [
  {
    id: '1',
    name: 'Emaar Properties',
    description: 'Leading global property developer',
    logoUrl: 'https://logo.clearbit.com/emaar.com',
    established: '1997',
    projects: []
  },
  {
    id: '2',
    name: 'Nakheel',
    description: 'World-leading developer of iconic properties',
    logoUrl: 'https://logo.clearbit.com/nakheel.com',
    established: '2000',
    projects: []
  }
];

const PropertyDetails = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const property = properties.find(p => p.id === id);
  const project = projects.find(p => p.id === property?.projectId);
  const developer = developers.find(d => d.id === project?.developerId);

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

  // Find related properties
  const relatedProperties = properties.filter(p => 
    p.id !== property.id && 
    (p.projectId === property.projectId || 
    p.location.includes(property.location.split(',')[0]))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-16 min-h-screen">
        <div className="container px-4 py-8">
          <AnimatedContainer>
            <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </Link>
            
            {/* Property Status Badge */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="rounded-md text-xs font-medium px-2.5 py-1">For Sale</Badge>
              {project?.status === 'completed' && 
                <Badge variant="default" className="rounded-md text-xs font-medium px-2.5 py-1">Ready to Move</Badge>
              }
              {project?.status === 'ongoing' && 
                <Badge variant="outline" className="rounded-md text-xs font-medium px-2.5 py-1">Under Construction</Badge>
              }
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Images */}
              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden aspect-video mb-4 relative">
                  <img 
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full w-9 h-9 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart size={18} className={isFavorite ? "fill-primary text-primary" : ""} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full w-9 h-9 bg-background/80 backdrop-blur-sm hover:bg-background"
                    >
                      <Share2 size={18} />
                    </Button>
                  </div>
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
                      <div className="text-3xl font-bold mb-2">${property.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {(property.price / property.area).toLocaleString(undefined, {maximumFractionDigits: 0})} $/m²
                      </div>
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
                        <MessageSquare size={16} className="mr-2" /> Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Project Info */}
                {project && (
                  <Card className="mt-4">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">Project Information</h3>
                      <div className="flex items-start mb-3">
                        <Building size={16} className="mr-2 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">{project.description}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-3">
                        <User size={16} className="mr-2 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <div className="font-medium">{developer?.name || 'Developer'}</div>
                          <div className="text-sm text-muted-foreground">Est. {developer?.established}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar size={16} className="mr-2 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <div className="font-medium">Completion Date</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(project.completionDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <Link to={`/projects/${project.id}`} className="mt-4 inline-flex items-center text-sm text-primary hover:underline">
                        View Project Details <ExternalLink size={14} className="ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                )}
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
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Additional Property Details */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Interior Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                    {['Furnished', 'Modern Kitchen', 'Walk-in Closet', 'Ensuite Bathroom', 'Open Floor Plan'].map(feature => (
                      <div key={feature} className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
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
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Neighborhood</h3>
                  <p className="text-muted-foreground mb-4">
                    This property is located in one of the most desirable neighborhoods in Dubai, with easy access to major attractions, business districts, and entertainment venues. The area offers excellent transportation connections and is known for its safety and high quality of life.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Public Transport</div>
                      <div className="font-medium">10 min walk</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Airport</div>
                      <div className="font-medium">20 min drive</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">City Center</div>
                      <div className="font-medium">15 min drive</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedContainer>
          
          {/* Related Properties */}
          {relatedProperties.length > 0 && (
            <AnimatedContainer className="mt-12" delay={0.2}>
              <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProperties.map(relatedProperty => (
                  <Card key={relatedProperty.id} className="overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedProperty.imageUrl} 
                        alt={relatedProperty.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{relatedProperty.title}</h3>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <MapPin size={14} className="mr-1" />
                        <span>{relatedProperty.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <div className="flex items-center">
                          <Bed size={14} className="mr-1" />
                          <span>{relatedProperty.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath size={14} className="mr-1" />
                          <span>{relatedProperty.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square size={14} className="mr-1" />
                          <span>{relatedProperty.area} m²</span>
                        </div>
                      </div>
                      <div className="font-bold">${relatedProperty.price.toLocaleString()}</div>
                    </CardContent>
                    <CardFooter className="px-4 pb-4 pt-0">
                      <Link to={`/properties/${relatedProperty.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </AnimatedContainer>
          )}
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
