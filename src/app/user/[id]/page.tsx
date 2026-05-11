import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, ShieldCheck, User } from "lucide-react";

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: { category: true }
      }
    }
  });

  if (!user) notFound();

  const activeItems = user.items.filter(item => item.status === "ACTIVE");

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="h-32 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
      
      <div className="container mx-auto px-4 max-w-6xl -mt-16">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={user.image || undefined} className="object-cover" />
            <AvatarFallback className="text-4xl bg-indigo-50 text-indigo-600 font-bold">
              {user.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left pb-2">
            <h1 className="text-3xl font-extrabold text-slate-800">{user.name || "Користувач"}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-slate-500 text-sm font-medium">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <Package className="w-4 h-4 text-indigo-500" /> {activeItems.length} оголошень
              </span>

              {/* Динамічна верифікація: показуємо тільки за наявності телефону */}
              {user.phone ? (
                <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                  <ShieldCheck className="w-4 h-4" /> Верифікований учасник
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-400 px-3 py-1 rounded-full border border-slate-200">
                  <User className="w-4 h-4" /> Стандартний профіль
                </span>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-6">Оголошення користувача</h2>

        {activeItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeItems.map((item) => (
              <div key={item.id} className="animate-in fade-in zoom-in duration-300">
                <ItemCard item={item as any} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-medium">У цього користувача зараз немає активних оголошень.</p>
          </div>
        )}
      </div>
    </div>
  );
}