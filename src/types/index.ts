
export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  properties: Property[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  projectId: string;
  ownerId: string;
}

export interface Developer {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  established: string;
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  imageUrl: string;
  completionDate: string;
  developerId: string;
  properties: Property[];
}
