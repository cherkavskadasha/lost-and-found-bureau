import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Mail, Shield, Calendar, MapPin, Sparkles, Plus } from "lucide-react"; // Додали Plus
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import Link from "next/link"; 
import ProfileItemActions from "@/components/ProfileItemActions";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const lostCount = await prisma.item.count({
    where: { userId: session.user.id, type: "LOST" }
  });

  const foundCount = await prisma.item.count({
    where: { userId: session.user.id, type: "FOUND" }
  });

  const totalItems = lostCount + foundCount;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden shadow-indigo-100/40">
        <div className="h-32 bg-gradient-to-r from-sky-300 to-indigo-400 opacity-80" />
        
        <div className="px-8 pb-10 relative">
          <Sparkles className="absolute right-10 top-10 w-24 h-24 text-indigo-100/60 -z-10" />

          <div className="relative flex justify-between items-end -mt-12 mb-8 z-10">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md bg-white">
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback className="bg-indigo-50 text-indigo-700 text-2xl font-bold">
                {session.user?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-3">
              <Link href="/create">
                <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:scale-105 hidden sm:flex">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Створити оголошення
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50">
                Редагувати профіль
              </Button>
            </div>
          </div>

          <div className="space-y-1 mb-10 text-center md:text-left z-10">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{session.user?.name}</h1>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> {session.user?.email}
            </p>
            <Link href="/create" className="sm:hidden inline-block mt-4">
              <Button className="rounded-full w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Створити оголошення
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 space-y-4">
              <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" /> Статус акаунта
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Роль:</span>
                  <span className="font-semibold text-indigo-600 bg-white px-3 py-1 rounded-full uppercase text-[10px] tracking-wider border border-indigo-100">
                    Користувач
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Загалом оголошень:</span>
                  <span className="font-bold text-indigo-700 bg-indigo-100/50 px-2.5 py-0.5 rounded-full text-xs">
                    {totalItems}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100/80 space-y-4">
              <h3 className="font-bold text-sky-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-500" /> Ваша активність
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Оголошень (загублено):</span>
                  <span className="font-bold text-slate-700 bg-slate-200/60 px-2.5 py-0.5 rounded-full text-xs">
                    {lostCount}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Оголошень (знайдено):</span>
                  <span className="font-bold text-green-700 bg-green-100/60 px-2.5 py-0.5 rounded-full text-xs">
                    {foundCount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {totalItems === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/20">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100">
                <MapPin className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">У вас ще немає оголошень</h3>
              <p className="text-slate-500 text-base max-w-sm mx-auto mt-2.5 leading-relaxed">
                Якщо ви щось знайшли або загубили, створіть своє перше оголошення.
              </p>
            </div>
          ) : (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Ваші публікації
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(await prisma.item.findMany({
                  where: { userId: session.user.id },
                  include: { category: true },
                  orderBy: { createdAt: "desc" }
                })).map(item => (
                  <div key={item.id} className="flex flex-col">
                    <div className={`flex-grow transition-all duration-500 ${item.status === 'RESOLVED' ? 'opacity-60 grayscale-[30%]' : ''}`}>
                      <ItemCard item={item} />
                    </div>
                    <ProfileItemActions itemId={item.id} status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}