"use client";

export default function GlobalAdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl w-full border border-red-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro Crítico no Admin</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-4">
          <p className="text-red-700 font-mono text-sm break-all">{error.message}</p>
        </div>
        <button onClick={reset} className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold">
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
