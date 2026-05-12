"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClaimForm({ itemId, question }: { itemId: string; question: string }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, answer }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Помилка при відправці заявки");
      }

      setStatus("success");
      setMessage("Вашу відповідь успішно надіслано! Автор зв'яжеться з вами.");
      setAnswer("");
    } catch (err) {
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Сталася невідома помилка");
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-6 md:mt-8 flex items-start gap-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-emerald-900 mb-1">Заявку прийнято</h3>
          <p className="text-emerald-700 text-sm">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mt-6 md:mt-8">
      <div className="flex items-center gap-3 mb-3">
        <AlertCircle className="w-5 h-5 text-amber-600" />
        <h2 className="text-md font-bold text-amber-900">Це ваша річ?</h2>
      </div>
      <p className="text-amber-800 text-sm mb-4">
        Автор вказав контрольне запитання. Дайте правильну відповідь, щоб довести, що ви справжній власник.
      </p>
      
      <div className="bg-white rounded-xl p-4 border border-amber-100 mb-4">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">Запитання:</span>
        <span className="text-slate-800 font-medium">{question}</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Введіть вашу відповідь..."
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-amber-200 text-sm focus:ring-2 focus:ring-amber-400 outline-none transition-all"
        />
        {status === "error" && (
          <p className="text-red-500 text-xs font-medium">{message}</p>
        )}
        <Button 
          type="submit" 
          disabled={loading || !answer.trim()}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-11 rounded-xl w-full sm:w-auto self-end transition-all shadow-md shadow-amber-200"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          Надіслати відповідь
        </Button>
      </form>
    </div>
  );
}