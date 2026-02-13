'use client';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CertificadoTemplate } from "./CertificadoTemplate";
import { getProfileInfo, getUserStats } from '@/server/user/actions';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CardCertificados from './CardCertificados';
import { GraduationCap, LoaderCircleIcon } from 'lucide-react';

type EstadisticasUsuarioCertificado ={
    nombre: string;
    apellido:string,
    horas: number;
    puntosImpacto: number;
}
export default function SeccionCertificados() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [usuario, setUsuario] = useState<EstadisticasUsuarioCertificado | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getUserStats()
        const data = await getProfileInfo()
        setUsuario(
          {nombre:data.nombre,
            horas:stats.horasTotales,
            apellido:data.apellido,
            puntosImpacto:stats.puntosTotales})
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Certificado_Voluntariado`,
  })

  if (loading) return <div className="animate-pulse mt-10">
    <LoaderCircleIcon className='animate-spin size-7 text-gray-200' />
    </div>
  if (!usuario) return <div>Inicia sesión para ver tus certificados.</div>
  

  return (
    <div className='space-y-6'>
      <Card className='border-none'>
        <CardContent className='flex flex-col justify-center items-center'>
          <div className='text-brand-balance flex gap-2 items-center'>
            <GraduationCap className='size-7'/>
            <span className='text-xl font-medium'>Mis certificados</span>
          </div>
        </CardContent>
      </Card>
    
        {usuario.horas >= 20 ? (
            <>
            <div className='grid grid-cols-2'>
                < CardCertificados handlePrint={handlePrint}/>
            </div>
            
            <CertificadoTemplate 
                ref={componentRef} 
                nombre={usuario.nombre} 
                horas={usuario.horas}
                puntosImpacto={usuario.puntosImpacto}
                apellido={usuario.apellido} 
            />
            </>
        ) : (
            <p className="text-slate-400 italic">Te faltan {20 - usuario.horas} horas para tu primer certificado.</p>
        )}
        

    </div>
  );
}