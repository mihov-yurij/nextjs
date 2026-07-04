export interface TeaProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  slug: string;
  isNew?: boolean;
}
