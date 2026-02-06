import { MainInicioAdmin } from "@/components/admin/inicio/MainInicioAdmin";
import { SkeletonInicio } from "@/components/admin/inicio/SkeletonInicio";
import { Suspense } from "react";



export default async function page() {
    
  return (
    <>
    <Suspense fallback={<SkeletonInicio/>}>

      <MainInicioAdmin/>
    </Suspense>
    </>
  )
}
