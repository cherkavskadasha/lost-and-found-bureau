import prisma from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import FilterPanel from "@/components/FilterPanel";
import { SearchX } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function LostPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
  const params = await searchParams;
  const categories = await prisma.category.findMany();

  let dateFilter = {};
  const now = new Date();
  if (params.date === "today") {
    dateFilter = { gte: new Date(now.setHours(0,0,0,0)) };
  } else if (params.date === "week") {
    dateFilter = { gte: new Date(now.setDate(now.getDate() - 7)) };
  } else if (params.date === "month") {
    dateFilter = { gte: new Date(now.setMonth(now.getMonth() - 1)) };
  }

  const lostItems = await prisma.item.findMany({
    where: {
      type: "LOST",
      title: params.query ? { contains: params.query, mode: 'insensitive' } : undefined,
      city: params.city ? { contains: params.city, mode: 'insensitive' } : undefined,
      category: params.category ? { slug: params.category } : undefined,
      createdAt: params.date ? dateFilter : undefined,
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Загублені речі</h1>
        <p className="text-slate-500 mt-2">Використовуйте фільтри, щоб швидше знайти потрібне.</p>
      </div>

      <FilterPanel categories={categories} />

      {lostItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lostItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">Нічого не знайдено</h3>
          <p className="text-slate-500">Спробуйте змінити параметри фільтрації.</p>
        </div>
      )}
    </div>
  );
}