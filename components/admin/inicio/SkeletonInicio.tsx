import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonInicio() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-80 bg-gray-200" />
        <Skeleton className="h-6 w-96 bg-gray-200" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Voluntarios activos */}
        <Card className ="border-none shadow-none">
          <CardContent className="p-6">
            <Skeleton className="size-12 rounded-lg bg-gray-200" />
            <Skeleton className="mt-4 h-4 w-32 bg-gray-200" />
            <Skeleton className="mt-2 h-5 w-40 bg-gray-200" />
          </CardContent>
        </Card>

        {/* Eventos programados */}
        <Card className ="border-none shadow-none">
          <CardContent className="p-6">
            <Skeleton className="size-12 rounded-lg bg-gray-200" />
            <Skeleton className="mt-4 h-4 w-20 bg-gray-200" />
            <Skeleton className="mt-2 h-5 w-44 bg-gray-200" />
          </CardContent>
        </Card>

        {/* Playas Limpiadas */}
        <Card className ="border-none shadow-none">
          <CardContent className="p-6">
            <Skeleton className="size-12 rounded-lg bg-gray-200" />
            <Skeleton className="mt-4 h-4 w-20 bg-gray-200" />
            <Skeleton className="mt-2 h-5 w-36 bg-gray-200" />
          </CardContent>
        </Card>

        {/* Participación */}
        <Card className ="border-none shadow-none">
          <CardContent className="p-6">
            <Skeleton className="size-12 rounded-lg bg-gray-200" />
            <Skeleton className="mt-4 h-4 w-28 bg-gray-200" />
            <Skeleton className="mt-2 h-5 w-32 bg-gray-200" />
          </CardContent>
        </Card>
      </div>

      {/* Próximos eventos */}
      <Card className ="border-none shadow-none">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Skeleton className="size-6 rounded bg-gray-200" />
            <Skeleton className="h-8 w-48 bg-gray-200" />
          </div>

          <div className="space-y-4">
            {/* Event 1 */}
            <div className="space-y-3 border-b pb-4">
              <Skeleton className="h-7 w-72 bg-gray-200" />
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded bg-gray-200" />
                  <Skeleton className="h-5 w-20 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded bg-gray-200" />
                  <Skeleton className="h-5 w-24 bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="space-y-3 border-b pb-4">
              <Skeleton className="h-7 w-80 bg-gray-200" />
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded bg-gray-200" />
                  <Skeleton className="h-5 w-20 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded bg-gray-200" />
                  <Skeleton className="h-5 w-24 bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="space-y-3">
              <Skeleton className="h-7 w-40 bg-gray-200" />
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded bg-gray-200" />
                  <Skeleton className="h-5 w-20 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-4 rounded bg-gray-200" />
                  <Skeleton className="h-5 w-24 bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}