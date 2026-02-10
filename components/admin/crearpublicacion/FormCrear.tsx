"use client"    
import { postSchema, PostSchemaType } from "@/schema/postSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRef, useState } from "react"
import { Camera, LoaderCircleIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CrearPost } from "@/server/campaign/actions"
import { toast } from "sonner"
import { FormController } from "@/components/FormController"
import { Textarea } from "@/components/ui/textarea"
import { SelectWrapper } from "@/components/SelectWrapper"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"


export  function FormCrear() {
    const [portadaPreview, setPortadaPreview] = useState<string | null>(null);
    const [portadaFile, setPortadaFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<PostSchemaType>({
    defaultValues: {
        titulo:"",
        descripcion:"",
        fecha:"",
        hora_inicio:"",
        hora_fin:"",
        lugar:"",
        imagen_url:null,
        cupos_totales:0,
        recomendaciones:"",
        puntos_impacto:0,
        tipo_publicacion:"evento",
    },
    resolver: zodResolver(postSchema),
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form

  const onSubmit = async (values: PostSchemaType) => {

     
    try {
        const result = await CrearPost(values)

        if (result.success) {
            setPortadaFile(null);
            setPortadaPreview(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = ""; 
            }

            toast.success("Post creado",{
            style:{
            background:"green",
            color:"white"
            }
        })
        reset()
      } else {
        alert(result.message)
      }

    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear el post')
    }

  };
  
  return (
    <Card className="border-none" >
        <CardContent className="px-3">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <Controller
                            control={form.control}
                            name="imagen_url"
                            render={({ field: { onChange, value,ref, ...field },fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel className="text-brand-balance">Portada</FieldLabel>
                                
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-full md:w-150 bg-gray-200 h-80 flex items-center justify-center cursor-pointer rounded-md"
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
                                            {...field}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {

                                                if (!file.type.startsWith('image/')) {
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
                                                }
                                            }}
                                            />
                                        </div>
                                
                                {fieldState.invalid && <FieldError className="text-red-500 text-sm" errors={[fieldState.error]} />}
                            </Field>
                            )}
                        />
                        <FormController
                            name="titulo"
                            control={form.control}
                            as={Input}
                            label="Titulo"
                            placeholder="Titulo"
                            inputProps={{
                                className: "border-brand-green/30  focus:ring-brand-green/20 "
                            }}
                        />

                        <FormController
                            name="descripcion"
                            control={form.control}
                            as={Textarea}
                            label="Descripcion"
                            placeholder="Descripcion"
                            inputProps={{
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-40 resize-none "
                            }}
                        />
                    <div className="grid grid-cols-3 gap-3">
                        <FormController
                            name="fecha"
                            control={form.control}
                            as={Input}
                            label="Fecha"
                            inputProps={{
                                type:"date",
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />
                        <FormController
                            name="hora_inicio"
                            control={form.control}
                            as={Input}
                            label="Hora inicio"
                            inputProps={{
                                type:"time",
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />
                        <FormController
                            name="hora_fin"
                            control={form.control}
                            as={Input}
                            label="Hora fin"
                            inputProps={{
                                type:"time",
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />
                    </div>

                    <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                        <FormController
                            name="lugar"
                            control={form.control}
                            as={Input}
                            label="Lugar"
                            inputProps={{
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />

                        
                        <FormController
                            name="cupos_totales"
                            control={form.control}
                            as={Input}
                            label="Cupos totales"
                            inputProps={{
                                type:"number",
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />

                        <FormController
                            name="puntos_impacto"
                            control={form.control}
                            as={Input}
                            label="Puntos"
                            inputProps={{
                                type:"number",
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />

                        <FormController
                            name="tipo_publicacion"
                            control={form.control}
                            as={SelectWrapper}
                            label="Tipo"
                            inputProps={{
                               options:[
                                {label:"Evento", value:"Evento"},
                                {label:"Campaña", value:"Campaña"}
                               ],
                             
                            }}
                        />
                    </div>

                       <FormController
                            name="recomendaciones"
                            control={form.control}
                            as={Textarea}
                            label="Recomendaciones"
                            placeholder="ej: LLevar protector solar, agua etc..."
                            inputProps={{
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-20 resize-none "
                            }}
                        />

                        
                    <Button type="submit" className="bg-brand-blue w-full cursor-pointer h-10 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                        {isSubmitting ? <LoaderCircleIcon className="animate-spin size-5" /> : "Crear"}
                    </Button>
                </form>
            
        </CardContent>
      
    </Card>
  )}
