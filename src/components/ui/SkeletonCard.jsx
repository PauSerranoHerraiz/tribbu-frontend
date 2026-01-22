export default function SkeletonCard() {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="card-body space-y-4">
        
        {/* Título */}
        <div className="h-6 bg-base-300 rounded w-2/3"></div>

        {/* Texto */}
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-5/6"></div>
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <div className="h-9 bg-base-300 rounded-lg w-24"></div>
          <div className="h-9 bg-base-300 rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  );
}
