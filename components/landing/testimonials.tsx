import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Camila Rodríguez",
    role: "Estudiante de Ingeniería Ambiental",
    university: "Universidad del Norte",
    text: "EcoAtlántico cambió mi forma de ver la acción ambiental. No es solo limpiar, es conectar con personas que comparten tu pasión por el planeta.",
    image: "/Camila.jpg",
  },
  {
    name: "Juan Pablo Martínez",
    role: "Estudiante de Administración",
    university: "Universidad Autónoma",
    text: "Llevo 6 meses voluntariando y es lo mejor que he hecho en la U. He conocido gente increíble y siento que hago una diferencia real.",
    image: "/Juan.jpg",
  },
  {
    name: "Sofía Mendoza",
    role: "Estudiante de Comunicación Social",
    university: "Universidad Simón Bolívar",
    text: "Mi primer evento fue hace 3 semanas y ya estoy planeando el siguiente. La energía del grupo es contagiosa y las actividades están súper organizadas.",
    image: "/Sofia.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-brand-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-balance">Historias de quienes ya dieron el paso</h2>
          <p className="text-brand-balance/90 text-lg max-w-2xl mx-auto text-pretty">
            Universitarios como tú que ya están haciendo la diferencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-yellow/5 rounded-2xl p-6 sm:p-8 border-2 border-brand-green/30 hover:border-brand-green transition-colors duration-300 text-brand-balance" 
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>

              <p className="text-base mb-6 text-pretty leading-relaxed ">"{testimonial.text}"</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-brand-blue">{testimonial.name}</div>
                  <div className="text-sm text-brand-blue">{testimonial.role}</div>
                  <div className="text-xs text-brand-blue">{testimonial.university}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
