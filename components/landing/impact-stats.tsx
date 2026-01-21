import { Trash2, Droplets, Users, TreePine } from "lucide-react"
import { Card } from "../ui/card"

const stats = [
  { icon: Trash2, value: "8,450", label: "Kg de residuos recogidos", color: "text-brand-green" },
  { icon: Droplets, value: "12", label: "Ríos y playas limpias", color: "text-brand-blue" },
  { icon: Users, value: "1,280", label: "Voluntarios activos", color: "text-brand-balance" },
  { icon: TreePine, value: "450", label: "Árboles plantados", color: "text-brand-green" },
]

export function ImpactStats() {
  return (
    <section className="py-16 md:py-20 bg-brand-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-balance">Impacto real, resultados medibles</h2>
          <p className="text-brand-balance/90 text-lg max-w-2xl mx-auto text-pretty">
            Juntos hemos logrado cambios tangibles en nuestro entorno
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-6">
          {stats.map((stat) => (
            <Card

              key={stat.label}
              className="bg-brand-yellow/10 rounded-2xl p-6 md:p-8 border-2 border-brand-green/30 hover:border-brand-green transition-colors duration-300 gap-0"
            >
              <stat.icon className={`h-8 w-8 md:h-10 md:w-10 ${stat.color} mb-4`} />
              <div className="text-3xl md:text-4xl font-bold mb-2 text-brand-balance">{stat.value}</div>
              <div className="text-sm md:text-base text-brand-balance/90">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
