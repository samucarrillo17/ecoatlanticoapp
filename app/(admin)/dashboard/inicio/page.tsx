import { UserType } from '@/app/_type/User'
import ActionsGrid from '@/components/admin/inicio/actionsGrid'
import StatsGrid from '@/components/admin/inicio/statsGrid'
import Upcomingevents from '@/components/admin/inicio/upcomingevents'
import { createClient } from '@/lib/supabase/server'
import { getProfileInfo } from '@/server/user/actions'


export default async function page() {
  const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.log('No hay usuario logueado')
      return
    }
    const profile:UserType = await getProfileInfo(user.id)

  return (
    <div className="flex flex-col gap-5">

      <div>

        <h1 className='text-2xl font-semibold'>¡Bievenido de vuelta, {profile?.nombre}!👍</h1>
        <p>Aqui esta el resumen de actividades de EcoAtltántico</p>

      </div>
      
      <StatsGrid/>
      <Upcomingevents/>
      <ActionsGrid/>
    </div>
  )
}
