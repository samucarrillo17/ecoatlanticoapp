"use client"
import { Calendar, EllipsisVertical, Home, LogOut, Plus,  User,  Users, Waves } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from "next/link"
import { logout } from "@/server/auth/actions"
import { usePathname } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/dashboard/inicio",
    icon: Home,
  },
  {
    title: "Crear publicación",
    url: "/dashboard/crear-publicacion",
    icon: Plus,
  },
  {
    title: "Voluntarios",
    url: "/dashboard/voluntarios",
    icon: Users,
  },
  
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]
interface AppSidebarProps {
  nombreApellido: string
  profilePhoto: string
}
export function AppSidebar({nombreApellido,profilePhoto}: AppSidebarProps) {
  const pathname = usePathname()
  
  
  return (
    <Sidebar className="bg-brand-blue text-white px-2 ">
      <SidebarHeader className="flex-row gap-2 border-b border-white/10 py-10">
        <Waves className="size-7 text-brand-yellow" />
        <span className="text-lg font-bold">Ecoatlantico</span>
      </SidebarHeader>
      <SidebarContent className="py-4">
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={`hover:bg-black/10 transition-colors duration-300 h-10 ${pathname === item.url ? 'bg-black/10 font-semibold' : ''}`} asChild>
                    <Link href={item.url}>
                      <item.icon className="size-6!" />
                      <span className="text-md">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
      </SidebarContent>

       <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem >
                 
                  <SidebarMenuButton className={`h-10 flex justify-between hover:bg-black/10 transition-colors duration-300 ${pathname === '/dashboard/perfil' ? 'bg-black/10 font-semibold' : ''}`} asChild>
                  
                    <Link href="/dashboard/perfil">
                    <div className="flex gap-2 items-center text-sm">
                        <Avatar className="size-7">
                          <AvatarImage src={profilePhoto} alt={`foto de perfil de `} className='object-cover' />
                          <AvatarFallback className='bg-gray-200 text-xs font-semibold text-brand-balance'>
                            
                            {
                              nombreApellido?.split(" ")
                                .map((n:string) => n[0])
                                .join("")
                            } 
                          </AvatarFallback>
                        </Avatar>
                        {nombreApellido}
                    </div>
                    </Link>
                    
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

            </SidebarFooter>
    </Sidebar>
  )
}