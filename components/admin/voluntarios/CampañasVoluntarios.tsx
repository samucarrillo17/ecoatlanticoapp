import { getAllPost } from '@/app/_helper/campaign-info'
import { formatDate } from '@/app/_helper/dateFormatter'
import { PostType } from '@/app/_type/Post'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card} from '@/components/ui/card'
import { getVolutariosPorCamapaña } from '@/server/campaign/actions'
import { Calendar, MapPin, Users } from 'lucide-react'
import { DataTable } from "@/components/admin/voluntarios/datatable"
import {Columns} from "@/components/admin/voluntarios/columns"
import { CampañaConVoluntarios } from '@/app/_type/CampañasPorVoluntario'



export default async function StatsVolunteer() {
    const post:CampañaConVoluntarios[] = await getVolutariosPorCamapaña()
    
  return (
    <div className='grid gap-4 '>
        {post.map((post) => {
        const fecha = formatDate(new Date(post.fecha))
          return (
          <Accordion
            type="single"
            collapsible
            className="w-full text-brand-balance"
            key={post.id}
            >
            <AccordionItem value="item-1">
            <Card className='w-full px-4 py-0 border-none  '>
                <AccordionTrigger className=' cursor-pointer items-center'>
                    <div className='space-y-3'>
                        <div className='flex gap-4'>
                            <h2>{post.titulo}</h2>
                            {
                                post.tipo_publicacion === "evento" && (
                                <Badge
                                className="bg-[#fcfee8] text-[#a8b05f] border-[#f8fbd0]"
                                >
                                    Evento
                                </Badge>
                                )
                            }
                            {
                                post.tipo_publicacion === "campaña" && (
                                <Badge
                                className="bg-[#f5f3dc] text-[#8a8c4e] border-[#ebe9c3]"
                                >
                                    Campaña
                                </Badge>
                                )
                            }
                        </div>
                        <div className='flex gap-3 text-xs md:text-sm'>
                            <span className='flex gap-1 items-center'>
                                <Calendar className="size-4 text-brand-blue "/>
                                {fecha}
                            </span>
                            <span className='flex gap-1 items-center'>
                                <MapPin className="size-4 text-brand-blue "/>
                                {post.lugar}
                            </span>
                            <span className='flex gap-1 items-center'>
                                <Users className="size-4 text-brand-blue "/>
                                {post.inscritos} voluntarios
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>
                    </Card>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                <div>
                     <DataTable columns={Columns} data={post.inscripciones} /> 
                </div>
                
                </AccordionContent>
            </AccordionItem>
            
            </Accordion>
        )})}
        
    </div>
  )
}
