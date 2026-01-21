import { Instagram, Users, TrendingUp } from "lucide-react"

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20 bg-brand-green text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6" />
              <span className="font-semibold text-sm sm:text-base">TRENDING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-brand-balance">
              Únete al movimiento que está cambiando Barranquilla
            </h2>
            <p className="text-base sm:text-lg mb-8 text-brand-balance/90 text-pretty leading-relaxed">
              Cada semana más jóvenes se suman. No te quedes por fuera de la comunidad ambiental más activa de la
              ciudad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://instagram.com/ecoatlantico"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/90 rounded-full px-6 text-brand-green  py-3  font-semibold hover:bg-white/80 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                Síguenos en Instagram
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Users className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm">Repiten la experiencia</div>
            </div>
            <div className="bg-white/10  backdrop-blur-sm rounded-2xl p-6 text-center">
              <Instagram className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">8.5K</div>
              <div className="text-sm">Seguidores activos</div>
            </div>
            <div className="bg-white/10  backdrop-blur-sm rounded-2xl p-6 text-center col-span-2">
              <div className="text-4xl font-bold mb-1">⚡ #EcoAtlántico</div>
              <div className="text-sm">Usa nuestro hashtag y aparece en nuestra galería</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
