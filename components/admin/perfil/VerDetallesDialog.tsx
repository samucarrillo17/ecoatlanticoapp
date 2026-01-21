"use client"
import { PostType } from "@/app/_type/Post"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Progress } from "@/components/ui/progress"

import { Calendar, MapPin, Scroll, Timer } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { publicarPost } from "@/server/campaign/actions"
import { toast } from "sonner"


interface VerDetallesDialogProps {
    verDetalles:boolean
    SetVerDetalles:React.Dispatch<React.SetStateAction<boolean>>
    post:PostType

}

export  function VerDetallesDialog({verDetalles,SetVerDetalles,post}:VerDetallesDialogProps) {
   const [publicar, setPublicar] = useState(false)

   const handlePublicar = async () => {
    try {
        const nuevoEstado = !publicar
        const result = await publicarPost(post.id, nuevoEstado)
        if (result.success) {
            setPublicar(false)
            SetVerDetalles(false)
            toast.success("Pos publicado",{
            style:{
            background:"green",
            color:"white"
            }
            })
        } else {
            alert(result.message)
        }
        
    } catch (error) {
        alert('Error al publicar la campaña')
    }
    
  }
  return (
    <Dialog open={verDetalles} onOpenChange={SetVerDetalles}>
        <DialogContent className="bg-white py-10 px-4 h-150 ">
            <ScrollArea className="h-130  ">
                <Image src={post.imagen_url} alt={post.titulo} width={300} height={300} className="w-full h-70 object-cover mb-4 rounded-lg" />

                <DialogHeader className="space-y-2">

                <DialogTitle className="text-lg font-semibold">{post.titulo}</DialogTitle>

                <DialogDescription className="mb-4">
                    {post.descripcion}
                </DialogDescription>

                </DialogHeader>

                    <div className="flex flex-col gap-3 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-3 bg-gray-300/20 p-2 rounded-lg  border-l-4 border-brand-blue">
                                <Calendar className="size-7 text-brand-blue" />
                                <div className="flex-col gap-2 items-center ">
                                    <span className="font-bold  text-md ">Fecha</span>
                                    <p className="leading-relaxed text-sm">{post.fecha}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 bg-gray-300/10 p-2 rounded-lg  border-l-4 border-brand-blue">
                                <Timer className="size-7 text-brand-blue" />
                                <div className="flex-col gap-2 items-center ">
                                    <span className="font-bold  text-md ">Hora</span>
                                    <p className="leading-relaxed text-sm">{post.hora_inicio} - {post.hora_fin}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 bg-gray-300/10 p-2 rounded-lg  border-l-4 border-brand-blue">
                            <MapPin className="size-7 text-brand-blue" />
                            <div className="flex-col gap-2 items-center ">
                                <span className="font-bold  text-md ">Lugar</span>
                                <p className="leading-relaxed text-sm">{post.lugar}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 bg-gray-300/10 p-2 px-4 rounded-lg py-6  ">
                        
                                <span className="font-bold  text-md ">CUPOS DISPONIBLES</span>
                                <p className="leading-relaxed text-lg font-bold text-brand-green">{post.inscritos}/{post.cupos_totales}</p>
                                <Progress 
                                    value={(post.inscritos / post.cupos_totales) * 100 } 
                                    className="h-3 "
                                />
                                
                            
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {!post.is_public &&(
                            <Button className="bg-brand-green text-white cursor-pointer" onClick={handlePublicar}>
                                Publicar
                            </Button>)}
                    </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}
