import { CampanasInscritas } from '@/components/perfil/Campanasinscritas'
import { Headerprofile } from '@/components/perfil/Headerprofile'
import MenuTabs from '@/components/perfil/MenuTabs'
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
        <MenuTabs />
      </main>
  )
}
