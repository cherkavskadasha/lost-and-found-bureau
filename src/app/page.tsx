"use client";

import Link from "next/link";
import { Search, PlusCircle, ShieldCheck, PawPrint, Wallet, Clock, CheckCircle2, ArrowRight, AlertCircle, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <section className="relative bg-gradient-to-br from-sky-300 via-blue-200 to-sky-100 -mt-8 pt-20 pb-36 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/60 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-sky-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight leading-tight">
            Всеукраїнська база пошуку <br className="hidden md:block" />
            речей та домашніх тварин
          </h1>
          <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto font-medium">
            Допомагаємо повертати важливе: від загублених документів і ключів до пухнастих улюбленців. 
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl -mt-24 relative z-20 mb-16">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-sky-900/5 border border-white p-6 md:p-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center md:text-left">Що у вас сталося?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/found" className="group flex flex-col items-center md:items-start bg-blue-50/70 hover:bg-blue-100 p-8 rounded-2xl border border-blue-100/50 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">Я загубив</h3>
              <p className="text-slate-600 text-center md:text-left text-sm mb-6 leading-relaxed flex-grow">
                Втратили улюбленця або важливу річ? Перевірте базу знахідок — можливо, хтось вже шукає саме вас, щоб повернути втрачене.
              </p>
              <div className="mt-auto flex items-center text-blue-600 font-bold text-sm">
                Переглянути знайдені речі <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            <Link href="/lost" className="group flex flex-col items-center md:items-start bg-emerald-50/70 hover:bg-emerald-100 p-8 rounded-2xl border border-emerald-100/50 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-emerald-50 flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">Я знайшов</h3>
              <p className="text-slate-600 text-center md:text-left text-sm mb-6 leading-relaxed flex-grow">
                Знайшли чужу річ на вулиці? Перегляньте оголошення про втрати — справжній власник, ймовірно, вже б'є на сполох.
              </p>
              <div className="mt-auto flex items-center text-emerald-600 font-bold text-sm">
                Переглянути загублені речі <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center text-center">
            <p className="text-slate-500 mb-6 max-w-lg mx-auto text-sm">
              Не знайшли те, що шукали в списках? Створіть власне оголошення, щоб інші користувачі могли побачити вашу інформацію.
            </p>
            <Link href="/create">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 hover:-translate-y-0.5 hover:scale-[1.02]">
                <PlusCircle className="w-5 h-5" /> Створити оголошення
              </button>
            </Link>
          </div>

        </div>
      </section>

      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Втратили або знайшли? Дійте зараз</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Чим швидше ви розмістите інформацію, тим вищі шанси на успішне повернення. Наш сервіс працює 24/7 для вашого міста.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-slate-200"></div>

            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto bg-slate-50 border-4 border-white text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm relative z-10">
                <PlusCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">1. Створіть оголошення</h3>
              <p className="text-slate-500 text-sm">Опишіть річ або тварину, додайте особливі прикмети та вкажіть місто.</p>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto bg-slate-50 border-4 border-white text-sky-500 rounded-full flex items-center justify-center mb-6 shadow-sm relative z-10">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">2. Перевірте списки</h3>
              <p className="text-slate-500 text-sm">Можливо, хтось вже знайшов вашу втрату і шукає саме вас.</p>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto bg-slate-50 border-4 border-white text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm relative z-10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">3. Повернення</h3>
              <p className="text-slate-500 text-sm">Зв'яжіться через безпечні контакти, дайте відповідь на контрольне запитання і заберіть своє.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Чому наш сервіс ефективний</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-orange-200 hover:bg-white transition-colors">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <PawPrint className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Універсальність</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ми об'єднали пошук всього: від загублених котиків і собачок до паспортів, телефонів та ключів від авто.
              </p>
            </div>

            <div className="bg-white/80 p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-sky-200 hover:bg-white transition-colors">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Зручна фільтрація</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Не витрачайте час на гортання тисяч записів. Шукайте по своєму місту, району та конкретній категорії речей.
              </p>
            </div>

            <div className="bg-white/80 p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-200 hover:bg-white transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Захист від шахраїв</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Унікальна система «контрольних запитань» гарантує, що річ повернеться до справжнього власника, а не до афериста.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}