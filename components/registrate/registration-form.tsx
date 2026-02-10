"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type User, defaultValues,userSchema } from "@/schema/userSchema";
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signup } from "@/server/auth/actions";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { FormController } from "../FormController";
import { SelectWrapper } from "../SelectWrapper";



export default function RegistrationForm() {
  const form = useForm<User>({
        defaultValues,
        resolver: zodResolver(userSchema),
    });

    const {
        handleSubmit,
        formState: { isSubmitting   },
        reset
    } = form;

    const onSubmit = async (values: User) => {
        const result = await signup(values)
        if (result.success) {
            
            toast.success("Registro exitoso",{
                description: "¡Confirma tu correo para activar tu cuenta!",
                duration: 3000,
                style: {
                    background: "green",
                    color: "white",
                },
            })
            reset()
        } else {
            toast.error("Registro fallido",{
                description: result.message,
                duration: 2000,
                style:{
                    background: "red",
                    color: "white",
                }
            })
        }
  }

  const universities =["Universidad Simon Bolivar","Universidad de la Costa","Universidad Autonoma","Universidad Metropolina","Universidad Libre"]

  return (
    <Card className="border-2 border-brand-green/20 bg-brand-card ">
            <CardHeader>
                <CardTitle className="text-brand-balance text-2xl">Registrate</CardTitle>
                <CardDescription className="text-brand-balance text-sm">Unete a otros jovenes como tu que ya estan haciendo la diferencia</CardDescription>
            </CardHeader>
            <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid space-y-4 md:grid-cols-2 md:gap-3 md:space-y-0">

                        <FormController
                            name="nombre"
                            control={form.control}
                            as={Input}
                            label="¿Como te llamas?"
                            placeholder="Nombre"
                            inputProps={{
                                className: "border-brand-green/30 focus:ring-brand-green/20 h-10 "
                            }}
                        />
                        <FormController
                            name="apellido"
                            control={form.control}
                            as={Input}
                            label="¿Cual es tu apellido?"
                            placeholder="Apellido"
                            inputProps={{
                                className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                            }}
                        />

                        
                    </div>

                    <FormController
                        name="email"
                        control={form.control}
                        as={Input}
                        label="Correo electronico"
                        placeholder="ejemplo@universidad.edu.co"
                        inputProps={{
                            className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                        }}
                    />
                    
                    <div className="grid space-y-4 md:grid-cols-2 md:gap-3 md:space-y-0 ">
                      <FormController
                        name="telefono"
                        control={form.control}
                        as={Input}
                        label="Numero de contacto"
                        placeholder="ej: 3503456543"
                        inputProps={{
                            className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                        }}
                        />

                        <FormController
                            name="universidad"
                            control={form.control}
                            as={SelectWrapper}
                            label="Universidad"
                            placeholder="Selecciona tu universidad"
                            inputProps={{
                            options: universities.map((university) => ({
                                label: university,
                                value: university,
                            })),
                            
                            }}
                        />

                    </div>
                    <FormController
                        name="password"
                        control={form.control}
                        as={Input}
                        label="Contraseña"
                        placeholder="Contraseña"
                        inputProps={{
                            type: "password",
                            className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                        }}
                    />

                    <FormController
                        name="confirmarContraseña"
                        control={form.control}
                        as={Input}
                        label="Confirmar contraseña"
                        placeholder="Confirmar contraseña"
                        inputProps={{
                            type:"password",
                            className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
                        }}
                    />
                        <p className="text-center text-sm">¿Ya tienes cuenta? <Link href="/login" className="text-brand-blue hover:underline">Inicia sesion</Link></p>
                        <Button type="submit" className="bg-brand-blue w-full cursor-pointer h-10 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                            {isSubmitting ? <LoaderCircleIcon className="animate-spin size-5" /> : "Registrate"}
                        </Button>
                    </form>
                
            </CardContent>

        </Card>
  )
}
