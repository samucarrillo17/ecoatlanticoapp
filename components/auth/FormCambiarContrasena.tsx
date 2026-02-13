"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { CambiarContrasenaType,cambiarContrasenaSchema } from "@/schema/cambiarContrasenaSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { ButtonGroup } from "../ui/button-group"
import { ArrowLeft, EyeClosedIcon, EyeIcon, LoaderCircleIcon } from "lucide-react"
import { useState } from "react"
import { Field, FieldError, FieldLabel } from "../ui/field"

export function FormCambiarContrasena() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const form = useForm<CambiarContrasenaType>({
        resolver: zodResolver(cambiarContrasenaSchema),
        defaultValues: {
            contraseña: "",
            confirmarContraseña: "",
        },
        mode: "onChange",
    })

    const {handleSubmit, formState: { isSubmitting }} = form

    const onSubmit = async(values: CambiarContrasenaType) => {
        const { contraseña } = values
        
        const supabase = createClient() //*nos conectamos al cliente del browser de supabase
        const {error} = await supabase.auth.updateUser({
            password: contraseña, 
        })

        if(error){
            toast.error("No se ha podido actualizar la contraseña",{
                description: error.message,
                style:{
                    background: "red",
                    color: "white",
                }
            })
            return
        }
        toast.success("Se ha actualizado la contraseña",{
            style:{
                background: "green",
                color: "white",
            }
        })
        supabase.auth.signOut()
        redirect("/login")
    }

    const viewPassword = () =>{
        setShowPassword(!showPassword)
    }
    const viewConfirmPassword = () =>{
        setShowConfirmPassword(!showConfirmPassword)
    }
  return (
   <Card className="border-2 border-brand-green/20 w-100">
        <CardHeader>
            <h1 className="text-brand-balance text-2xl font-bold text-center">Nueva Contraseña</h1>
            <p className="text-sm text-brand-balance text-center">Recuerda que la contraseña debe tener al menos 8 caracteres</p>
        </CardHeader>
        <CardContent>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                    control={form.control}
                    name="contraseña"
                    render={({ field,fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-brand-balance">Nueva contraseña</FieldLabel>
                            
                                <ButtonGroup className="items-center gap-2">
                                    <Input className="border-brand-green/30 md:w-80 focus:ring-brand-green/20 " placeholder="Contraseña nueva" {...field} type={showPassword ? "text" : "password"} />

                                    <Button className="size-5 cursor-pointer" onClick={viewPassword} type="button">
                                        {showPassword ? <EyeClosedIcon className="size-4 text-gray-500"/> : <EyeIcon className="size-4 text-gray-500"/>}
                                    </Button>

                                </ButtonGroup>
                            
                            {fieldState.invalid && <FieldError className="text-red-500 text-sm" errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />

                    <Controller
                    control={form.control}
                    name="confirmarContraseña"
                    render={({ field,fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-brand-balance">Confirmar contraseña</FieldLabel>
                            
                                <ButtonGroup className="items-center gap-2">
                                    <Input className="border-brand-green/30 md:w-80 focus:ring-brand-green/20 " placeholder="Confirmar contraseña" {...field} type={showConfirmPassword ? "text" : "password"} />

                                    <Button className="size-5 cursor-pointer" onClick={viewConfirmPassword} type="button">
                                        {showConfirmPassword ? <EyeClosedIcon className="size-4 text-gray-500"/> : <EyeIcon className="size-4 text-gray-500"/>}
                                    </Button>

                                </ButtonGroup>
                            
                            {fieldState.invalid && <FieldError className="text-red-500 text-sm" errors={[fieldState.error]} />}
                        </Field>
                    )}
                    />
                    <Button disabled={isSubmitting} type="submit" className="bg-brand-green hover:bg-brand-green/50 cursor-pointer text-white ">
                        {isSubmitting ? <LoaderCircleIcon className="size-5"/> : "Actualizar contraseña"}
                    </Button>
                    <Button variant="ghost" className='hover:underline transition-colors duration-300 cursor-pointer text-brand-blue' type="button">
                        <ArrowLeft className="size-5 " />
                        <Link href="/login" >Volver a iniciar sesión</Link>
                    </Button>
                    
                </form>
                
          
            
        </CardContent>         
    </Card>
  )
}
