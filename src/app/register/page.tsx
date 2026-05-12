"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Помилка реєстрації");
      }

      router.push("/login?registered=true");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Сталася невідома помилка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        
        <div className="px-8 pt-8 pb-6 text-center">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-50 text-sky-600 mb-4 hover:scale-105 transition-transform">
            <Compass className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Створення акаунта</h1>
          <p className="text-sm text-slate-500">Долучіться до нашої спільноти</p>
        </div>

        <div className="px-8 pb-8 space-y-6">
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Ім'я</label>
              <input 
                type="text" 
                required
                placeholder="Як до вас звертатися?" 
                className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input 
                type="email" 
                required
                placeholder="name@example.com" 
                className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Пароль</label>
              <input 
                type="password" 
                required
                placeholder="Мінімум 6 символів" 
                minLength={6}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            
            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-md shadow-sky-200 transition-all hover:scale-[1.02]"
            >
              {loading ? "Створення..." : "Зареєструватися"}
            </Button>
          </form>

        </div>
        
        <div className="bg-slate-50 px-8 py-6 text-center border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Вже маєте акаунт?{' '}
            <Link href="/login" className="text-sky-600 hover:text-sky-700 font-semibold">
              Увійти
            </Link>
          </p>
        </div>

      </div>

      <Link href="/" className="absolute top-24 left-4 md:left-8 flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        На головну
      </Link>

    </div>
  );
}