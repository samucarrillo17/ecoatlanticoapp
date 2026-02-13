import { formatDate } from '@/app/_helper/dateFormatter'
import { getAuthProfile } from '@/app/_helper/user-info'
import { UserType } from '@/app/_type/User'
import { DrawerUpdate } from '@/components/perfil/drawerUpdate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, University } from 'lucide-react'



export async  function PerfilHeaderAdmin() {
    const profile:UserType = await getAuthProfile()
    if (!profile) {return}
    
    const date = new Date(profile?.fecha_registro)
    const fechaRegistroFormateada = formatDate(date)
    const nombreApellido = profile?.nombre + " " + profile?.apellido
  return (
        <div className="p-4">
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
          <section className='px-3 space-y-5'>
              {
                profile.biografia && (
                  <div>
                    <span className='text-xs text-gray-300 font-medium'>Biografia</span>
                    <p className='text-sm'>{profile?.biografia}</p>
                  </div>
                )
              }

              <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <University className="size-5 text-brand-green" />
                    <span className='text-brand-balance'>{profile?.universidad}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-brand-green" />
                    <span className='text-brand-balance'>Miembro desde el  {fechaRegistroFormateada} </span>
                  </div>
              </div>
          </section>
          
          </div>


         
        
  )
}
