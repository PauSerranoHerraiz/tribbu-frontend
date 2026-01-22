export default function LoadingOverlay({ isLoading, message = "Cargando..." }) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-700 font-medium">{message}</p>
      </div>
    </div>
  );
}