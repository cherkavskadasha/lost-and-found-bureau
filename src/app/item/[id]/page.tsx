import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Tag, User, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id: id },
    include: {
      category: true,
      user: {
        select: { name: true, email: true, image: true }
      }
    }
  });

  if (!item) {
    notFound();
  }

  const date = new Date(item.createdAt).toLocaleDateString('uk-UA', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const isLost = item.type === "LOST";
  
  const fullLocation = [item.city, item.location].filter(Boolean).join(', ');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
      
      <Link href={isLost ? "/lost" : "/found"} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Повернутися до списку
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        <div className={`p-8 border-b border-slate-100 ${isLost ? 'bg-indigo-50/30' : 'bg-sky-50/30'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${
              isLost 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-sky-100 text-sky-700'
            }`}>
              {isLost ? 'Загублено' : 'Знайдено'}
            </span>
            <span className="text-sm font-medium text-slate-500 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" /> {item.category?.name || 'Інше'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {item.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-600 text-sm">
            <span className="flex items-center gap-2 font-medium">
              <MapPin className="w-5 h-5 text-slate-400" /> {fullLocation}
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="w-5 h-5 text-slate-400" /> Опубліковано: {date}
            </span>
          </div>
        </div>

        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10">
          
          <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Детальний опис</h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {item.description}
              </div>
            </div>

            {!isLost && item.controlQuestion && (
              <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-6 h-6 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-orange-900 text-lg">Увага, перевірка власника!</h3>
                    <p className="text-sm text-orange-700 mt-1 mb-3">Автор вказав контрольне запитання, щоб переконатися, що річ належить саме вам.</p>
                    <div className="bg-white p-4 rounded-xl border border-orange-200">
                      <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Запитання:</p>
                      <p className="font-medium text-slate-800">{item.controlQuestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 sticky top-24">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Контактна особа</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                  <AvatarImage src={item.user?.image || ""} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-lg">
                    {item.user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{item.user?.name || "Анонім"}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <User className="w-4 h-4" /> Користувач системи
                  </p>
                </div>
              </div>

              <a href={`mailto:${item.user?.email}`}>
                <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 font-semibold text-base transition-all hover:scale-[1.02]">
                  <Mail className="w-5 h-5 mr-2" />
                  Написати на пошту
                </Button>
              </a>
              
              {!isLost && (
                 <p className="text-xs text-center text-slate-400 mt-4 px-2">
                   Якщо це ваша річ, будьте готові дати відповідь на контрольне запитання при зверненні.
                 </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}