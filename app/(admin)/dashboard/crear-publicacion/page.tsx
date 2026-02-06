import { FormCrear } from '@/components/admin/crearpublicacion/FormCrear'



export default function page() {
  return (
    <div className='space-y-4'>
     <div>
        <h1 className='md:text-2xl font-medium'>Crear publicacion</h1>
        <p className='text-sm'>Crea post de campañas o eventos</p>
    </div>
      <FormCrear/>
    </div>
  )
}
