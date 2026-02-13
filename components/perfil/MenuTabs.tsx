import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampanasInscritas } from "./Campanasinscritas"
import { Suspense } from "react"
import { LoaderCircleIcon } from "lucide-react"
import SeccionCertificados from "./SeccionCertificado"

export default function MenuTabs() {
  return (
    
        <Tabs defaultValue="campañas" className="max-w-3xl items-center">
            <TabsList variant={"line"}>
                <TabsTrigger value="campañas" className="cursor-pointer">Mis campañas</TabsTrigger>
                <TabsTrigger value="certificados" className="cursor-pointer">Mis certificados</TabsTrigger>
            </TabsList>
            <TabsContent value="campañas">
                <Suspense fallback={<LoaderCircleIcon className='animate-spin size-7 text-gray-200 mx-auto' />}>
                    <CampanasInscritas/>
                </Suspense>
            </TabsContent>
            <TabsContent value="certificados">
                <Suspense fallback={<LoaderCircleIcon className='animate-spin size-7 text-gray-200 mx-auto' />}>
                    <SeccionCertificados/>
                </Suspense>
            </TabsContent>
        </Tabs>

  )
}
