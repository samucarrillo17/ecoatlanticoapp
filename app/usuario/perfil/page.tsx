import { CampanasInscritas } from '@/components/perfil/Campanasinscritas'
import { Headerprofile } from '@/components/perfil/Headerprofile'
import { SkeletonHeader } from '@/components/perfil/SkeletonHeader'
import { LoaderCircleIcon } from 'lucide-react'
import { Suspense } from 'react'

export default async function page() {
  
  return (
    <main className="mx-auto max-w-3xl">
       
       <Suspense fallback={<SkeletonHeader />}>
          <Headerprofile />
        </Suspense>
        <hr className='text-brand-balance/20 mb-4'/>
        
      <Suspense fallback={<LoaderCircleIcon className='animate-spin size-7 text-gray-200 mx-auto' />}>
        <div className="p-4 ">
            <CampanasInscritas/>
        </div>
      </Suspense>
      </main>
  )
}
