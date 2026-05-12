"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MapPin, FileText, Loader2, Building2, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker"), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Завантаження карти...</div>
});

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams(); 
  const [itemId, setItemId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    categorySlug: "other",
    title: "",
    description: "",
    city: "",
    location: "",
    imageUrl: "",
    controlQuestion: "",
    // Додаємо координати сюди
    latitude: null as number | null,
    longitude: null as number | null,
  });

  useEffect(() => {
    if (params?.id) {
        setItemId(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${itemId}`);
        if (!res.ok) throw new Error("Оголошення не знайдено");
        const data = await res.json();
        
        setFormData({
          categorySlug: data.category?.slug || "other", 
          title: data.title || "",
          description: data.description || "",
          city: data.city || "",
          location: data.location || "",
          imageUrl: data.imageUrl || "",
          controlQuestion: data.controlQuestion || "",
          latitude: data.latitude || null,
          longitude: data.longitude || null,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) fetchItem();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) return;
    
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Помилка збереження");

      router.push("/profile");
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-indigo-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/profile" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Назад до профілю
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-8">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Редагування оголошення</h1>
        <p className="text-slate-500 mb-8 text-sm">Внесіть необхідні зміни та збережіть їх.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5 pb-6 border-b border-slate-50">
            <label className="text-sm font-bold text-slate-700">Фотографія</label>
            <ImageUpload 
              value={formData.imageUrl} 
              onChange={(url: string) => setFormData(prev => ({ ...prev, imageUrl: url }))} 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Категорія</label>
            <select 
              className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
              value={formData.categorySlug}
              onChange={(e) => setFormData(prev => ({ ...prev, categorySlug: e.target.value }))}
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
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-500" /> Місто
              </label>
              <input type="text" required className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" /> Локація
              </label>
              <input type="text" required className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" /> Місце на карті
            </label>
            <MapPicker 
              position={formData.latitude && formData.longitude ? [formData.latitude, formData.longitude] : null}
              onChange={(pos) => setFormData({ ...formData, latitude: pos[0], longitude: pos[1] })}
            />
            <p className="text-xs text-slate-400">Можете оновити мітку, якщо потрібно вказати точніше місце.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Заголовок</label>
            <input type="text" required className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" /> Детальний опис
            </label>
            <textarea required rows={4} className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} />
          </div>
          
          <div className="space-y-1.5">
             <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
               Контрольне запитання
            </label>
            <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all" value={formData.controlQuestion} onChange={(e) => setFormData(prev => ({ ...prev, controlQuestion: e.target.value }))} placeholder="Наприклад: Яка подряпина на екрані?"/>
             <p className="text-xs text-slate-500 mt-1">Допоможе переконатися, що річ належить саме власнику.</p>
          </div>

          {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">{error}</div>}

          <div className="pt-6 border-t border-slate-50 flex items-center justify-end gap-4">
            <Link href="/profile" className="text-sm font-medium text-slate-500 hover:text-slate-800">Скасувати</Link>
            <Button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02]">
              {saving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
              Зберегти зміни
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}