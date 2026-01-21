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

  const adminRoutes = ["/dashboard/inicio", "/dashboard/crear-publicacion","/dashboard/voluntarios","/dashboard/gestionar-campañas"]

  // const voluntarioRoutes = ["/feed","/activity","/profile"];
  // const isVoluntarioRoute = voluntarioRoutes.includes(request.nextUrl.pathname)
  
  const publicRoutes = ["/login", "/registrate", "/"]
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !isPublicRoute) {
    console.log("No autenticado, redirigiendo a login desde:", pathname)
    return NextResponse.redirect(new URL("/login", request.url))
  }
  

  if (user) {
    const { data: userProfile } = await supabase
        .from('usuarios')
        .select('rol, estado')
        .eq('id', user.id)
        .single()

    if (pathname === "/login" || pathname === "/registrate") {
        const defaultUrl = userProfile?.rol === 'admin' ? '/dashboard/inicio' : '/usuario/inicio'
        return NextResponse.redirect(new URL(defaultUrl, request.url))
    }

    if(userProfile?.rol === 'admin' && pathname.startsWith('/usuario')){
        return NextResponse.redirect(new URL('/dashboard/inicio', request.url))
    }

    if(userProfile?.rol === 'voluntario' && pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/usuario/inicio', request.url))
    }
  }
  


    return supabaseResponse
}
