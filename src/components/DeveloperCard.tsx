
import React from 'react';
import { Link } from 'react-router-dom';
import { Developer } from '@/types';
import { AnimatedContainer } from './AnimatedContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';

interface DeveloperCardProps {
  developer: Developer;
  index?: number;
}

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer, index = 0 }) => {
  return (
    <AnimatedContainer 
      delay={index * 0.05} 
      className="h-full"
      animation="scaleIn"
    >
      <Link to={`/developers/${developer.id}`} className="block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="p-6 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {developer.logoUrl ? (
                <img 
                  src={developer.logoUrl} 
                  alt={developer.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 size={32} className="text-muted-foreground" />
              )}
            </div>
          </div>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-lg mb-1">{developer.name}</h3>
            <p className="text-muted-foreground text-sm mb-3">Est. {developer.established}</p>
            <p className="text-sm mb-4 line-clamp-2">{developer.description}</p>
            <Badge variant="outline" className="font-normal">
              {developer.projects.length} Projects
            </Badge>
          </CardContent>
        </Card>
      </Link>
    </AnimatedContainer>
  );
};
