
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const publicRoutes = ["/login", "/registrate", "/auth/callback", "/auth/olvide-contrasena","/auth/cambiar-contrasena", "/"]
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)
  const isProtectedArea = pathname.startsWith('/dashboard') || pathname.startsWith('/usuario')

  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isPublicRoute && isProtectedArea) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  

  if (user) {
    const userRole = user.app_metadata.user_role

    if (pathname === "/login" || pathname === "/registrate") {
        const defaultUrl = userRole === 'admin' ? '/dashboard/inicio' : '/usuario/inicio'
        return NextResponse.redirect(new URL(defaultUrl, request.url))
    }

    if(userRole === 'admin' && pathname.startsWith('/usuario')){
        return NextResponse.redirect(new URL('/dashboard/inicio', request.url))
    }

    if(userRole === 'voluntario' && pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/usuario/inicio', request.url))
    }
  }
  


    return supabaseResponse
}
