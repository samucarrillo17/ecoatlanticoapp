"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, LoaderCircleIcon, LockKeyholeIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import Link from 'next/link'

type FormData = {
  correo: string
}

export function FormOlvideContrasena() {
    const { handleSubmit, formState: { isSubmitting }, register } = useForm<FormData>()

    const onSubmit = async (values: FormData) => {
        const host = window.location.origin
        
        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(values.correo, {
            redirectTo: `${host}/auth/cambiar-contrasena`
        })

        if (error) {
            toast.error("Error al enviar el email de recuperación de contraseña", {
                description: error.message,
                style: {
                    background: "red",
                    color: "white",
                }
            })
        } else {
            toast.success("Se ha enviado un email para que cambies tu contraseña", {
                style: {
                    background: "green",
                    color: "white",
                }
            })
        }
    }

    return (
        <Card className='border-2 border-brand-green/30 w-100'>
            <CardHeader>
                <div className='flex flex-col items-center gap-2 '>
                    <LockKeyholeIcon className="size-8 text-brand-blue " />
                    <CardTitle className="text-brand-balance text-2xl text-center">¿Olvidaste tu contraseña?</CardTitle>
                    <CardDescription className="text-brand-balance text-sm text-center ">No te preocupes, te enviaremos un mensaje de verificación a tu correo para que puedas recuperar el acceso.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label>Correo electronico</Label>
                        <Input 
                            placeholder="tu@email.com"
                            className="border-brand-green/30 focus:ring-brand-green/20 h-12 mt-4" 
                            {...register("correo", { 
                                required: "El correo es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo electrónico inválido"
                                }
                            })} 
                        />
                    </div>
                    
                    <Button 
                        disabled={isSubmitting} 
                        className='cursor-pointer bg-brand-blue text-white w-full' 
                        type='submit'
                    >
                        {isSubmitting ? <LoaderCircleIcon className="size-5 animate-spin"/> : "Enviar correo de recuperación"}
                    </Button>

                    <Button variant="ghost" className='hover:underline transition-colors duration-300 cursor-pointer text-brand-blue'>
                        <ArrowLeft className="size-5 " />
                        <Link href="/login" >Volver a iniciar sesión</Link>
                    </Button>        
                </form> 
        </CardContent>
        </Card>
    )
}