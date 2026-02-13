
import React, { forwardRef } from 'react';

interface Props {
  nombre: string;
  apellido: string;
  horas: number;
  puntosImpacto: number;
}

// Usamos forwardRef para que react-to-print pueda "agarrar" este HTML
export const CertificadoTemplate = forwardRef<HTMLDivElement, Props>(({ nombre,apellido, horas,puntosImpacto }, ref) => {
  return (
    <div style={{ display: 'none' }}> {/* Oculto en la web, se verá al imprimir */}
      <div ref={ref} className="p-10 w-280.75 h-217 bg-white border-15 border-brand-blue relative flex flex-col items-center justify-center font-sans text-slate-800">
        
        {/* Adornos de las esquinas (opcional) */}
        <div className="absolute top-5 left-5 w-24 h-24 border-t-4 border-l-4 border-brand-beige" />
        
        <h1 className="text-6xl font-bold uppercase text-brand-green mb-4">Certificado de Impacto</h1>
        <p className="text-2xl mb-8">Otorgado con orgullo a:</p>
        
        <h2 className="text-5xl font-serif italic border-b-2 border-slate-300 px-10 pb-2 mb-6">
          {nombre + " " + apellido}
        </h2>
        
        <p className="text-xl text-center max-w-2xl leading-relaxed">
          Por su extraordinaria dedicación y compromiso con el medio ambiente, completando un total de 
          <span className="font-bold text-brand-green"> {horas} horas </span> 
          de voluntariado activo, sumando un total de <span className='font-bold text-brand-green'>{puntosImpacto}</span> puntos de impacto.Tu esfuerzo es la semilla de un futuro más verde.
        </p>

        <div className="mt-16 flex justify-around w-full">
          <div className="text-center">
            <div className="w-48 border-t border-brand-blue pt-2 italic text-sm">Firma Director Fundación</div>
          </div>  
        </div>
      </div>
    </div>
  );
});

CertificadoTemplate.displayName = "CertificadoTemplate";