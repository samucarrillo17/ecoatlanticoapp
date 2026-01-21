"use client"

import { Home, Heart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Inicio", href: "/feed" },
    { icon: Heart, label: "Actividad", href: "/activity" },
    { icon: User, label: "Perfil", href: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-around px-2">
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
    </nav>
  )
}
