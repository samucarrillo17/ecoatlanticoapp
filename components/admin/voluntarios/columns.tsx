"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Mail, Phone, MoreVertical, Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { InscripcionConVoluntario } from "@/app/_type/CampañasPorVoluntario"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { confirmarAsistencia } from "@/server/user/actions"
import { toast } from "sonner"



export const Columns: ColumnDef<InscripcionConVoluntario>[] = [
  {
    accessorKey: "voluntarios.nombre",
    header: "Nombre",
    cell: ({ row }) => {
      const inscripcion = row.original
      return (
          <span>{inscripcion.voluntarios.nombre}</span>
      )
    }
  },
    {
    accessorKey: "voluntarios.apellido",
    header: "Apellido",
    cell: ({ row }) => {
      const inscripcion = row.original
      return (
          <span>{inscripcion.voluntarios.apellido}</span>
      )
    }
  },
  {
    id: "contacto", 
    header: "Contacto",
    cell: ({ row }) => {
      const inscripcion = row.original
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="size-4! text-brand-blue" />
            <span>{inscripcion.voluntarios.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="size-4! text-brand-blue" />
            <span>{inscripcion.voluntarios.telefono}</span>
          </div>
        </div>
      )
    },
  },
  
  {
    id: "asistencia",
    header: "Asistion",
    cell: ({ row }) => {
      const inscripcion = row.original
      const router = useRouter()
      const [isPending, startTransition] = useTransition()

      const handleAsistencia = async (checked: boolean) => {
        // Solo actuamos si el admin marca el check (o puedes manejar desmarcar también)
        if (checked) {
          startTransition(async () => {
            const result = await confirmarAsistencia(inscripcion.id)
            
            if (result.success) {
              toast.success(result.message,{
                style:{
                  backgroundColor: "green",
                  color: "white",
                }
              })
              // router.refresh() le dice a Next.js que vuelva a pedir los datos 
              // al servidor para que el "estado" de la inscripción se actualice en la tabla
              router.refresh()
            } else {
              toast.error(result.message)
            }
          })
        }
      }

      return (
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={inscripcion.estado === "asistió"} 
            onCheckedChange={handleAsistencia}
            disabled={isPending || inscripcion.estado === "asistió"}
          />
          {isPending && <span className="text-[10px] animate-pulse">Guardando...</span>}
        </div>
      )
    },
  },
]