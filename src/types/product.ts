export type Category = 'electronics' | 'clothing' | 'books' | 'home' | 'sports';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
} 