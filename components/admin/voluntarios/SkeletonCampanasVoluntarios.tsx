
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export  function SkeletonCampañasVoluntarios() {
  return (
    <div className="space-y-4">
      {/* Event Card 1 */}
      <Card className = "border-none shadow-none">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-72 bg-gray-200" />
                <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-28 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-40 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32 bg-gray-200" />
                </div>
              </div>
            </div>
            <Skeleton className="size-6 bg-gray-200" />
          </div>
        </CardContent>
      </Card>

      {/* Event Card 2 */}
      <Card className = "border-none shadow-none">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-80 bg-gray-200" />
                <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-gray-200" />
                  <Skeleton className="h-5 w-28 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-gray-200" />
                  <Skeleton className="h-5 w-64 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-gray-200" />
                  <Skeleton className="h-5 w-32 bg-gray-200" />
                </div>
              </div>
            </div>
            <Skeleton className="size-6 bg-gray-200" />
          </div>
        </CardContent>
      </Card>

      {/* Event Card 3 */}
      <Card className = "border-none shadow-none">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-64 bg-gray-200" />
                <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-gray-200" />
                  <Skeleton className="h-5 w-28 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-gray-200" />
                  <Skeleton className="h-5 w-56 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-5 bg-gray-200" />
                  <Skeleton className="h-5 w-32 bg-gray-200" />
                </div>
              </div>
            </div>
            <Skeleton className="size-6 bg-gray-200" />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
  
