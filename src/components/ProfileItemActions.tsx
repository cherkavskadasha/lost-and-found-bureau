"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit, CheckCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileItemActions({ itemId, status }: { itemId: string, status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Ви впевнені, що хочете назавжди видалити це оголошення?")) return;
    setLoading(true);
    try {
      await fetch(`/api/items/${itemId}`, { method: "DELETE" });
      router.refresh(); // Оновлюємо сторінку, щоб картка зникла
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    setLoading(true);
    const newStatus = status === "ACTIVE" ? "RESOLVED" : "ACTIVE";
    try {
      await fetch(`/api/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      <Button 
        variant={status === "ACTIVE" ? "outline" : "default"}
        size="sm" 
        onClick={handleStatusToggle} 
        disabled={loading}
        className={`flex-1 ${status === "RESOLVED" ? "bg-green-600 hover:bg-green-700 text-white" : "text-green-600 border-green-200 hover:bg-green-50"}`}
      >
        {status === "ACTIVE" ? (
          <><CheckCircle className="w-4 h-4 mr-1.5" /> Вирішено</>
        ) : (
          <><RotateCcw className="w-4 h-4 mr-1.5" /> Повернути в активні</>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => router.push(`/edit/${itemId}`)} 
        disabled={loading} 
        className="text-slate-600 hover:bg-slate-50 border-slate-200"
      >
        <Edit className="w-4 h-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleDelete} 
        disabled={loading} 
        className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}