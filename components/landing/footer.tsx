import { Waves, Instagram, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white/80 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-6 w-6 text-brand-yellow" />
              <span className="font-bold text-xl text-white">EcoAtlántico</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Fundación dedicada a organizar campañas ecológicas y eventos ambientales en Barranquilla.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Contacto</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:hola@ecoatlantico.org"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                hola@ecoatlantico.org
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Barranquilla, Atlántico, Colombia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Síguenos</h3>
            <a
              href="https://instagram.com/ecoatlantico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
              @ecoatlantico
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2026 EcoAtlántico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
