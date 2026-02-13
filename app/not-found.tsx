"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



export default function notfound() {
  return (
    
     <div className="min-h-screen w-full bg-[#f0fdfa] relative">
      {/* Mint Fresh Breeze Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, 
              rgba(240,253,250,1) 0%, 
              rgba(204,251,241,0.7) 30%, 
              rgba(153,246,228,0.5) 60%, 
              rgba(94,234,212,0.4) 100%
            ),
            radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
          `,
        }}
      />
      {/* Your Content/Components */}
      <div className="relative flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-xl md:text-2xl text-brand-green font-extralight">Lo sentimos, no encontramos esta pagina</h1>
            <Link href="/" className="text-brand-green">
              <Button className="flex gap-2 items-center rounded-full border border-brand-green/30 hover:transform hover:scale-105 cursor-pointer" variant="outline">
                <ArrowLeft className="size-4 " />
                Volver
              </Button>
          </Link>
        
        </div>
        
      </div>
    </div>
      
    
  )
}
