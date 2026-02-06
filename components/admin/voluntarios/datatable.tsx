"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState, useTransition } from "react"
import { InscripcionConVoluntario } from "@/app/_type/CampañasPorVoluntario"
import { confirmarAsistenciaLote } from "@/server/user/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  // Estado local para manejar checkboxes antes de guardar
  const [localChanges, setLocalChanges] = useState<Map<string, boolean>>(new Map())

  // Función para manejar cambios en checkboxes
  const handleCheckboxChange = (inscripcionId: string, checked: boolean) => {
    setLocalChanges(prev => {
      const newMap = new Map(prev)
      newMap.set(inscripcionId, checked)
      return newMap
    })
  }

  // Función para obtener el estado actual de un checkbox
  const getCheckboxState = (inscripcion: any) => {
    // Si hay un cambio local, usar ese valor
    if (localChanges.has(inscripcion.id)) {
      return localChanges.get(inscripcion.id)
    }
    // Si no, usar el estado de la BD
    return inscripcion.estado === "asistió"
  }

  // Guardar todos los cambios
  const handleGuardarAsistencias = async () => {
    if (localChanges.size === 0) {
      toast.info("No hay cambios para guardar")
      return
    }

    startTransition(async () => {
      // Preparar array de inscripciones a actualizar
      const inscripcionesParaActualizar = Array.from(localChanges.entries())
        .filter(([_, checked]) => checked) // Solo las marcadas como asistió
        .map(([id]) => id)

      const result = await confirmarAsistenciaLote(inscripcionesParaActualizar)
      
      if (result.success) {
        toast.success(`${result.actualizadas} asistencias confirmadas`)
        setLocalChanges(new Map()) // Limpiar cambios locales
        router.refresh() // Actualizar datos
      } else {
        toast.error(result.message,{
          style:{
            background:"red",
            color:"white"
          }
        })
      }
    })
  }

  // Cancelar cambios
  const handleCancelarCambios = () => {
    setLocalChanges(new Map())
    toast.info("Cambios descartados")
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    meta: {
      handleCheckboxChange,
      getCheckboxState,
    }
  })

  const hayCambios = localChanges.size > 0

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filtrar por nombre"
          value={(table.getColumn("voluntarios_nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Nombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-black/20 focus:ring-brand-blue/20"
        />

        {hayCambios && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelarCambios}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleGuardarAsistencias}
              disabled={isPending}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                `Guardar ${localChanges.size} cambios`
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-md border border-black/20">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-brand-blue text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-black/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  )
}