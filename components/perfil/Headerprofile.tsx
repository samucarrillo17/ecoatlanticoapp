import { formatDate } from '@/app/_helper/dateFormatter'
import { getAuthProfile } from '@/app/_helper/user-info'
import { UserType } from '@/app/_type/User'
import { Statsprofile } from '@/components/perfil/statsprofile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
    Calendar,  
    University,
    EllipsisVertical,
    Moon,
    LogOut
 } from 'lucide-react'
import { DrawerUpdate } from './drawerUpdate'

export async function Headerprofile() {
    const profile:UserType = await getAuthProfile()
    if (!profile) {return}
  
    const date = new Date(profile?.fecha_registro)
    const fechaRegistroFormateada = formatDate(date)
    const nombreApellido = profile?.nombre + " " + profile?.apellido

  return (

        <div className="border-b border-b-brand-balance/20 p-4">
          <div className="mb-4 flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={profile?.foto_perfil} alt={`foto de perfil de ${profile?.nombre} ${profile?.apellido}`} className='object-cover' />
              <AvatarFallback className='bg-gray-200 text-2xl font-semibold'>
                
                {
                  nombreApellido?.split(" ")
                    .map((n:string) => n[0])
                    .join("")
                }
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{nombreApellido}</h2>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
                <DrawerUpdate profile={profile} />
          </div>

          <div className="mb-4 space-y-2 text-md px-3">
            <div className="flex items-center gap-2">
              <University className="size-5 text-brand-green" />
              <span className='text-brand-balance'>{profile?.universidad}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-brand-green" />
              <span className='text-brand-balance'>Miembro desde el  {fechaRegistroFormateada} </span>
            </div>
          </div>

          
          <Statsprofile />

          
        </div>
  )
}
