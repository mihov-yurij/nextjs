"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../CartContext';

export default function Header() {
  const { cartCount } = useCart(); // Извлекаем количество товаров напрямую из глобального контекста

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/">
          <div className="text-2xl font-serif font-bold tracking-wider text-emerald-800 shrink-0 cursor-pointer">
            TenFu&apos;s TEA
          </div>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex space-x-8 font-medium text-sm text-gray-600">
          <Link href="#" className="text-emerald-700 border-b-2 border-emerald-700 pb-1">Green Tea</Link>
          <Link href="#" className="hover:text-emerald-700 transition">Oolong</Link>
          <Link href="#" className="hover:text-emerald-700 transition">Puerh</Link>
          <Link href="#" className="hover:text-emerald-700 transition">About Us</Link>
        </nav>

        {/* Иконки справа */}
        <div className="flex items-center space-x-4 text-xl shrink-0">
          <button className="p-2 hover:text-emerald-700">🔍</button>
          <button className="p-2 hover:text-emerald-700">👤</button>
          
          {/* Иконка-ссылка на страницу корзины */}
          <Link href="/cart">
            <button className="p-2 hover:text-emerald-700 relative cursor-pointer">
              🛒 
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}


