"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type User, defaultValues,userSchema } from "@/schema/userSchema";
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import Link from "next/link";
import { signup } from "@/server/auth/actions";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";



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

                <Form {...form} >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <div className="flex flex-col space-y-4 md:flex-row md:gap-3 md:space-y-0">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">¿Como te llamas?</FormLabel>
                                    <FormControl>
                                        <Input className="border-brand-green/30 md:w-80 focus:ring-brand-green/20 " placeholder="Nombre" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="apellido"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-brand-balance">¿Cual es tu apellido?</FormLabel>
                                    <FormControl>
                                        <Input className="border-brand-green/30 md:w-72 focus:ring-brand-green/20 " placeholder="Apellido" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-brand-balance">Correo electronico</FormLabel>
                                <FormControl>
                                    <Input className="border-brand-green/30 focus:ring-brand-green/20  " placeholder="ejemplo@universidad.edu.co" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-3 space-y-4 md:flex-row md:space-y-0 ">
                      <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-brand-balance">Numero de contacto</FormLabel>
                                <FormControl>
                                    <Input className="border-brand-green/30 md:w-80 focus:ring-brand-green/20" type="number" placeholder="ej: 3502454567" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500"/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="universidad"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Universidad</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl>
                                    <SelectTrigger className="border-brand-green/30 w-full md:w-72 focus:ring-brand-green/20">
                                        <SelectValue placeholder="Selecciona una universidad" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white text-brand-balance">
                                    {
                                        universities.map((university,index) => (
                                            
                                            <SelectItem key={index}  value={university} className="hover:bg-black/5">{university} 
                                            </SelectItem>
                                            
                                        ))
                                    }
                                </SelectContent>
                                </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                        )}
                    />

                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-brand-balance">Contraseña</FormLabel>
                                <FormControl>
                                    <Input className="border-brand-green/30 focus:ring-brand-green/20  " type="password" placeholder="Contraseña" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmarContraseña"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-brand-balance">Confirmar contraseña</FormLabel>
                                <FormControl>
                                    <Input className="border-brand-green/30 focus:ring-brand-green/20  " type="password" placeholder="Confirmar contraseña" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                        <p className="text-center">¿Ya tienes cuenta? <Link href="/login" className="text-brand-blue">Inicia sesion</Link></p>
                        <Button type="submit" className="bg-brand-blue w-full cursor-pointer h-10 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                            {isSubmitting ? <LoaderCircleIcon className="animate-spin size-5" /> : "Registrate"}
                        </Button>
                    </form>
                </Form>
            </CardContent>

        </Card>
  )
}
