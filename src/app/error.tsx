"use client";

import { useEffect } from "react";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#faf7f3] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-red-100 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)] mb-4">
          Ops! Algo deu errado
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          Ocorreu um erro inesperado ao carregar a página. Isso pode ser uma instabilidade temporária no servidor.
        </p>

        <div className="bg-red-50 rounded-2xl p-4 mb-8 text-left border border-red-100">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Detalhes do Erro</p>
          <p className="text-xs font-mono text-red-700 break-all">
            {error.message || "Erro desconhecido"}
          </p>
          {error.digest && (
            <p className="text-[10px] text-red-300 mt-1">ID: {error.digest}</p>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCcw className="w-5 h-5" />
            Tentar Novamente
          </button>
          
          <Link
            href="/"
            className="w-full bg-gray-50 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Se o problema persistir, por favor atualize a página manualmente.
        </p>
      </div>
    </div>
  );
}
