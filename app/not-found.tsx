import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function notfound() {
  return (
    <div className="flex justify-center  h-screen bg-brand-yellow/10">
      <div className=" flex flex-col items-center text-center">
        <div className="flex items-center">
            <span className="text-[300px] font-bold text-brand-blue text-center">4</span>
            <Image src={"/earth.svg" } width={260} height={260} alt="hola"/>
            <span className="text-[300px] font-bold text-brand-blue text-center">4</span>
        </div>
       
        <p className="text-brand-balance w-2xl">Parece que te has desviado del sendero. Esta página aún no ha sido reforestada o ha desaparecido del mapa digital.</p>
        <Link href="/" className="mt-4">
            <Button className="flex gap-3 items-center bg-brand-blue text-white"
            >
                <House className="size-5" />
                Volver a casa</Button>
        </Link>
      </div>
    
      
    </div>
  )
}
