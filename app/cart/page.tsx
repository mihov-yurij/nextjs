"use client";

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { useCart } from '../CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
        <h1 className="text-3xl font-serif font-bold text-emerald-900 mb-8">Ваша корзина</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4 shadow-sm">
            <span className="text-6xl block">🛒</span>
            <h2 className="text-xl font-bold text-gray-700">В корзине пока ничего нет</h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Самое время заглянуть в каталог и выбрать изысканный свежий чай!
            </p>
            <Link href="/" className="inline-block bg-emerald-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
              Вернуться в магазин
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            
            {/* Список товаров */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-lg flex items-center justify-center text-3xl shrink-0">
                      {item.product.image}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-gray-800 text-sm md:text-base leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase mt-0.5">{item.product.category}</p>
                      <p className="text-emerald-800 font-bold text-sm mt-1">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 ml-4">
                    {/* Кнопки изменения количества */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 transition font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-700 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 transition font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Кнопка удаления */}
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition text-lg p-1"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-500 transition font-medium pl-1"
              >
                Очистить всю корзину
              </button>
            </div>

            {/* Итоговая панель чека */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-serif font-bold text-gray-800 border-b border-gray-50 pb-3">
                Детали заказа
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Товары ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-emerald-600 font-medium">Бесплатно</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="font-bold text-gray-800">Итого к оплате</span>
                <span className="text-2xl font-bold text-emerald-800">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => alert('Заказ успешно оформлен! Спасибо за покупку.')}
                className="w-full bg-emerald-800 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 active:scale-[0.99] transition text-sm shadow-sm"
              >
                Перейти к оформлению
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
