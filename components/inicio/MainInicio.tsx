import { PostType } from '@/app/_type/Post'
import { getPostInfo } from '@/server/campaign/actions'
import { FeedPost } from './feed-post'

export async function MainInicio() {
    const post:PostType[] = await getPostInfo()
    if (!post) return null
  return (
    <div>
      {post.map((post) => (
            <FeedPost key={post.id} post={post} />
        ))}
    </div>
  )
}
