export default function GameCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-(--bg-card) border border-(--border-subtle) animate-pulse">
      {/* Cover skeleton */}
      <div className="relative aspect-3/4 bg-(--overlay-medium)" />

      {/* Info skeleton */}
      <div className="flex flex-col gap-2.5 p-4">
        <div className="h-4 w-3/4 bg-(--overlay-medium) rounded" />
        <div className="h-3.5 w-1/2 bg-(--overlay-light) rounded" />
        <div className="flex gap-1.5 mt-auto pt-1">
          <div className="h-5 w-12 bg-(--overlay-light) rounded" />
          <div className="h-5 w-14 bg-(--overlay-light) rounded" />
        </div>
      </div>
    </div>
  );
}
