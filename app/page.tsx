"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FEATURED_TEAS } from './data';
import Header from './components/Header';
import { useCart } from './CartContext';
import Image from 'next/image';


export default function Home() {
  const { addToCart } = useCart();

  // 1. Состояния для фильтрации и поиска
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Список всех уникальных категорий для кнопок-табов
  const categories = ['All', 'Green Tea', 'Oolong', 'Puerh'];

  // 2. Логика фильтрации товаров «на лету»
  const filteredTeas = FEATURED_TEAS.filter((tea) => {
    const matchesCategory = selectedCategory === 'All' || tea.category === selectedCategory;
    const matchesSearch = tea.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tea.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* Топ-бар */}
      <div className="bg-neutral-900 text-white text-xs py-2 text-center font-medium tracking-wide">
        Free Shipping On Orders Over $59.99 (US/DE: $100) | English ▾ | UAH ▾
      </div>

      <Header />

      {/* Главный баннер */}
      <section className="relative bg-gradient-to-r from-emerald-900 to-green-800 text-white overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-emerald-300 font-semibold tracking-widest text-sm uppercase">Since 1993</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              China&apos;s Finest Famous <br />
              <span className="text-emerald-400">PREMIUM TEAS</span> <br />
              ARE HERE
            </h1>
            <p className="text-gray-200 text-lg max-w-md">
              Свежий весенний сбор премиального китайского чая. Прямые поставки с плантаций.
            </p>
            <button className="bg-white text-emerald-950 px-8 py-3 rounded-md font-semibold shadow-lg hover:bg-emerald-50 transition">
              Смотреть коллекцию
            </button>
          </div>
          <div className="flex justify-center space-x-4">
            <div className="w-40 h-56 bg-emerald-700 rounded-xl shadow-2xl flex flex-col items-center justify-center border border-emerald-500 p-4">
              <span className="text-5xl mb-4">🍵</span>
              <span className="text-xs font-bold text-center">Хуаншань Маофэн</span>
            </div>
            <div className="w-40 h-56 bg-emerald-600 rounded-xl shadow-2xl flex flex-col items-center justify-center border border-emerald-400 p-4 mt-8">
              <span className="text-5xl mb-4">🍂</span>
              <span className="text-xs font-bold text-center">Те Гуаньинь</span>
            </div>
          </div>
        </div>
      </section>

      {/* Основной контент каталога */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Панель инструментов: Поиск и Фильтры */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-6 border-b border-gray-200">
          
          {/* Интерактивные Кнопки-Категории */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'All' ? 'Все сорта' : category}
              </button>
            ))}
          </div>

          {/* Поле живого поиска */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Поиск чая по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Сетка отфильтрованных товаров */}
        {filteredTeas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-5xl block mb-4">🍃</span>
            <h3 className="text-lg font-bold text-gray-700">Ничего не найдено</h3>
            <p className="text-gray-400 text-sm mt-1">Попробуйте изменить поисковый запрос или выбрать другую категорию.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeas.map((tea) => (
              <div key={tea.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
                <div className="h-48 bg-emerald-50 relative overflow-hidden group">
                  {tea.isNew && (<span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs uppercase px-2 py-1 rounded font-bold z-10">
                   New</span>)}
                  {/* Умный компонент оптимизации изображений */}
                  <Image
                  src={tea.image}
                  alt={tea.name}
                  fill
                  sizes="(max-w-7xl) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{tea.category}</span>
                    <Link href={`/tea/${tea.id}`}>
                      <h3 className="font-serif font-bold text-lg text-gray-800 mt-1 hover:text-emerald-700 transition cursor-pointer">
                        {tea.name}
                      </h3>
                    </Link>

                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-emerald-800">${tea.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(tea)}
                      className="bg-emerald-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 active:scale-95 transition"
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}




