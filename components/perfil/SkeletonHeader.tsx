import React from 'react'
import { Skeleton } from '../ui/skeleton'

export  function SkeletonHeader() {
  return (
    <div className="flex items-center gap-2 p-4 ">
      <Skeleton className="size-20 shrink-0 rounded-full bg-gray-200" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-100 bg-gray-200" />
        <Skeleton className="h-4 w-100 bg-gray-200" />
      </div>
    </div>
  )
}
