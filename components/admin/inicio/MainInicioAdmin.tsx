import { UserType } from "@/app/_type/User"
import { getProfileInfo } from "@/server/user/actions"
import StatsGrid from "./statsGrid"
import Upcomingevents from "./upcomingevents"
import ActionsGrid from "./actionsGrid"


export async function MainInicioAdmin() {
     const profile:UserType = await getProfileInfo()
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
