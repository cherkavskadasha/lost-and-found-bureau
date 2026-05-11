"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Send, MapPin, Loader2, Save, ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    city: "",
    image: "", 
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        phone: (session.user as any).phone || "",
        telegram: (session.user as any).telegram || "",
        city: (session.user as any).city || "",
        image: session.user.image || "", 
      });
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Не вдалося оновити профіль");

      await update({
        ...session,
        user: { 
          ...session?.user, 
          name: formData.name,
          image: formData.image 
        }
      });

      router.push("/profile");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/profile" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Назад до профілю
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-8">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Налаштування профілю</h1>
        <p className="text-slate-500 mb-8 text-sm">Ці дані допоможуть людям швидше зв'язатися з вами.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="flex flex-col items-center gap-4 mb-8 pb-8 border-b border-slate-50">
            <Avatar className="h-28 w-28 border-4 border-slate-50 shadow-md">
              <AvatarImage src={formData.image || undefined} alt="Avatar" className="object-cover" />              <AvatarFallback className="text-3xl bg-indigo-50 text-indigo-600 font-bold">
                {formData.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <CldUploadWidget 
              uploadPreset="bureau_items" 
              options={{
                maxFiles: 1,
                resourceType: "image",
                clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
              }}
              onSuccess={(result: any) => {
                const url = result?.info?.secure_url;
                if (url) {
                  setFormData({ ...formData, image: url });
                }
              }}
            >
              {({ open }) => (
                <Button 
                  type="button" 
                  onClick={() => open()} 
                  variant="outline" 
                  className="rounded-full gap-2 text-sm text-slate-600 hover:text-indigo-600 border-slate-200"
                >
                  <Camera className="w-4 h-4" /> 
                  {formData.image ? "Змінити фото" : "Завантажити фото"}
                </Button>
              )}
            </CldUploadWidget>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" /> Ваше ім'я
            </label>
            <input 
              type="text" 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" /> Місто за замовчуванням
            </label>
            <input 
              type="text" 
              placeholder="Наприклад: Житомир"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500" /> Телефон
              </label>
              <input 
                type="tel" 
                placeholder="+380..."
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-500" /> Telegram (нікнейм)
              </label>
              <input 
                type="text" 
                placeholder="@username"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.telegram}
                onChange={(e) => setFormData({...formData, telegram: e.target.value})}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>}

          <div className="pt-6 border-t border-slate-50 flex justify-end">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-10 h-12 font-bold shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
              Зберегти зміни
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}