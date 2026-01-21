import { getCampañasInscritas } from '@/server/user/actions'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatDate } from '@/app/_helper/dateFormatter'
import { Calendar, MapPin, Timer, TimerOff } from 'lucide-react'

export async function CampañasInscritas() {
  const campañasInscritas = await getCampañasInscritas()
  return (
    <div className='grid md:grid-cols-2 gap-3'>
      {
        campañasInscritas.map((campaña)=>{
            const fecha = formatDate(new Date(campaña.fecha))
           return( <Card key={campaña.id} className="gap-4 border-2 border-black/10">
            <CardHeader className='px-2'>
                <div className="flex justify-between">
                    <h2 className="font-semibold text-lg">
                        {campaña.titulo}
                    </h2>
                </div>
              <CardDescription>
                <p>{campaña.descripcion}</p>
              </CardDescription>

              <div className="flex gap-2 py-3 border-b border-black/5 text-xs">

              {
                campaña.tipo_publicacion === "evento" && (
                  <Badge
                  className="bg-[#fcfee8] text-[#a8b05f] border-[#f8fbd0]"
                  >
                    Evento
                  </Badge>
                )
              }
              {
                campaña.tipo_publicacion === "campaña" && (
                  <Badge
                  className="bg-[#f5f3dc] text-[#8a8c4e] border-[#ebe9c3]"
                  >
                    Campaña
                  </Badge>
                )
              }
              
              </div>
            </CardHeader>
            <CardContent className='px-2'>
                <div className="grid md:grid-cols-2 gap-3  text-xs">
                    <div className='flex gap-2 items-center'>
                        <Calendar className="size-5 text-brand-blue" />
                        <span className=''>
                            <p className='font-semibold text-gray-400'>Fecha:</p>
                            {fecha}
                        </span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <MapPin className="size-5 text-brand-blue" />
                        <span className=''>
                            <p className='font-semibold text-gray-400'>Lugar:</p>
                            {campaña.lugar}
                        </span>
                    </div>

                     <div className='flex gap-2 items-center'>
                        <Timer className="size-5 text-brand-blue" />
                        <span className=''>
                            <p className='font-semibold text-gray-400'>Hora inicio:</p>
                            {campaña.hora_inicio}
                        </span>
                    </div>

                     <div className='flex gap-2 items-center'>
                        <TimerOff className="size-5 text-brand-blue" />
                        <span className=''>
                            <p className='font-semibold text-gray-400'>Hora fin:</p>
                            {campaña.hora_fin}
                        </span>
                    </div>
                    

                    
                </div>
            </CardContent>
          </Card>
        )})
      }
    </div>
  )
}
