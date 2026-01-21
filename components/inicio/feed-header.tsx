"use client"

import { Bell, Heart, Home, SlidersHorizontalIcon, User, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"



export function FeedHeader() {
  const pathname = usePathname()
  const navItems = [
    { icon: Home, label: "Inicio", href: "/usuario/inicio" },
    { icon: Heart, label: "Actividad", href: "/usuario/actividad" },
    { icon: User, label: "Perfil", href: "/usuario/perfil" },
  ]
  return (
    <header className="sticky top-0 z-50 w-full  bg-white">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/feed" className="text-xl font-bold text-brand-blue">
          <Waves className="size-7 fill-brand-green"  strokeWidth={2.5} />
        </Link>

        <div className="flex items-center gap-2 text-brand-balance">
          {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`flex flex-col gap-1 hover:bg-black/5 hover:text-brand-green cursor-pointer ${isActive ? "text-brand-green " : "text-brand-balance"}`}
              >
                <Icon className={`size-6 ${isActive ? "fill-brand-green":""}`} strokeWidth={isActive ? 2.5 : 2} />
         
              </Button>
            </Link>
          )
        })}
        </div>
      </div>
    </header>
  )
}
