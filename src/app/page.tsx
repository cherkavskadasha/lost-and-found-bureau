import Link from "next/link";
import { Search, PlusCircle, FileText, Handshake, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* 1. ВЕРХНІЙ КОЛЬОРОВИЙ БЛОК */}
      <section className="w-full bg-gradient-to-r from-sky-400 to-indigo-400 pt-20 pb-40 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-md">
            Всеукраїнська система пошуку <br className="hidden sm:block" /> загублених речей
          </h1>
          <p className="text-lg md:text-xl opacity-95 font-medium drop-shadow-sm max-w-2xl mx-auto">
            Ми допомагаємо людям знаходити втрачене та повертати знайдене додому. Швидко, безпечно та зручно.
          </p>
        </div>
      </section>

      {/* 2. ПЛАВАЮЧА КАРТКА */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-28 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-700 delay-200">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-800 text-center">
            Що ви шукаєте або знайшли?
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            
            {/* Кнопки Дії */}
            <div className="flex w-full lg:w-auto gap-2">
              <Button variant="outline" className="flex-1 lg:w-32 bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 hover:text-sky-800 h-14 text-md">
                <Search className="w-5 h-5 mr-2 shrink-0" />
                Шукаю
              </Button>
              <Button variant="outline" className="flex-1 lg:w-32 text-slate-600 h-14 text-md hover:bg-slate-100">
                <PlusCircle className="w-5 h-5 mr-2 shrink-0" />
                Знайшов
              </Button>
            </div>

            {/* Кнопки Категорій */}
            <div className="flex w-full lg:w-auto gap-2 flex-wrap sm:flex-nowrap">
              <Button variant="outline" className="flex-1 lg:w-32 h-14 text-slate-600 hover:bg-slate-100">Документи</Button>
              <Button variant="outline" className="flex-1 lg:w-32 h-14 text-slate-600 hover:bg-slate-100">Техніка</Button>
              <Button variant="outline" className="flex-1 lg:w-32 h-14 text-slate-600 hover:bg-slate-100">Інше</Button>
            </div>

            {/* Кнопка Продовжити */}
            <div className="w-full lg:w-auto lg:ml-2 mt-2 lg:mt-0">
              <Button className="w-full lg:w-40 bg-indigo-500 hover:bg-indigo-600 text-white h-14 text-lg font-semibold shadow-md shadow-indigo-200 transition-all hover:scale-[1.02]">
                Продовжити
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. БЛОК "ЯК ЦЕ ПРАЦЮЄ" */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Втратили або знайшли річ? Дійте зараз</h2>
            <p className="text-lg text-slate-500">Чим швидше ви розмістите інформацію, тим вищі шанси на успіх.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10"></div>

            <div className="text-center space-y-5 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <FileText className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">1. Розмістіть оголошення</h3>
              <p className="text-slate-600 leading-relaxed">
                Опишіть річ, додайте фотографії та вкажіть місце на карті. Це займе менше двох хвилин.
              </p>
            </div>

            <div className="text-center space-y-5 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <BellRing className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">2. Розумне сповіщення</h3>
              <p className="text-slate-600 leading-relaxed">
                Система автоматично аналізує збіги та надсилає сповіщення тим, хто міг бачити вашу річ.
              </p>
            </div>

            <div className="text-center space-y-5 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Handshake className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">3. Повернення</h3>
              <p className="text-slate-600 leading-relaxed">
                Безпечно зв'яжіться через платформу, задайте контрольне питання та поверніть втрачене.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}