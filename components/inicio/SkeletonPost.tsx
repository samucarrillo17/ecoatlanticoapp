import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export function SkeletonPost() {
  return (
   <Card className="max-w-3xl border-none shadow-none">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 bg-gray-200" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-200" />
      </CardContent>
    </Card>
  )
}
