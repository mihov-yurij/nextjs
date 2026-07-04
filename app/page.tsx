"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FEATURED_TEAS } from './data';
import Header from './components/Header';
import { useCart } from './CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Green Tea', 'Oolong', 'Puerh'];

  const filteredTeas = FEATURED_TEAS.filter((tea) => {
    const matchesCategory = selectedCategory === 'All' || tea.category === selectedCategory;
    const matchesSearch = tea.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tea.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      
      <div className="bg-neutral-900 text-white text-xs py-2 text-center font-medium tracking-wide">
        Free Shipping On Orders Over $59.99 (US/DE: $100) | English ▾ | UAH ▾
      </div>

      <Header />

      {/* Главный баннер без пустых картинок */}
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
          </div>
          
          <div className="hidden md:flex justify-center space-x-4">
            <div className="w-40 h-56 bg-emerald-700/50 rounded-xl shadow-2xl flex flex-col items-center justify-center border border-emerald-500 p-4">
              <span className="text-3xl mb-2">🍃</span>
              <span className="text-xs font-bold text-center">Premium Quality</span>
            </div>
            <div className="w-40 h-56 bg-emerald-600/50 rounded-xl shadow-2xl flex flex-col items-center justify-center border border-emerald-400 p-4 mt-8">
              <span className="text-3xl mb-2">🍵</span>
              <span className="text-xs font-bold text-center">Authentic Taste</span>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                  selectedCategory === category ? 'bg-emerald-800 text-white' : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {category === 'All' ? 'Все сорта' : category}
              </button>
            ))}
          </div>

          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Поиск чая по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>

        {filteredTeas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700">Ничего не найдено</h3>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeas.map((tea) => (
              <div key={tea.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="h-48 bg-emerald-50 relative overflow-hidden">
                  {tea.isNew && (
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs uppercase px-2 py-1 rounded font-bold z-10">
                      New
                    </span>
                  )}
                  {/* ИСПОЛЬЗУЕМ СТРОГО ПЕРВЫЙ ЭЛЕМЕНТ МАССИВА С ПРОВЕРКОЙ */}
                  <Image
                    src={tea.images && tea.images.length > 0 ? tea.images[0] : 'https://unsplash.com'}
                    alt={tea.name}
                    fill
                    sizes="(max-w-7xl) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{tea.category}</span>
                    <Link href={`/tea/${tea.slug}`}>
                      <h3 className="font-serif font-bold text-lg text-gray-800 mt-1 hover:text-emerald-700 transition cursor-pointer">
                        {tea.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-emerald-800">${tea.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(tea)}
                      className="bg-emerald-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition"
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





