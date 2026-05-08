import { MapPin, Calendar, Tag } from "lucide-react";
import Link from "next/link";

export default function ItemCard({ item }: { item: any }) {
  const date = new Date(item.createdAt).toLocaleDateString('uk-UA', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  
  const fullLocation = [item.city, item.location].filter(Boolean).join(', ');

  return (
    <Link href={`/item/${item.id}`} className="block h-full group">
      <div className="h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              item.type === 'LOST' 
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                : 'bg-sky-50 text-sky-700 border border-sky-100'
            }`}>
              {item.type === 'LOST' ? 'Загублено' : 'Знайдено'}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" /> {date}
            </span>
          </div>
          
          <h3 className="font-extrabold text-lg text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
            {item.description}
          </p>
          
          <div className="space-y-2.5 mt-auto pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Tag className="w-4 h-4 text-slate-400" /> {item.category?.name || 'Інше'}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 line-clamp-1">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" /> 
              <span className="truncate">{fullLocation}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}