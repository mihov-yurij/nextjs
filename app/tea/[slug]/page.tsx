"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // <-- Импортируем официальный хук для слага
import { FEATURED_TEAS } from '../../data';
import Header from '../../components/Header';
import { useCart } from '../../CartContext';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export default function TeaPage() {
  const { addToCart } = useCart();
  
  // Извлекаем slug напрямую через хук useParams без всяких асинхронных Promise
  const params = useParams();
  const teaSlug = params?.slug as string;

  // Ищем чай в нашей базе данных
  const tea = FEATURED_TEAS.find(t => t.slug === teaSlug);

  // Состояния для интерактивной галереи картинок
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Состояние для отзывов
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, author: "Александр", rating: 5, date: "20.05.2026", text: "Потрясающий глубокий аромат! Листья раскрываются идеально. Тот самый вкус, что я пробовал в Китае." }
  ]);

  // Состояния для формы нового отзыва
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');

  if (!tea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Товар не найден</h1>
        <Link href="/" className="text-emerald-700 underline hover:text-emerald-600 transition">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      author: formName,
      rating: formRating,
      date: new Date().toLocaleDateString('ru-RU'),
      text: formText
    };

    setReviews([newReview, ...reviews]);
    setFormName('');
    setFormText('');
    setFormRating(5);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-800 hover:text-emerald-600 mb-8 transition">
            ← Назад к каталогу
          </Link>

          {/* Карточка товара */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid md:grid-cols-2 gap-12">
            
            {/* Галерея */}
            <div className="space-y-4">
              <div className="h-80 bg-emerald-50 rounded-xl relative overflow-hidden shadow-inner border border-gray-100">
                <Image 
                  src={tea.images[activeImageIndex] || tea.images[0]} 
                  alt={tea.name} 
                  fill
                  className="object-cover transition-all duration-300"
                  priority
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto py-1">
                {tea.images.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden bg-emerald-50 border-2 transition shrink-0 cursor-pointer ${
                      activeImageIndex === index ? 'border-emerald-700 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={imgUrl} alt={`${tea.name} превью ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Описание */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-emerald-700 uppercase tracking-wider font-bold bg-emerald-50 px-2.5 py-1 rounded">
                  {tea.category}
                </span>
                <h1 className="text-3xl font-serif font-bold text-gray-900 pt-2 leading-tight">{tea.name}</h1>
                <p className="text-2xl font-bold text-emerald-800 pt-2">${tea.price.toFixed(2)}</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Этот изысканный сорт чая собран вручную на экологически чистых плантациях. Обладает глубоким ароматом, мягким вкусом и оставляет долгое сладковатое послевкусие.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Вес упаковки: 100г</p>
                  <p>• Страна производства: Китай</p>
                  <p>• Срок годности: 24 месяца</p>
                </div>
              </div>

              <button 
                onClick={() => addToCart(tea)}
                className="w-full bg-emerald-800 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.99] transition mt-6 cursor-pointer shadow-sm"
              >
                Добавить в корзину
              </button>
            </div>
          </div>

          {/* Отзывы */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
            <h2 className="text-2xl font-serif font-bold text-emerald-900 border-b border-gray-100 pb-4">
              Отзывы покупателей ({reviews.length})
            </h2>

            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3 space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-800">{review.author}</span>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <div className="text-amber-500 text-xs">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pt-1">{review.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleReviewSubmit} className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4">
                <h3 className="font-bold text-sm text-gray-800">Оставить отзыв</h3>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 block font-medium">Ваше имя</label>
                  <input 
                    type="text" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Иван И."
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 block font-medium">Оценка</label>
                  <select 
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="5">5 звезд (Отлично)</option>
                    <option value="4">4 звезды (Хорошо)</option>
                    <option value="3">3 звезды (Нормально)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 block font-medium">Комментарий</label>
                  <textarea 
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Поделитесь впечатлениями..."
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-800 text-white py-2 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer">
                  Отправить отзыв
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}





