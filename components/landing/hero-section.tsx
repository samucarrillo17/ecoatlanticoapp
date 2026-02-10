"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Waves } from "lucide-react"
import Link from "next/link"
import { ChevronDown, LogOut,  User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserType } from "@/app/_type/User";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type data ={
  data: UserType | null | undefined
}

export function HeroSection({data}:data) {
  const router = useRouter()
 const nombreApellido = data ? (data.nombre + ' ' + data.apellido) : '';

 const handleLogOut = async () => {
    const supabase = createClient()
    const response = await supabase.auth.signOut()
    if (response.error) {
      console.error('Error al cerrar sesión:', response.error.message)
    }
    router.refresh()
  }
  return (
    <section className="bg-brand-blue ">
      <div className="flex items-center justify-between gap-2  p-6">
          <div className="text-brand-yellow flex items-center gap-2">
            <Waves className="size-6 md:size-8 " />
            <span className="font-bold text-sm md:text-base ">EcoAtlántico</span>
          </div>
          {
            data &&(
              <DropdownMenu>
            <DropdownMenuTrigger asChild className="h-12" >
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full bg-white/10  text-white hover:bg-white/15 border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all"
              >
                <Avatar className="size-8">
                  <AvatarImage src={data.foto_perfil} alt={`perfil-${data.nombre}`} className="object-cover" />
                  <AvatarFallback className="bg-gray-300 text-brand-balance font-semibold text-sm">
                    {       
                        nombreApellido?.split(" ")
                        .map((n:string) => n[0])
                        .join("")
                    }
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block text-sm font-medium max-w-37.5 truncate">
                  {data.nombre}
                </span>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 bg-white">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="size-12">
                    <AvatarImage src={data.foto_perfil} alt={`perfil-${data.nombre}`} className="object-cover" />
                    <AvatarFallback className="bg-gray-300 text-brand-balance font-semibold">
                       {       
                        nombreApellido?.split(" ")
                        .map((n:string) => n[0])
                        .join("")
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-semibold text-brand-balance truncate">
                    {nombreApellido}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{data.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-brand-balance/10" />
              <Link href="/usuario/perfil" className="text-brand-balance">
                  <DropdownMenuItem
                    className="cursor-pointer text-brand-balance hover:bg-black/5"
                  >
                    <User className="size-4" />
                    Mi perfil
                  </DropdownMenuItem>
               </Link>       

              <DropdownMenuItem
                onClick={handleLogOut}
                className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="size-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            )
          }
          
        </div>

      <div className="max-w-7xl mx-auto px-6 md:px-4 lg:px-8 py-20 md:py-18 lg:py-30">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold mb-6 text-white/90 leading-tight">
          Tu acción, nuestro océano
        </h1>

        <p className="text-lg  md:text-2xl mb-8 max-w-2xl text-white/70 ">
          Únete a jóvenes como tú que están limpiando ríos y playas en Barranquilla. Cada acción cuenta, cada voluntario
          importa.
        </p>

    <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            size="lg"
            className="bg-brand-yellow  hover:bg-accent/90 text-base md:text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:bg-brand-yellow/90 transition-colors duration-300 "
            asChild
          >
            <Link href="/registrate">
              Inscríbete gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-brand-blue text-lg px-8 py-6 rounded-full font-semibold cursor-pointer transition-colors duration-300 "
            onClick={() => document.getElementById("eventos")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver eventos
          </Button>
        </div>
        <p className="text-white/70 px-2">Si ya tienes cuenta, puedes <Link className="text-brand-yellow hover:underline" href="/login">Iniciar sesión</Link></p>
      </div>

        <div className="flex items-center gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-yellow" />
            <span className="text-white/90">+1,200 voluntarios</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-brand-yellow" />
          <span className="text-white/90">🎯 Próximo evento: 18 Feb</span>
        </div>
      </div>
    </section>
  )
}
