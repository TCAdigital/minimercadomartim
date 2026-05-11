"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida.");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 2MB.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("market")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("market")
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError("Falha ao enviar a imagem. Verifique se o bucket 'market' é público.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>}
      
      <div className="relative">
        {value ? (
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video md:aspect-auto md:h-40">
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <label className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Upload className="w-5 h-5" />
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
              </label>
              <button 
                type="button" 
                onClick={() => onChange("")}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <label className={`
            flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-200
            ${isUploading ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-300 hover:border-[var(--color-brand-orange)] hover:bg-orange-50/30'}
          `}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-[var(--color-brand-orange)] animate-spin mb-3" />
                  <p className="text-sm text-gray-500 font-medium">Enviando imagem...</p>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-orange-100 text-[var(--color-brand-orange)] mb-3">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-gray-600 font-bold mb-1">Clique para enviar</p>
                  <p className="text-xs text-gray-400">PNG, JPG ou WEBP (Max. 2MB)</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
          </label>
        )}
      </div>

      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
    </div>
  );
}
