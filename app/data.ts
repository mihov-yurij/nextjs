import { TeaProduct } from './types';

export const FEATURED_TEAS: TeaProduct[] = [
  { 
    id: '1', 
    slug: 'huangshan-maofeng-green-tea', 
    name: 'Маофэн из Хуаншани (Huangshan Maofeng)', 
    category: 'Green Tea', 
    price: 24.99, 
    // Изменили на массив картинок (главная + 2 дополнительные)
    images: [
      '/tea1.jpg',
      '/tea2.jpg',
      '/tea3.jpg'
    ], 
    isNew: true 
  },
  { 
    id: '2', 
    slug: 'biluochun-suzhou-green-tea', 
    name: 'Билочуань из Сучжоу (Biluochun)', 
    category: 'Green Tea', 
    price: 29.99, 
    images: [
      '/tea2.jpg',
      '/tea3.jpg'
    ]
  },
  { 
    id: '3', 
    slug: 'west-lake-longjing-tea', 
    name: 'Лунцзин (West Lake Longjing)', 
    category: 'Green Tea', 
    price: 35.50, 
    images: [
      '/tea3.jpg',
      '/tea2.jpg'
    ], 
    isNew: true 
  }
];



