import CampañasCreadas from '@/components/admin/perfil/CampañasCreadas'
import { PerfilHeaderAdmin } from '@/components/admin/perfil/PerfilHeaderAdmin'
import { PostType } from '@/app/_type/Post'
import { getAllPostInfo } from '@/server/campaign/actions'


export default async function CampañasAdmin() {
  const postInfo:PostType[] = await getAllPostInfo()
  if (!postInfo) return null
  return (
      <CampañasCreadas postInfo={postInfo} />
  )
}
