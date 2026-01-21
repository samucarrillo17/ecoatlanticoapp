import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { getAllPostInfo, getPostInfo } from '@/server/campaign/actions'

export const getAllPost = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const campaign = await getAllPostInfo(user.id)
  return campaign || []
})

export const getPost = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const campaign = await getPostInfo() 
  return campaign || []
})
