"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MapPin, FileText, Loader2, Building2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams(); 
  const itemId = params.id as string;

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
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${itemId}`);
        if (!res.ok) throw new Error("Оголошення не знайдено");
        const data = await res.json();
        
        setFormData({
          categorySlug: data.category?.slug || "other", 
          title: data.title,
          description: data.description,
          city: data.city || "",
          location: data.location || "",
          imageUrl: data.imageUrl || "",
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
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Редагування оголошення</h1>
        <p className="text-slate-500 mt-2">Внесіть необхідні зміни та збережіть їх.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-8 space-y-6 shadow-indigo-100/20">
        <div className="space-y-6">
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
              className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
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
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" /> Місто
              </label>
              <input type="text" required className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Локація
              </label>
              <input type="text" required className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Заголовок</label>
            <input type="text" required className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" /> Детальний опис
            </label>
            <textarea required rows={4} className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} />
          </div>
        </div>

        {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">{error}</div>}

        <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
          <Link href="/profile" className="text-sm font-medium text-slate-500 hover:text-slate-800">Скасувати</Link>
          <Button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 font-semibold shadow-md transition-all hover:scale-[1.02]">
            {saving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Зберегти зміни
          </Button>
        </div>
      </form>
    </div>
  );
}