import { getUserStats } from "@/server/user/actions";
import { FlameKindling, Sprout, Trophy } from "lucide-react";


export async function Statsprofile() {
  const { totalInscripciones, puntosTotales, horasTotales } = await getUserStats();
  return (
    <div className="mb-4 grid grid-cols-3 gap-4 rounded-lg bg-brand-beige/30 p-4 text-brand-balance">
            <div className="flex flex-col items-center">
              <Trophy className="mb-1 size-5 text-brand-green" />
              <span className="text-xl font-bold">{totalInscripciones}</span>
              <span className="text-xs ">Campañas</span>
            </div>
            <div className="flex flex-col items-center">
              <Sprout className="mb-1 size-5 text-brand-green" />
              <span className="text-xl font-bold">{horasTotales}h</span>
              <span className="text-xs text-muted-foreground">Voluntariado</span>
            </div>
            <div className="flex flex-col items-center">
              <FlameKindling className="mb-1 size-5 text-brand-green" />
              <span className="text-xl font-bold">{puntosTotales}</span>
              <span className="text-xs text-muted-foreground">Impacto</span>
            </div>
          </div>
  )
}
