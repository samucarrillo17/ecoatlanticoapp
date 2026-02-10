
import CampañasVoluntarios from '@/components/admin/voluntarios/CampanasVoluntarios'
import { SkeletonCampanasVoluntarios } from '@/components/admin/voluntarios/SkeletonCampanasVoluntarios'
import { Suspense } from 'react'

export default async function page() {
  
  return (
    <div className='flex flex-col gap-5'>
      <Suspense fallback={<SkeletonCampanasVoluntarios/>}>
        <CampañasVoluntarios/>
      </Suspense>
    </div>
  )
}
