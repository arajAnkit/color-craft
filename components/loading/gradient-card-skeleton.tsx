import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function GradientCardSkeleton() {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-32 rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8" />
        </div>
      </CardContent>
    </Card>
  )
}

export function GradientGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <GradientCardSkeleton key={i} />
      ))}
    </div>
  )
}
