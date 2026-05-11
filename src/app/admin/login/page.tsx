"use client";

import { useState } from "react";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("Senha incorreta. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f3] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/mini-mercado-martin.png" alt="Logo" className="h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-[var(--color-brand-dark)]">Acesso Restrito</h1>
          <p className="text-gray-500 mt-2">Área administrativa do Mini Mercado Martin</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Senha de Acesso</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[var(--color-brand-orange)] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in zoom-in-95 duration-300">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-brand-dark)] hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Verificando..." : (
                <>
                  Entrar no Painel
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          Esqueceu a senha? Entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
}
