import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Settings, Mail, Shield, FileText, Search, MapPin, Phone, Send, User as UserIcon } from "lucide-react";
import ItemCard from "@/components/ItemCard";
import ProfileItemActions from "@/components/ProfileItemActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  const items = await prisma.item.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  const lostCount = items.filter(i => i.type === "LOST").length;
  const foundCount = items.filter(i => i.type === "FOUND").length;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="h-32 bg-gradient-to-r from-sky-400 to-indigo-500"></div>

      <div className="container mx-auto px-4 max-w-7xl -mt-16 animate-in fade-in duration-500">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
            <div className="flex items-end gap-6">
              
              <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 flex-shrink-0">
                <Avatar className="w-full h-full">
                  <AvatarImage src={user.image?.startsWith("http") ? user.image : undefined} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-indigo-50 text-indigo-600 font-bold">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="pb-2">
                <h1 className="text-3xl font-extrabold text-slate-800">{user.name}</h1>
                <p className="text-slate-500 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Link href="/create" className="flex-1 md:flex-none">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Plus className="w-4 h-4" /> Створити оголошення
                </button>
              </Link>
              <Link href="/profile/edit" className="flex-1 md:flex-none">
                <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" /> Редагувати профіль
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-100 transition-colors">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-500" /> Статус акаунта
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Роль:</span>
                  <span className="text-xs font-bold px-2 py-1 bg-white border border-slate-200 rounded-md text-indigo-600 uppercase">
                    {user.role === "ADMIN" ? "Адміністратор" : "Користувач"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Загалом оголошень:</span>
                  <span className="text-sm font-bold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                    {items.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-sky-100 transition-colors">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-500" /> Ваша активність
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Оголошень (загублено):</span>
                  <span className="text-sm font-bold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                    {lostCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Оголошень (знайдено):</span>
                  <span className="text-sm font-bold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                    {foundCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-emerald-100 transition-colors">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-emerald-500" /> Ваші контакти
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Місто:
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {user.city || <span className="text-slate-400 italic">Не вказано</span>}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Телефон:
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {user.phone || <span className="text-slate-400 italic">Не вказано</span>}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Telegram:
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {user.telegram || <span className="text-slate-400 italic">Не вказано</span>}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400" />
          <h2 className="text-xl font-bold text-slate-800">Ваші публікації</h2>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="flex flex-col">
                <div className={`flex-grow transition-all duration-500 ${item.status === 'RESOLVED' ? 'opacity-60 grayscale-[30%]' : ''}`}>
                  <ItemCard item={item} />
                </div>
                <ProfileItemActions itemId={item.id} status={item.status} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">У вас ще немає оголошень</h3>
            <p className="text-slate-500 mb-6">Створіть своє перше оголошення, якщо ви щось загубили або знайшли.</p>
            <Link href="/create">
              <button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-6 py-2.5 rounded-full font-semibold transition-colors">
                Створити оголошення
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}