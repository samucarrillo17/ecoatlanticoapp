import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, MapPin, UsersRound } from 'lucide-react'
export default function ActionsGrid() {

    const data= [
        {
            title: 'Crear campaña o evento',
            icon: Calendar,
            classNameIcon: 'bg-brand-green/20 text-brand-green',
            classNameCard: 'border-brand-green border-2',
            text: "Programa una nueva actividad"
        },
        {
            title: 'Ver voluntarios',
            icon: UsersRound,
            classNameIcon: 'bg-brand-blue/20 text-brand-blue',
            classNameCard: 'border-brand-blue border-2',
            text: "Gestiona tu comunidad activa"
        },
        {
            title: 'Ver Reportes',
            icon: MapPin,
            classNameIcon: 'bg-brand-beige/20 text-brand-beige',
            classNameCard: 'border-brand-beige border-2',
            text:"Analiza el impacto ambiental"
        }
    ]
  return (
    <div className='flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-4'>
        {
        data.map((item) => (
            <Card key={item.title} className={`gap-2 ${item.classNameCard}`}>
                <CardHeader>
                 <item.icon className={`size-8 p-1 rounded-md ${item.classNameIcon}`}/>   
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>{item.title}</p>
                    <p className='text-sm'>{item.text}</p>
                </CardContent>
            </Card>
        ))
        }
      
    </div>
  )
}
