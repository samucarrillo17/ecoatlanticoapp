"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import Link from "next/link"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "Limpieza Río Magdalena",
    date: "18 Febrero 2026",
    time: "7:00 AM - 11:00 AM",
    location: "Malecón del Río, Barranquilla",
    spots: "25 cupos disponibles",
    what: "protector solar, gorra, botella de agua",
    image: "/LimpiezaRios.jpg",
  },
  {
    id: 2,
    title: "Playa Limpia - Puerto Colombia",
    date: "25 Febrero 2026",
    time: "6:30 AM - 10:30 AM",
    location: "Playa Salgar, Puerto Colombia",
    spots: "40 cupos disponibles",
    what: "protector solar, ropa cómoda, snacks",
    image: "/LimpiezaPlaya.jpg",
  },
  {
    id: 3,
    title: "Siembra de Manglar",
    date: "4 Marzo 2026",
    time: "8:00 AM - 12:00 PM",
    location: "Ciénaga de Mallorquín",
    spots: "30 cupos disponibles",
    what: "ropa que pueda mojarse, repelente",
    image: "/SiembraMaglar.jpg",
  },
]

export function UpcomingEvents() {
  

  return (
    <section id="eventos" className="py-16 md:py-20 bg-brand-yellow/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-brand-yellow/30 rounded-full text-brand-balance font-semibold mb-4">
            ⚡ Próximas actividades
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-balance">Escoge tu próxima aventura</h2>
          <p className="text-brand-balance/90 text-lg max-w-2xl mx-auto text-pretty">
            Eventos diseñados para que vivas una experiencia inolvidable mientras cuidas el planeta
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-brand-card rounded-2xl overflow-hidden border-2 border-brand-green/30 hover:border-brand-green transition-all duration-300 hover:shadow-xl py-0"
            >
              <CardContent className="p-0">
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} width={300} height={300} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-brand-yellow  px-3 py-1 rounded-full text-sm font-semibold">
                  Gratis
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-brand-balance">{event.title}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Users className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="font-semibold text-brand-green">{event.spots}</span>
                  </div>
                </div>

                <div className="bg-brand-beige/50 rounded-lg p-3 mb-4 text-sm">
                  <span className="font-semibold text-brand-balance">Qué llevar:</span> {event.what}
                </div>

                <Button
                  className="w-full bg-brand-green text-white hover:bg-secondary/90 rounded-full font-semibold"
                >
                  <Link href="/registrate">
                  Reserva tu cupo
                  </Link>
                </Button>
              </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
