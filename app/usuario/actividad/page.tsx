import { Heart } from "lucide-react";


export default function page() {
  return (
    <main className="mx-auto max-w-2xl p-4 text-brand-balance">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Heart className="size-16 " />
          <h2 className="text-2xl font-bold">Actividad</h2>
          <p className="text-center">
            Aquí verás las interacciones y notificaciones de tus campañas
          </p>
        </div>
      </main>
  )
}
