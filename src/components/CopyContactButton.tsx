"use client";

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

export default function CopyContactButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <a href={`mailto:${email}`} className="w-full">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 hover:scale-[1.02]">
          <Mail className="w-4 h-4" /> Написати на пошту
        </button>
      </a>
      
      <button 
        onClick={handleCopy} 
        className={`w-full h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border ${
          copied 
            ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
        }`}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
        {copied ? "Пошту скопійовано!" : "Скопіювати email"}
      </button>
    </div>
  );
}