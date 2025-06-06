import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'electronics',
    image: "https://media.littlewoods.com/i/littlewoods/URTU4_SQ1_0000000004_BLACK_SLf?$300x400_retinamobilex2$",
    stock: 50
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    price: 24.99,
    category: 'clothing',
    image: 'https://static.zara.net/assets/public/2e72/1a1a/789844599539/9f09a1937390/05584361800-e1/05584361800-e1.jpg?ts=1725548400859',
    stock: 100
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    category: 'electronics',
    image: 'https://pyxis.nymag.com/v1/imgs/18c/714/5ef8445a19acd7192897e42790d828b55f.rsquare.w600.jpg',
    stock: 30
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Lightweight and comfortable running shoes',
    price: 89.99,
    category: 'sports',
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1000,h_1000/global/377758/01/sv01/fnd/AUS/fmt/png/ForeverRun-NITRO%E2%84%A2-Women',
    stock: 45
  },
  {
    id: '5',
    name: 'Living room Table ',
    description: 'Beautiful photography book for your living room',
    price: 49.99,
    category: 'home',
    image: 'https://m.media-amazon.com/images/I/611GZ32ryQL.jpg',
    stock: 25
  },
  {
    id: '6',
    name: 'Table Lamp',
    description: 'Modern design table lamp with adjustable brightness',
    price: 79.99,
    category: 'home',
    image: 'https://images.thdstatic.com/productImages/67d68f3a-327b-4412-9c16-3515a6e6469f/svn/ivory-homeroots-table-lamps-2000545872-64_1000.jpg',
    stock: 35
  }
]; 