
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigation } from '@/components/Navigation';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Briefcase } from 'lucide-react';

// Mock data
const stats = [
  { 
    title: 'My Properties', 
    value: '3', 
    description: 'Total properties you own', 
    icon: Building2, 
    color: 'bg-blue-50 text-blue-600' 
  },
  { 
    title: 'Developers', 
    value: '12', 
    description: 'Top developers on platform', 
    icon: Users, 
    color: 'bg-purple-50 text-purple-600' 
  },
  { 
    title: 'Active Projects', 
    value: '24', 
    description: 'Ongoing development projects', 
    icon: Briefcase, 
    color: 'bg-amber-50 text-amber-600' 
  },
];

// Mock properties data
const properties = [
  {
    id: '1',
    title: 'Luxury Villa with Pool',
    description: 'Spacious villa with private pool and garden, perfect for families.',
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
    description: 'Contemporary apartment in the heart of the city with amazing views.',
    price: 420000,
    location: 'Downtown, New York',
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
    description: 'Exclusive penthouse with panoramic water views and premium finishes.',
    price: 1250000,
    location: 'Marina Bay, Singapore',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 210,
    imageUrl: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80',
    projectId: '1',
    ownerId: '1'
  },
];

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-16 min-h-screen">
        <div className="container px-4 py-8">
          <AnimatedContainer>
            <h1 className="text-3xl font-bold mb-1">Welcome back</h1>
            <p className="text-muted-foreground mb-8">
              Here's an overview of your real estate portfolio
            </p>
          </AnimatedContainer>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <AnimatedContainer key={stat.title} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-full`}>
                        <stat.icon size={20} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>

          {/* Recent Properties */}
          <AnimatedContainer className="mb-6" delay={0.2}>
            <h2 className="text-xl font-semibold mb-4">My Properties</h2>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <AnimatedContainer key={property.id} delay={0.3 + index * 0.1}>
                <Card className="overflow-hidden h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={property.imageUrl} 
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${property.price.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{property.location}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{property.bedrooms} beds</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.area} m²</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
