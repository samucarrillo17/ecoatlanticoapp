"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { User } from "@/schema/userSchema"
import { headers } from "next/headers"

export const signup = async (value:User) => {
    const supabase = await createClient()
    const headersList = await headers();
    const host = headersList.get('host'); // ej: localhost:3000 o mi-app.com
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

    const email = value.email
    const password = value.password
    const nombre = value.nombre
    const apellido = value.apellido
    const telefono = value.telefono
    const universidad = value.universidad

    
    // signUp crea el usuario. Los datos extra DEBEN ir en options.data 
    // para que Supabase los guarde en la columna user_metadata.
    const {data,error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nombre,
                apellido,
                telefono,
                universidad,
            },
            emailRedirectTo: `${protocol}://${host}/`,
        }
    })

    if (error) {
    return { success: false, message: error.message }
  }

  // Si Supabase devuelve 'user' pero no hay 'session', es que necesita confirmar correo
  if (data.user && !data.session) {
    return { success: true, message: "CONFIRMATION_REQUIRED" }
  }

  return { success: true, message: "SIGNED_UP" }
}

export async function loginAction(email:string, password:string) {
  const supabase = await createClient()

  // 1. Intentar el inicio de sesión
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { success: false, message: authError?.message }
  }

  // 2. Obtener el perfil con tu función
  const profile = await getUserStatusRole(authData.user.id)

  if (!profile) {
    await supabase.auth.signOut()
    return { success: false, message: "No se encontró perfil de usuario" }
  }

  // 3. Validar estado del usuario
  if (profile.estado === 'inactivo' || profile.estado === 'pendiente') {
    await supabase.auth.signOut()
    return { success: false, message: "Tu cuenta está inactiva o pendiente de aprobación" }
  }

  // 4. Redirección basada en ROL
  // IMPORTANTE: 'redirect' debe llamarse fuera de bloques try/catch si los usaras
  let targetPath = '/usuario/inicio' // Ruta por defecto para voluntarios
  
  if (profile.rol === 'admin') {
    targetPath = '/dashboard/inicio'
  }

  redirect(targetPath)
}

export const logout = async () => {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/")
}

export async function getUserStatusRole(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('usuarios')
    .select('estado, rol')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error obteniendo perfil:', error.message)
    return null
  }
  
  return data
}