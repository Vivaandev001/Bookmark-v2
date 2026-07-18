export interface AppCardData {
  id: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  category: string; // references custom Category id or name
  createdAt: number;
  isFavorite?: boolean;
  lastOpened?: number;
  clickCount?: number;
}

export interface CustomCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name
  color: string; // color hex or tailwind class
  order: number;
}

export type SortFilter = 'all' | 'favorites' | 'recent' | 'most-used' | 'alphabetical' | 'newest' | 'oldest';
