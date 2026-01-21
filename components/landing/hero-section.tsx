"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Waves } from "lucide-react"
import Link from "next/link"

export function HeroSection() {

  return (
    <section className="bg-brand-blue ">
      

      <div className="max-w-7xl mx-auto px-6 md:px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="flex items-center gap-2 mb-6 text-brand-yellow">
          <Waves className="size-6 md:size-8 " />
          <span className="font-bold text-sm md:text-base ">EcoAtlántico</span>
        </div>

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
            className="bg-brand-yellow  hover:bg-accent/90 text-base md:text-lg px-8 py-6 rounded-full font-semibold shadow-lg"
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
            className="border-2 border-white text-white hover:bg-white hover:text-brand-blue text-lg px-8 py-6 rounded-full font-semibold"
            onClick={() => document.getElementById("eventos")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver eventos
          </Button>
        </div>
        <p className="text-white/70 px-2">Si ya tienes cuenta, puedes <Link className="text-brand-yellow" href="/login">Iniciar sesión</Link></p>
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
