import prisma from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import { SearchX } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function LostPage() {
  const lostItems = await prisma.item.findMany({
    where: { type: "LOST" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Загублені речі</h1>
        <p className="text-slate-500 mt-2">Допоможіть цим речам повернутися до своїх власників.</p>
      </div>

      {lostItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lostItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">Поки що тут порожньо</h3>
          <p className="text-slate-500">Ніхто ще не публікував оголошення про загублені речі.</p>
        </div>
      )}
    </div>
  );
}