
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { AnimatedContainer } from './AnimatedContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, index = 0 }) => {
  return (
    <AnimatedContainer 
      delay={index * 0.05} 
      className="h-full"
      animation="scaleIn"
    >
      <Link to={`/properties/${property.id}`} className="block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <Badge className="absolute top-3 right-3 font-medium">
              ${property.price.toLocaleString()}
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{property.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Bed size={16} className="mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath size={16} className="mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square size={16} className="mr-1" />
                <span>{property.area} m²</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </AnimatedContainer>
  );
};
