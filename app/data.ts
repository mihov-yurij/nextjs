import { TeaProduct } from './types';

export const FEATURED_TEAS: TeaProduct[] = [
  // Зеленый чай
  { id: '1', name: 'Маофэн из Хуаншани (Huangshan Maofeng)', category: 'Green Tea', price: 24.99, image: 'https://unsplash.com/photos/Green-Tea-in-China', isNew: true },
  { id: '2', name: 'Билочуань из Сучжоу (Biluochun)', category: 'Green Tea', price: 29.99, image: 'https://unsplash.com/photos/Green-Tea-in-China', isNew: true },
  { id: '3', name: 'Лунцзин (West Lake Longjing)', category: 'Green Tea', price: 35.50, image: 'https://unsplash.com/photos/Green-Tea-in-China', isNew: true },

  // Улуны (Oolong)
  { id: '4', name: 'Те Гуаньинь Премиум (Tieguanyin)', category: 'Oolong', price: 42.00, image: 'https://unsplash.com/photos/Oolong-Tea-in-China', isNew: true },
  { id: '5', name: 'Да Хун Пао (Big Red Robe)', category: 'Oolong', price: 55.00, image: 'https://unsplash.com/photos/Oolong-Tea-in-China', isNew: true },
  
  // Пуэры (Puerh)
  { id: '6', name: 'Мэнхай Шу Пуэр 2018 (Menghai Ripe Puerh)', category: 'Puerh', price: 38.99, image: 'https://unsplash.com/photos/Puerh-Tea-in-China' },
  { id: '7', name: 'Шэн Пуэр со старых деревьев (Raw Puerh)', category: 'Puerh', price: 64.50, image: 'https://unsplash.com/photos/Puerh-Tea-in-China' }
];

