import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar, CalendarClock, Users } from "lucide-react";

export default function Upcomingevents() {
      const recentEvents = [
    { name: 'Limpieza Playa Puerto Colombia', date: '18 Feb', volunteers: 45, status: 'Próximo' },
    { name: 'Río Magdalena - Jornada Especial', date: '25 Feb', volunteers: 20, status: 'Programado' },
    { name: 'Playa Salgar', date: '3 Mar', volunteers: 38, status: 'Programado' },
  ];
  return (
    <Card className='border-black/20 gap-2 py-2'>
        <CardContent className="p-0">
                    <Table className="bg-brand-card">
            <TableHeader >
                <TableRow className="border-black/20">
                <TableHead className="text-2xl font-semibold flex items-center gap-2">
                    <CalendarClock className="size-6 text-brand-green"/>
                    Próximos eventos
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                {
                recentEvents.map((event) => (
                    <TableRow key={event.date} className="border-black/20" >
                        <TableCell className="py-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-semibold text-lg">
                                    {event.name}

                                </h2>
                                <div className="flex gap-3">
                                    <div className="flex gap-1 items-center">
                                        <Calendar className="size-4 text-brand-green"/>
                                        <p>{event.date}</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <Users className="size-4 text-brand-blue "/>
                                        <p>{event.volunteers} inscritos</p>
                                    </div>
                                </div>
                            </div>
                            </TableCell>
                    </TableRow>

                ))
                }
                
            </TableBody>
        </Table>
        </CardContent>

    </Card>
  )
}
