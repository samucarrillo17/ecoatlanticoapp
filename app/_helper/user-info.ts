// lib/auth-helper.ts
import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { getProfileInfo } from '@/server/user/actions'

export const getAuthProfile = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const profile = await getProfileInfo(user.id)
  return profile
})