"use server"
import { createClient } from "@/lib/supabase/server"
import { User } from "@/schema/userSchema"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

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
            emailRedirectTo: `${protocol}://${host}/auth/callback`,
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

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { success: false, message: authError?.message }
  }
  return { success: true, message: "LOGGED_IN" }
}

export const logout = async () => {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export const resetEmailPasswordConfirmation = async (host: string) => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user?.email) {
        await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo: `${host}/auth/cambiar-contrasena`
        })
        return true
    }
  
    return false
}

