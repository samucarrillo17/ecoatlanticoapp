import CampanasCreadas from '@/components/admin/perfil/CampanasCreadas'
import { PerfilHeaderAdmin } from '@/components/admin/perfil/PerfilHeaderAdmin'
import { PostType } from '@/app/_type/Post'
import { getAllPostInfo } from '@/server/campaign/actions'


export default async function CampanasAdmin() {
  const postInfo:PostType[] = await getAllPostInfo()
  if (!postInfo) return null
  return (
      <CampanasCreadas postInfo={postInfo} />
  )
}
