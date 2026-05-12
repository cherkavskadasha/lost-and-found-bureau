"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Calendar, Tag, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function FilterPanel({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(window.location.pathname);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Пошук за назвою..."
            className="w-full pl-10 pr-4 h-11 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => updateFilter("query", e.target.value)}
            defaultValue={searchParams.get("query") || ""}
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Місто..."
            className="w-full pl-10 pr-4 h-11 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => updateFilter("city", e.target.value)}
            defaultValue={searchParams.get("city") || ""}
          />
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select 
            className="w-full pl-10 pr-4 h-11 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
            onChange={(e) => updateFilter("category", e.target.value)}
            value={searchParams.get("category") || ""}
          >
            <option value="">Всі категорії</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select 
            className="w-full pl-10 pr-4 h-11 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
            onChange={(e) => updateFilter("date", e.target.value)}
            value={searchParams.get("date") || ""}
          >
            <option value="">За весь час</option>
            <option value="today">За сьогодні</option>
            <option value="week">За тиждень</option>
            <option value="month">За місяць</option>
          </select>
        </div>

      </div>

      {searchParams.toString() && (
        <button 
          onClick={clearFilters}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          <X className="w-3 h-3" /> Скинути всі фільтри
        </button>
      )}
    </div>
  );
}