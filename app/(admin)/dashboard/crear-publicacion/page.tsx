import { FormCrear } from '@/components/admin/crearpublicacion/FormCrear'
import { Header } from '@/components/admin/crearpublicacion/header'


export default function page() {
  return (
    <div className='space-y-4'>
      <Header/>
      <FormCrear/>
    </div>
  )
}
