"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, MapPin, Calendar, Users, Check, BadgeCheck, Timer, ShieldCheck, User, Loader } from "lucide-react"
import Image from "next/image"
import { Progress } from "../ui/progress"
import { PostType } from "@/app/_type/Post"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { formatDate } from "@/app/_helper/dateFormatter"
import { toast } from "sonner"
import { inscribirCampana } from "@/server/user/actions"
import { is } from "zod/v4/locales"
import { useRouter } from "next/navigation"


interface FeedPostProps {
  post: PostType
}

export function FeedPost({ post }: FeedPostProps) {
  const router = useRouter()
  const [isInscrito, setIsInscrito] = useState(post.esta_inscrito)
  const [loading, setLoading] = useState(false)
  const fechaFormateada = formatDate(new Date(post.admin.created_at))

  const inscribirse = async (idPost:string) => {
    if (isInscrito) return
    setLoading(true)
    const result = await inscribirCampana(idPost)
    if (result.success) {
      toast.success(result.message,{
        style: {
          backgroundColor: "green",
          color: "white",
        },
      })
      router.refresh()
    } else {
      toast.error(result.message)
    }
    setLoading(false)
  }
  
  return (
    <Card className="overflow-hidden border-0 py-4 gap-2 shadow-none">
      <CardHeader className="p-0">
        
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={post.admin.foto_perfil} alt={`foto de perfil de ${post.admin.nombre}`} className="object-cover" />
              <AvatarFallback>EA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <HoverCard >
                  <HoverCardTrigger asChild className="px-0">
                    <Button variant="link" className="cursor-pointer">{post.admin.nombre}</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="md:w-100 w-80 bg-white">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={post.admin.foto_perfil} alt={`foto de perfil de ${post.admin.nombre}`} className="object-cover" />
                        <AvatarFallback>EA</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="text-sm  flex gap-2 items-center">
                          <h4 className="font-semibold"> 
                            {post.admin.nombre}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {post.admin.email}
                          </span>
                        </div>
                        <p className="text-sm leading-tight">
                          {post.admin.biografia}
                        </p>
                        <div className="text-brand-green font-medium text-xs italic">
                          {`Se unió el ${fechaFormateada}`}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <BadgeCheck className="size-4 fill-brand-green text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-4/3 w-full">
          <Image
            src={post.imagen_url}
            alt={post.titulo}
            fill
            className="object-cover"
          />
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-brand-green/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {post.tipo_publicacion}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-3">
          {/* Actions */}
          <div className="mb-3  ">
            <div className="flex items-center gap-6 px-2">
              <Button variant="ghost" size="icon-sm"  className="p-0 flex items-center gap-1">
                <Heart className={`size-5 fill-brand-green text-brand-green}`} />
                <span className="text-sm font-semibold">{10}</span>
              </Button>
              <Button variant="ghost" size="icon-sm" className="p-0 flex items-center gap-1">
                <MessageCircle className="size-5" />
                <span className="text-sm text-muted-foreground">{6}</span>
              </Button>
              <Button variant="ghost" size="icon-sm" className="p-0">
                <Share2 className="size-5" />
              </Button>
            </div>
          </div>

          {/* Title and description */}
          <div className="mb-3 text-brand-balance">
            <h3 className="text-base font-semibold">{post.titulo}</h3>
            <p className="text-sm ">{post.descripcion}</p>
          </div>

          {/* Event details */}
          <div className="mb-3 rounded-lg  bg-brand-beige/10 p-3 gap-3 border-2 border-brand-beige/30 text-sm  text-brand-balance">
          {/* Horario, lugar y disponibilidad */}
            <div className="flex justify-between text-xs mb-4">
      
              <div className="flex items-center gap-1 ">
                <Calendar className="size-9 text-brand-blue bg-white rounded-lg border border-black/10 p-1"/>
                <div className="flex flex-col">
                  <p>Fecha</p>
                  <span className="font-semibold">{post.fecha}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 ">
                <MapPin className="size-9 text-brand-blue bg-white rounded-lg border border-black/10 p-1"/>
                <div className="flex flex-col">
                  <p>Lugar</p>
                  <span className="font-semibold">{post.lugar}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 ">
                <Timer className="size-9 text-brand-blue bg-white rounded-lg border border-black/10 p-1"/>
                <div className="flex flex-col">
                  <p>Hora</p>
                  <span className="font-semibold">{post.hora_inicio} - {post.hora_fin}</span>
                </div>
              </div>

            </div>
            <div className="bg-brand-card p-4 rounded-lg border-black/10 border-2">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-1">
                  <Users className="size-4 text-brand-green" />
                  <span className="font-semibold">Cupos disponibles</span>
                </div>
                <span className="font-semibold text-brand-green">
                  {post.cupos_disponibles} disponibles
                  </span>
                
              </div>
              <Progress 
                value={(post.inscritos / post.cupos_disponibles) * 100} 
                className="h-3 "
              />
              <div className="text-gray-400 font-medium text-xs text-right">{post.inscritos} de {post.cupos_totales}</div>
            </div>

          </div>
             
            
            <div className="flex gap-3 bg-brand-green/10 p-2 rounded-lg mb-3 border-l-4 border-brand-green">
              <ShieldCheck className="size-7 text-brand-green" />
                <div className="flex-col gap-2 items-center text-brand-green">
                  <span className="font-bold  text-md ">¿Que necesitas llevar?</span>
                  <p className="leading-relaxed text-sm">{post.recomendaciones}</p>
                </div>
            </div>

          <Button  className={`w-full  
            ${isInscrito ? 'bg-brand-beige/80 ' : 'cursor-pointer bg-brand-blue text-white'}`}
             onClick={()=>inscribirse(post.id)}>
              {isInscrito ? (
                <span className="flex items-center gap-2">
                  <Check className="size-4" /> Ya inscrito
                </span>
              ) : loading ? (
                <Loader className="size-4 animate:spin" />
              ) : (
                "Inscribirme"
              )}
            
          </Button>

          
        </div>
      </CardContent>
    </Card>
  )
}
