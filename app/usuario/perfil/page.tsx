import { CampañasInscritas } from '@/components/perfil/CampañasInscritas'
import { Headerprofile } from '@/components/perfil/Headerprofile'

export default async function page() {
  
  return (
    <main className="mx-auto max-w-3xl">
       
        <Headerprofile />
        {/* Tabs would go here */}
        <div className="p-4 ">
          <CampañasInscritas/>
        </div>
      </main>
  )
}
