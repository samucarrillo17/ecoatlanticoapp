"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Mail, Phone } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { InscripcionConVoluntario } from "@/app/_type/CampanasPorVoluntario"

export const Columns: ColumnDef<InscripcionConVoluntario>[] = [
  {
    accessorKey: "voluntarios.nombre",
    header: "Nombre",
    cell: ({ row }) => {
      const inscripcion = row.original
      return <span>{inscripcion.voluntarios.nombre}</span>
    }
  },
  {
    accessorKey: "voluntarios.apellido",
    header: "Apellido",
    cell: ({ row }) => {
      const inscripcion = row.original
      return <span>{inscripcion.voluntarios.apellido}</span>
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
    header: "Asistencia",
    cell: ({ row, table }) => {
      const inscripcion = row.original
      const meta = table.options.meta as any
      const handleCheckboxChange = meta?.handleCheckboxChange
      const getCheckboxState = meta?.getCheckboxState

      const isChecked = getCheckboxState ? getCheckboxState(inscripcion) : inscripcion.estado === "asistió"

      const handleChange = (checked: boolean) => {
        if (handleCheckboxChange) {
          handleCheckboxChange(inscripcion.id, checked)
        }
      }

      return (
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={isChecked} 
            onCheckedChange={handleChange}
            className="cursor-pointer"
          />
        </div>
      )
    },
  },
]