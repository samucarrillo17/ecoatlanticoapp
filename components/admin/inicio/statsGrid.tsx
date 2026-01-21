import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, MapPin, TrendingUp, UsersRound } from 'lucide-react'
export default function StatsGrid() {

    const data= [
        {
            count: 1234,
            title: 'Volunatios activos',
            icon: UsersRound,
            className: 'bg-brand-blue/20 text-brand-blue'
        },
        {
            count: 8,
            title: 'Eventos programados',
            icon: Calendar,
            className: 'bg-brand-green/20 text-brand-green'
        },
        {
            count: 24,
            title: 'Playas Limpiadas',
            icon: MapPin,
            className: 'bg-brand-beige/20 text-brand-beige'
        },
        {
            count: "89%",
            title: 'Participacion',
            icon: TrendingUp,
            className: 'bg-brand-yellow/20 text-brand-yellow'
        }
    ]
  return (
    <div className='flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-4'>
        {
        data.map((item) => (
            <Card key={item.title} className='border-black/20 gap-2'>
                <CardHeader>
                 <item.icon className={`size-8 p-1 rounded-md ${item.className}`}/>   
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>{item.count}</p>
                    <p className='text-sm font-light'>{item.title}</p>
                </CardContent>
            </Card>
        ))
        }
      
    </div>
  )
}
