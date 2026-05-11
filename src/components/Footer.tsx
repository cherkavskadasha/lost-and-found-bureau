import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-sky-100 to-blue-200 pt-16 pb-8 border-t border-blue-300">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-xl text-slate-800 tracking-tight">
                Бюро Знахідок
              </span>
            </Link>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              Всеукраїнська база для швидкого пошуку загублених речей та домашніх улюбленців. Повертаємо радість кожного дня.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-slate-800 font-bold mb-6 tracking-wide">Швидкі посилання</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/lost" className="text-slate-700 hover:text-blue-800 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Загублені речі
                </Link>
              </li>
              <li>
                <Link href="/found" className="text-slate-700 hover:text-blue-800 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Знайдені речі
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-slate-700 hover:text-blue-800 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Створити оголошення
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-slate-700 hover:text-blue-800 text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Особистий кабінет
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          <div className="md:col-span-1">
            <h3 className="text-slate-800 font-bold mb-6 tracking-wide">Зв'язок з нами</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm leading-relaxed">
                  Україна<br />вул. Чуднівська, 103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="mailto:support@bureau.ua" className="text-slate-700 hover:text-blue-800 text-sm transition-colors">
                  support@bureau.ua
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="tel:+380000000000" className="text-slate-700 hover:text-blue-800 text-sm transition-colors">
                  +38 (000) 000-00-00
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-blue-300/50 flex justify-center md:justify-start">
          <p className="text-slate-600 text-sm">
            &copy; {currentYear} Бюро Знахідок. Житомирська політехніка.
          </p>
        </div>
      </div>
    </footer>
  );
}