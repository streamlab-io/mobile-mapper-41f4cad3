
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigation } from '@/components/Navigation';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import { ProjectCard } from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Project } from '@/types';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock projects data
const projects: Project[] = [
  {
    id: '1',
    title: 'Downtown Heights',
    description: 'Luxury residential tower in the heart of downtown with premium amenities.',
    location: 'Downtown, Dubai',
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    completionDate: 'Q4 2023',
    developerId: '1',
    properties: []
  },
  {
    id: '2',
    title: 'Marina Terraces',
    description: 'Waterfront apartments with stunning views of the marina and city skyline.',
    location: 'Dubai Marina',
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    completionDate: 'Q2 2022',
    developerId: '1',
    properties: []
  },
  {
    id: '3',
    title: 'Palm Villas',
    description: 'Exclusive beachfront villas on Palm Jumeirah with private beaches.',
    location: 'Palm Jumeirah, Dubai',
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    completionDate: 'Q3 2024',
    developerId: '2',
    properties: []
  },
  {
    id: '4',
    title: 'Business Bay Towers',
    description: 'Mixed-use development with offices, retail and residential units.',
    location: 'Business Bay, Dubai',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    completionDate: 'Q1 2025',
    developerId: '3',
    properties: []
  },
  {
    id: '5',
    title: 'Creek Harbour Residences',
    description: 'Contemporary apartments overlooking the historic Dubai Creek.',
    location: 'Dubai Creek Harbour',
    status: 'ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    completionDate: 'Q4 2023',
    developerId: '3',
    properties: []
  },
  {
    id: '6',
    title: 'Golf Views',
    description: 'Premium apartments overlooking championship golf courses.',
    location: 'Emirates Hills, Dubai',
    status: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    completionDate: 'Q3 2021',
    developerId: '4',
    properties: []
  }
];

const Projects = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredProjects = projects.filter(
    (project) => 
      (activeTab === 'all' || project.status === activeTab) &&
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-16 min-h-screen">
        <div className="container px-4 py-8">
          <AnimatedContainer>
            <h1 className="text-3xl font-bold mb-1">Projects</h1>
            <p className="text-muted-foreground mb-8">
              Explore real estate projects from top developers
            </p>
          </AnimatedContainer>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <AnimatedContainer className="w-full md:w-72" delay={0.1}>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer delay={0.2}>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </AnimatedContainer>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
