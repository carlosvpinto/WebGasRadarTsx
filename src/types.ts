export type FuelType = 'regular' | 'premium' | 'diesel' | 'glp';

export interface StationPrice {
  fuelType: FuelType;
  price: number; // e.g., 5.19
  unit: string; // '$'
  updatedAgo: string;
  isLowest?: boolean;
}

export interface GasStation {
  id: string;
  number: number;
  name: string;
  brand: '7-eleven' | 'chevron' | 'shell' | 'bp' | 'repsol' | 'texaco' | 'costco';
  brandColor: string;
  address: string;
  neighborhood: string;
  coords: { x: number; y: number }; // percentage on map (0-100)
  lat: number;
  lng: number;
  distance: string; // e.g. "1.1 mi" or "1.8 km"
  distanceMinutes: number; // 3 min
  rating: number;
  reviewCount: number;
  status: 'Abierto 24h' | 'Abierto' | 'Cierra a las 22:00';
  prices: Record<FuelType, number>;
  bestPrice: number;
  priceCategory: 'low' | 'medium' | 'high'; // green (low), orange (medium), red (high)
  amenities: string[];
  logo: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  savedAmount: string;
  location: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  highlight?: string;
}

export interface FilterState {
  fuelType: FuelType;
  maxDistance: number;
  onlyOpenNow: boolean;
  sortBy: 'price' | 'distance' | 'rating';
  searchQuery: string;
  selectedBrand: string;
}
