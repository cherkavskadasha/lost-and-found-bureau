import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar, Mail, AlertTriangle, ChevronLeft, ShieldCheck, Tag, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ClientMap from "@/components/ClientMap";
import ClaimForm from "@/components/ClaimForm";

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      user: true,
      category: true,
    },
  });

  if (!item) notFound();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        
        <Link href={item.type === "LOST" ? "/lost" : "/found"} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> 
          Повернутися до списку
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-8">
              
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${item.type === "LOST" ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "bg-sky-50 text-sky-700 border-sky-100"}`}>
                  {item.type === "LOST" ? "Загублено" : "Знайдено"}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full text-sm font-medium border border-slate-100">
                  <Tag className="w-4 h-4 text-indigo-500"/>
                  {item.category.name}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start pb-6 border-b border-slate-100">
                <div className="bg-slate-50 aspect-square rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center w-full md:w-2/5 flex-shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-400 text-sm">Фото відсутнє</div>
                  )}
                </div>

                <div className="flex-1 space-y-5 pt-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
                    {item.title}
                  </h1>

                  <div>
                    <h2 className="text-sm font-bold text-slate-800 mb-1.5 md:mb-2 uppercase tracking-wide">Детальний опис</h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <MapPin className="w-4.5 h-4.5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Місце</p>
                        <p className="font-semibold text-slate-800 text-sm">
                          {[item.city, item.location].filter(Boolean).join(", ") || "Не вказано"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <Calendar className="w-4.5 h-4.5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Опубліковано</p>
                        <p className="font-semibold text-slate-800 text-sm">
                          {new Date(item.createdAt).toLocaleDateString("uk-UA", { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {item.latitude && item.longitude && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" /> Місце на карті
                  </h2>
                  <ClientMap latitude={item.latitude} longitude={item.longitude} />
                </div>
              )}

              {item.controlQuestion && (
                <ClaimForm itemId={item.id} question={item.controlQuestion} />
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-sm font-bold text-slate-800 mb-6">Контактна особа</h3>
              
              <Link href={`/user/${item.userId}`}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer mb-6 group hover:border-indigo-100 hover:bg-white transition-colors">
                  <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                    <AvatarImage src={item.user?.image || undefined} className="object-cover" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-lg">
                      {item.user?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {item.user?.name || "Користувач системи"}
                    </p>
                    {item.user?.phone ? (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Верифікований
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <User className="w-3.5 h-3.5" /> Стандартний профіль
                      </p>
                    )}
                  </div>
                </div>
              </Link>

              {!item.controlQuestion && (
                <a href={`mailto:${item.user?.email}`}>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 hover:scale-[1.02]">
                    <Mail className="w-4 h-4" /> Написати автору
                  </button>
                </a>
              )}

              <div className={`pt-5 text-center ${!item.controlQuestion ? "mt-6 border-t border-slate-100" : ""}`}>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Будьте обережні при зустрічі та не переказуйте гроші заздалегідь. Перевіряйте річ на місці.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}