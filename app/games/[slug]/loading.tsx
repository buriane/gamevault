export default function GameDetailLoading() {
  return (
    <section className="min-h-screen animate-in">
      {/* Hero background skeleton */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-(--overlay-medium) animate-pulse" />

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover skeleton */}
          <div className="shrink-0 w-48 md:w-64">
            <div className="aspect-3/4 rounded-2xl bg-(--overlay-medium) border-2 border-(--border-default) shadow-2xl animate-pulse" />
          </div>

          {/* Info skeleton */}
          <div className="flex-1 pt-4 md:pt-12 space-y-4">
            <div className="h-4 w-32 bg-(--overlay-light) rounded animate-pulse" />
            <div className="h-10 w-2/3 bg-(--overlay-medium) rounded-lg animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-(--overlay-light) rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-(--overlay-light) rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 bg-(--overlay-medium) rounded animate-pulse" />
              <div className="h-6 w-24 bg-(--overlay-medium) rounded animate-pulse" />
            </div>
            <div className="h-12 w-48 bg-(--overlay-medium) rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Details grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description skeleton */}
            <div>
              <div className="h-6 w-40 bg-(--overlay-medium) rounded mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-(--overlay-light) rounded animate-pulse" />
                <div className="h-4 w-full bg-(--overlay-light) rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-(--overlay-light) rounded animate-pulse" />
                <div className="h-4 w-full bg-(--overlay-light) rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-(--overlay-light) rounded animate-pulse" />
              </div>
            </div>

            {/* Screenshots skeleton */}
            <div>
              <div className="h-6 w-32 bg-(--overlay-medium) rounded mb-4 animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl bg-(--overlay-medium) animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="bg-(--bg-card) border border-(--border-subtle) rounded-2xl p-6 space-y-5">
              <div className="h-4 w-32 bg-(--overlay-medium) rounded animate-pulse" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-(--overlay-light) rounded animate-pulse mt-0.5" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-16 bg-(--overlay-light) rounded animate-pulse" />
                    <div className="h-4 w-24 bg-(--overlay-medium) rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-(--bg-card) border border-(--border-subtle) rounded-2xl p-6">
              <div className="h-4 w-28 bg-(--overlay-medium) rounded mb-4 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-(--overlay-light) rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </section>
  );
}
