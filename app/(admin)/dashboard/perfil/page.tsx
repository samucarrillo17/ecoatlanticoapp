import CampañasAdmin from "@/components/admin/perfil/CampañasAdmin";
import { PerfilHeaderAdmin } from "@/components/admin/perfil/PerfilHeaderAdmin";
import { SkeletonHeader } from "@/components/perfil/SkeletonHeader";
import { LoaderCircleIcon } from "lucide-react";
import { Suspense } from "react";



export default async function page() {

  return (
    <>
    <Suspense fallback={<SkeletonHeader />}>
      <PerfilHeaderAdmin />
    </Suspense>
    <hr className="text-brand-balance/20 mb-4"/>
    <Suspense fallback={<LoaderCircleIcon className='animate-spin size-7 text-gray-200 mx-auto' />}>
      <CampañasAdmin/>
    </Suspense>
    </>
  )
}
