"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, Trash2, Package, Users, PieChart, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || (session?.user as any)?.role !== "ADMIN") {
      router.push("/");
      return;
    }

    const loadAllData = async () => {
      const [resItems, resUsers, resStats] = await Promise.all([
        fetch("/api/admin/items"),
        fetch("/api/admin/users"),
        fetch("/api/admin/stats")
      ]);
      
      if (resItems.ok) setItems(await resItems.json());
      if (resUsers.ok) setUsers(await resUsers.json());
      if (resStats.ok) setStats(await resStats.json());
      setLoading(false);
    };

    loadAllData();
  }, [status, session, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити це оголошення назавжди?")) return;
    
    const res = await fetch("/api/admin/items", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setItems(items.filter((item) => item.id !== id));
      setStats((prev: any) => ({ ...prev, totalItems: prev.totalItems - 1 }));
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl animate-in fade-in duration-500">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Система керування платформою</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatCard icon={<Package/>} label="Оголошень" value={stats?.totalItems} color="bg-blue-50 text-blue-600" />
        <StatCard icon={<Users/>} label="Користувачів" value={stats?.totalUsers} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={<PieChart/>} label="Загублено" value={stats?.lostCount} color="bg-rose-50 text-rose-600" />
        <StatCard icon={<ShieldCheck/>} label="Знайдено" value={stats?.foundCount} color="bg-indigo-50 text-indigo-600" />
      </div>

      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab("items")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "items" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
        >
          Оголошення
        </button>
        <button 
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "users" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
        >
          Користувачі
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {activeTab === "items" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr><th className="px-6 py-4 text-sm font-bold text-slate-500">Назва</th><th className="px-6 py-4 text-sm font-bold text-slate-500">Автор</th><th className="px-6 py-4 text-sm font-bold text-slate-500 text-right">Дії</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{item.title}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{item.user?.email}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(item.id)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors">
                        <Trash2 className="w-5 h-5"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr><th className="px-6 py-4 text-sm font-bold text-slate-500">Ім'я</th><th className="px-6 py-4 text-sm font-bold text-slate-500">Email</th><th className="px-6 py-4 text-sm font-bold text-slate-500">Постів</th><th className="px-6 py-4 text-sm font-bold text-slate-500">Роль</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{user.name || "Гість"}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{user.email}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{user._count?.items || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold tracking-wide uppercase ${user.role === 'ADMIN' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>{icon}</div>
      <div><p className="text-slate-500 text-sm font-medium">{label}</p><p className="text-2xl font-bold text-slate-800">{value !== undefined ? value : "-"}</p></div>
    </div>
  );
}