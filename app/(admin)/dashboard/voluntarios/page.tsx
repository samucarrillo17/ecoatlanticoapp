
import CampañasVoluntarios from '@/components/admin/voluntarios/CampañasVoluntarios'
import { SkeletonCampañasVoluntarios } from '@/components/admin/voluntarios/SkeletonCampañasVoluntarios'
import { Suspense } from 'react'

export default async function page() {
  
  return (
    <div className='flex flex-col gap-5'>
      <Suspense fallback={<SkeletonCampañasVoluntarios/>}>
        <CampañasVoluntarios/>
      </Suspense>
    </div>
  )
}
