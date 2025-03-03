
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { AnimatedContainer } from './AnimatedContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <AnimatedContainer 
      delay={index * 0.05} 
      className="h-full"
      animation="scaleIn"
    >
      <Link to={`/projects/${project.id}`} className="block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              <Badge className={statusColors[project.status]}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{project.title}</h3>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm">{project.location}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              <span>Completion: {project.completionDate}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </AnimatedContainer>
  );
};
