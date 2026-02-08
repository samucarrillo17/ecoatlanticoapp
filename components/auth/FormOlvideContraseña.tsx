"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { LoaderCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from "react-hook-form"

type FormData = {
  correo: string
}

export function FormOlvideContraseña() {
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
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-brand-balance">Olvide mi contraseña</h2>
            <Input 
                placeholder="Correo electronico" 
                className="border-brand-green/30 focus:ring-brand-green/20 h-12 mt-4" 
                {...register("correo", { 
                    required: "El correo es requerido",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico inválido"
                    }
                })} 
            />
            <Button 
                disabled={isSubmitting} 
                className='cursor-pointer bg-brand-blue text-white w-full' 
                type='submit'
            >
                {isSubmitting ? <LoaderCircleIcon className="size-5 animate-spin"/> : "Enviar"}
            </Button>
        </form>
    )
}