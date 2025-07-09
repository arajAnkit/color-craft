import { ColorGridSkeleton } from "@/components/loading/color-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ColorsLoading() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-[600px] mx-auto mb-8" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Search and Filter Skeleton */}
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
      </div>

      {/* Color Grid Skeleton */}
      <ColorGridSkeleton />
    </div>
  )
}
