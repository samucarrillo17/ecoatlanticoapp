import { PostType } from "@/app/_type/Post"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Camera, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updatePostInfo } from "@/server/campaign/actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {  UpdateSchemaPost, updateSchemaPostType } from "@/schema/UpdateSchema"
interface VerDetallesDialogProps {
    editar:boolean
    Seteditar:React.Dispatch<React.SetStateAction<boolean>>
    post:PostType

}

export  function EditarDialog({editar,Seteditar,post}:VerDetallesDialogProps) {
      const form = useForm<updateSchemaPostType>({
          defaultValues: {
              id:post.id,
              titulo:post.titulo,
              descripcion:post.descripcion,
              fecha:post.fecha,
              hora_inicio:post.hora_inicio,
              hora_fin:post.hora_fin,
              lugar:post.lugar,
              imagen_url:post.imagen_url,
              cupos_totales:post.cupos_totales,
              recomendaciones:post.recomendaciones,
              puntos_impacto:post.puntos_impacto,
              tipo_publicacion:post.tipo_publicacion as any,
            },
            resolver: zodResolver(UpdateSchemaPost),
      })
        const [portadaPreview, setPortadaPreview] = useState<string | null>(post.imagen_url);
        const [portadaFile, setPortadaFile] = useState<File | null>(null);
        const fileInputRef = useRef<HTMLInputElement>(null)
      const {
        handleSubmit,
        formState: { errors },
        reset,
      } = form

      useEffect(() => {
        if (editar) {
          reset({
            id: post.id,
            titulo: post.titulo,
            descripcion: post.descripcion,
            fecha: post.fecha,
            hora_inicio: post.hora_inicio,
            hora_fin: post.hora_fin,
            lugar: post.lugar,
            imagen_url: post.imagen_url,
            cupos_totales: post.cupos_totales,
            recomendaciones: post.recomendaciones,
            puntos_impacto: post.puntos_impacto,
            tipo_publicacion: post.tipo_publicacion as any,
          });
          setPortadaPreview(post.imagen_url);
          setPortadaFile(null);
        }
      }, [post, editar, reset]);
    
      const onSubmit = async (values: updateSchemaPostType) => {
        try {
          const result = await updatePostInfo(values)
    
          if (result.success) {
            setPortadaFile(null);
            setPortadaPreview(null);
    
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; 
            }
            toast.success("Post actualizado",{
            style:{
              background:"green",
              color:"white"
            }
            })
            Seteditar(false)
          } else {
            alert(result.message)
          }
    
        } catch (error) {
          console.error('Error:', error)
          alert('Error al crear el post')
        } finally {
          // setLoading(false)
        }
    
      };
   
  return (
    <Dialog open={editar} onOpenChange={Seteditar}>
        <DialogContent className="bg-white py-10 px-4 h-150 ">
            <DialogTitle className="hidden"></DialogTitle>
            <ScrollArea className="h-130  ">
                <Form {...form} >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full px-2 text-sm">
                    <FormField
                            control={form.control}
                            name="imagen_url"
                            render={({ field: { onChange, ref, ...field } }) => (
                            <FormItem>
                                <FormLabel className="text-brand-balance">Portada</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-full bg-gray-200 h-80 flex items-center justify-center cursor-pointer rounded-md"
                                        onClick={() => fileInputRef.current?.click()}
                                        >
                                            {portadaPreview ? (
                                                <Image src={portadaPreview} alt="Preview" width={300} height={300} className="w-full h-full object-cover"
                                                
                                                 />
                                            ) : (
                                                <span className="text-gray-500">
                                                    <Camera className="size-10 text-gray-400"  />
                                                </span>
                                            )}
                                        </div>

                                        {portadaPreview && (
                                            <Button
                                            type="button"
                                            onClick={() => {
                                                setPortadaPreview(null);
                                                setPortadaFile(null);
                                                onChange(null);
                                                if (fileInputRef.current) fileInputRef.current.value = ""
                                            }}
                                            className="cursor-pointer"
                                            >
                                            <Trash2 className="size-5 text-red-500" />
                                            </Button>
                                        )}
                                        <Input
                                            ref={(e) => {
                                                ref(e); 
                                                fileInputRef.current = e; 
                                            }}
                                            type="file"
                                            accept="image/*"
                                            className="cursor-pointer hidden"
                                            
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                if (file.type &&!file.type.startsWith('image/')) {
                                                    form.setError('imagen_url', { message: 'Archivo no válido' });
                                                    return;
                                                }

                                                if (file.size > 5 * 1024 * 1024) {
                                                    form.setError('imagen_url', {
                                                    message: 'La imagen no puede superar 5MB'
                                                    })
                                                    return
                                                }

                                                setPortadaFile(file);
                                                const reader = new FileReader();
                                                reader.onloadend = () => setPortadaPreview(reader.result as string);
                                                reader.readAsDataURL(file);
                                                onChange(file);
                                                
                                            }}
                                            />
                                        </div>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="titulo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Titulo</FormLabel>
                                    <FormControl>
                                        <Input className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Titulo" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-brand-balance">id</FormLabel>
                                    <FormControl className="hidden">
                                        <Input className="border-brand-green/30 h-10   focus:ring-brand-green/20 " 
                                        placeholder="Titulo" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Descripcion</FormLabel>
                                    <FormControl>
                                        <textarea  className="border-black/10 border p-2 rounded-md h-40 focus:ring-brand-green/20 resize-none " 
                                        placeholder="Descripcion" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    <div className="grid grid-cols-3 gap-3">
                        <FormField
                            control={form.control}
                            name="fecha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Fecha</FormLabel>
                                    <FormControl>
                                        <Input type="date" className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Fecha" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hora_inicio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Hora de inicio</FormLabel>
                                    <FormControl>
                                        <Input type="time" className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Hora" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hora_fin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Hora de fin</FormLabel>
                                    <FormControl>
                                        <Input type="time" className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Hora" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        <FormField
                            control={form.control}
                            name="lugar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Lugar</FormLabel>
                                    <FormControl>
                                        <Input className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Lugar" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        
                        <FormField
                            control={form.control}
                            name="cupos_totales"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Cupo</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Cupos" {...field} 
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="puntos_impacto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Puntos</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="border-brand-green/30 h-10  focus:ring-brand-green/20 " 
                                        placeholder="Puntos de impacto" {...field} 
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500"
                                     />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tipo_publicacion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl className="h-10">
                                    <SelectTrigger className="border-brand-green/30 w-full  focus:ring-brand-green/20">
                                        <SelectValue placeholder="Selecciona una universidad" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white text-brand-balance">
                                    <SelectItem value="evento" className="hover:bg-black/5">Evento</SelectItem>
                                    <SelectItem value="campaña" className="hover:bg-black/5">Campaña</SelectItem>
                                </SelectContent>
                                </Select>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                        <FormField
                            control={form.control}
                            name="recomendaciones"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">Recomendaciones</FormLabel>
                                    <FormControl>
                                        <textarea className="border-black/10 max-h-20 border p-2 rounded-md  focus:ring-brand-green/20 resize-none "
                                        
                                        placeholder="ej: LLevar protector solar, agua etc..." {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        
                    <Button type="submit" className="bg-brand-blue w-full cursor-pointer h-10 text-white">Guardar</Button>
                </form>
            </Form>
            </ScrollArea>
        </DialogContent>
    </Dialog>
  )
}
