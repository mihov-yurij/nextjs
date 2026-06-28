import React from 'react';
import Link from 'next/link';
import { FEATURED_TEAS } from '../../data'; // Теперь этот путь будет работать правильно
import Header from '../../components/Header';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeaPage({ params }: PageProps) {
  const resolvedParams = await params;
  const teaSlug = resolvedParams.slug;

  // Ищем чай в базе данных по его слагу
  const tea = FEATURED_TEAS.find((t) => 'slug' in t && t.slug === teaSlug);

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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-800 hover:text-emerald-600 mb-8 transition">
            ← Назад к каталогу
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid md:grid-cols-2 gap-12">
            <div className="h-80 bg-emerald-50 rounded-xl relative overflow-hidden">
  <Image 
    src={tea.image} 
    alt={tea.name} 
    fill
    sizes="(max-w-4xl) 50vw, 100vw"
    className="object-cover"
    priority // Этот флаг ускорит загрузку главного изображения на странице
  />
</div>


            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-emerald-700 uppercase tracking-wider font-bold bg-emerald-50 px-2.5 py-1 rounded">
                  {tea.category}
                </span>
                <h1 className="text-3xl font-serif font-bold text-gray-900 pt-2">{tea.name}</h1>
                <p className="text-2xl font-bold text-emerald-800 pt-2">${tea.price.toFixed(2)}</p>
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Этот изысканный сорт чая собран вручную на экологически чистых плантациях. Обладает глубоким ароматом и мягким вкусом.
                </p>
              </div>

              <Link href="/" className="w-full">
                <button className="w-full bg-emerald-800 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition mt-6 cursor-pointer">
                  Вернуться на главную для покупки
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



