export type CurrencyCode = 'NPR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to NPR
  label: string;
}

export type ProductCategory = 'all' | 'paper' | 'textiles' | 'wood-metal' | 'gifts';

export interface Product {
  id: string;
  name: string;
  nepaliName: string;
  tagline: string;
  priceNpr: number;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  secondaryImage?: string;
  description: string;
  craftDetails: string;
  materials: string[];
  dimensions?: string;
  origin: string;
  artisanId: string;
  artisanName: string;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewCount: number;
  sustainableNote: string;
}

export interface Artisan {
  id: string;
  name: string;
  craftRole: string;
  location: string;
  experienceYears: number;
  bio: string;
  specialty: string;
  quote: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotalNpr: number;
  shippingNpr: number;
  totalNpr: number;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  country: string;
  paymentMethod: 'cod' | 'esewa' | 'card' | 'bank';
  giftMessage?: string;
}
