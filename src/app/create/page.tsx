"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, FileText, HelpCircle, AlertCircle, Loader2, Building2, ArrowLeft } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Завантаження карти...</div>
});

export default function CreateItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    type: "LOST",
    categorySlug: "other",
    title: "",
    description: "",
    city: "", 
    location: "",
    controlQuestion: "",
    imageUrl: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Помилка при створенні оголошення");
      }

      router.push("/profile");
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> На головну
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Створити оголошення</h1>
        <p className="text-slate-500 mt-2">Заповніть деталі про річ, щоб ми допомогли її знайти або повернути.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden shadow-indigo-100/20">
        
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <label className="block text-sm font-bold text-slate-700 mb-4">Що сталося?</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "LOST" })}
              className={`py-4 rounded-xl border-2 font-semibold transition-all ${
                formData.type === "LOST" 
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              Я загубив річ
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "FOUND" })}
              className={`py-4 rounded-xl border-2 font-semibold transition-all ${
                formData.type === "FOUND" 
                  ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm" 
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              Я знайшов річ
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Фотографія</label>
              <ImageUpload 
                value={formData.imageUrl} 
                onChange={(url: string) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Категорія</label>
              <select 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white transition-all"
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
              >
                <option value="documents">Документи</option>
                <option value="electronics">Техніка</option>
                <option value="pets">Тварини</option>
                <option value="clothing">Одяг та аксесуари</option>
                <option value="other">Інше</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-500" /> Місто
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Наприклад: Житомир" 
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-500" /> Де це було?
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Вулиця, район або заклад" 
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" /> Поставте мітку на карті
              </label>
              <MapPicker 
                position={formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : null}
                onChange={(pos) => setFormData({ ...formData, latitude: pos[0], longitude: pos[1] })}
              />
              <p className="text-xs text-slate-400">Клацніть на карту, щоб вказати точне місце події.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Заголовок оголошення</label>
              <input 
                type="text" 
                required
                placeholder="Наприклад: Чорний гаманець зі шкіри" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium text-slate-800"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" /> Детальний опис
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Опишіть річ детальніше: колір, розмір, особливі прикмети..." 
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {formData.type === "FOUND" && (
            <div className="mt-8 p-6 rounded-2xl bg-orange-50 border border-orange-100 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-orange-800">Захист від шахраїв</h3>
                  <p className="text-xs text-orange-600 mt-1">
                    Оскільки ви знайшли річ, придумайте запитання, відповідь на яке знає лише справжній власник.
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-orange-800">Контрольне запитання</label>
                  <input 
                    type="text" 
                    placeholder="Що лежить у таємній кишені?" 
                    className="w-full h-11 px-3 rounded-lg border border-orange-200 text-sm focus:ring-2 focus:ring-orange-400 outline-none bg-white/80"
                    value={formData.controlQuestion}
                    onChange={(e) => setFormData({ ...formData, controlQuestion: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100 mt-8">
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              Скасувати
            </Link>
            <Button 
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 font-semibold shadow-md shadow-indigo-200 transition-all hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Публікація..." : "Опублікувати оголошення"}
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}