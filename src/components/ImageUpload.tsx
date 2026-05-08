"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      {/* Показуємо завантажене фото, якщо воно є */}
      {value && (
        <div className="mb-4 flex items-center gap-4">
          <div className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <Image 
              fill 
              style={{ objectFit: "cover" }} 
              src={value} 
              alt="Uploaded Image" 
              sizes="(max-width: 768px) 100vw, 200px" // Виправили попередження в консолі
            />
            <div className="absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onChange("")}
                className="bg-red-500 p-2 rounded-full text-white shadow-sm hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Віджет Cloudinary тепер залишається змонтованим завжди, щоб коректно розблокувати скрол */}
      <CldUploadWidget 
        onSuccess={onUpload} 
        uploadPreset="bureau_items"
        options={{
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        }}
      >
        {({ open }) => {
          // Якщо фото вже є - просто не малюємо кнопку (ховаємо її)
          if (value) return null;

          return (
            <button
              type="button"
              onClick={() => open()}
              className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-500 transition-colors"
            >
              <ImagePlus className="w-10 h-10 mb-2 text-indigo-400" />
              <span className="font-semibold text-indigo-600">Натисніть, щоб додати фотографію</span>
              <span className="text-xs text-indigo-400 mt-1">JPG, PNG або WEBP</span>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}