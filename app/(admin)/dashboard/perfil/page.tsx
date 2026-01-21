import { getAllPost } from '@/app/_helper/campaign-info'
import CampañasCreadas from '@/components/admin/perfil/CampañasCreadas'
import { PerfilHeaderAdmin } from '@/components/admin/perfil/PerfilHeaderAdmin'
import { PostType } from '@/app/_type/Post'


export default async function page() {
  const postInfo:PostType[] = await getAllPost()
  if (!postInfo) return null
  return (
    <div className='space-y-4'>
      <PerfilHeaderAdmin />
      <CampañasCreadas postInfo={postInfo} />
    </div>
  )
}
