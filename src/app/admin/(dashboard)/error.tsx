"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl w-full border border-red-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl font-bold">!</div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">Erro no Admin</h1>
            <p className="text-gray-500 text-sm">Ocorreu um problema ao carregar o painel.</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Mensagem de Erro</p>
          <p className="text-red-700 font-mono text-sm break-all">{error.message}</p>
          {error.digest && (
            <p className="text-red-400 text-xs mt-2">Digest: {error.digest}</p>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Possíveis Causas</p>
          <ul className="text-amber-700 text-sm space-y-1">
            <li>• A variável DATABASE_URL no Vercel está incorreta ou ausente</li>
            <li>• A senha contém caracteres especiais que precisam ser codificados (ex: @ = %40, # = %23)</li>
            <li>• O banco de dados Supabase está pausado ou inacessível</li>
          </ul>
        </div>

        <button
          onClick={reset}
          className="w-full bg-gray-800 hover:bg-black text-white py-4 rounded-2xl font-bold transition-all"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
