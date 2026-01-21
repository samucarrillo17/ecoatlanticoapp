"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { UpdateUser } from "@/schema/UpdateSchema"
import { RespuestaInscripcion } from "@/app/_type/Post"
import { calcularDiferenciaHoras } from "@/app/_helper/calcularDiferenciaHoras"


export const getProfileInfo = async (userId: string) => {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Error obteniendo perfil:', error.message)
        return null
    }
   

    return data
}

export async function updateUserProfile(data: UpdateUser) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  
  if (!user) {
    return { success: false, message: 'No autenticado' }
  }

  try {
    let finalAvatarUrl = data.foto_perfil;

    if (data.foto_perfil instanceof File) {
      const uploadResult = await uploadAvatar(data.foto_perfil);
      if (!uploadResult.success) {
        throw new Error(uploadResult.message);
      }
      finalAvatarUrl = uploadResult.url; 
    } 
  
    else if (data.foto_perfil === null) {
      finalAvatarUrl = null;
    }
    
    const updateData = {
      ...data,
      foto_perfil: finalAvatarUrl,
      updated_at: new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('usuarios')
      .update(updateData)
      .eq('id', user.id)

    if (updateError) {
      console.error('Error actualizando perfil:', updateError)
      return { success: false, message: 'Error al actualizar el perfil' }
    }

    revalidatePath('/', 'layout')

    return { 
      success: true, 
      message: 'Perfil actualizado correctamente'
    }

  } catch (error) {
    console.error('Error general:', error)
    return { success: false, message: 'Error inesperado' }
  }
}

export async function uploadAvatar(image: File) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, message: 'No autenticado' }
  }

  const file = image
  
  if (!file) {
    return { success: false, message: 'No se proporcionó ningún archivo' }
  }

  if (!file.type.startsWith('image/')) {
    return { success: false, message: 'El archivo debe ser una imagen' }
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { success: false, message: 'La imagen no puede superar 5MB' }
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`

    // Eliminar foto anterior si existe
    const { data: oldProfile } = await supabase
      .from('usuarios')
      .select('foto_perfil') // ← Campo de la tabla
      .eq('id', user.id)
      .single()

    if (oldProfile?.foto_perfil) {
      const oldPath = oldProfile.foto_perfil.split('/').slice(-2).join('/')
      await supabase.storage
        .from('foto-perfil-usuario') // ← Nombre del bucket
        .remove([oldPath])
    }

    // Subir nueva imagen
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('foto-perfil-usuario') // ← Nombre del bucket
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error subiendo imagen:', uploadError)
      return { success: false, message: 'Error al subir la imagen' }
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('foto-perfil-usuario') // ← Nombre del bucket
      .getPublicUrl(uploadData.path)

    revalidatePath('/', 'layout')

    return { 
      success: true, 
      message: 'Foto de perfil actualizada correctamente',
      url: publicUrl 
    }

  } catch (error) {
    console.error('Error general:', error)
    return { success: false, message: 'Error inesperado' }
  }
}

export async function inscribirCampana(idCampana:string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  
  if (!user) {
    return { success: false, message: 'No autenticado' }
  }
  const updateCampana =  {
    usuario_id: user.id,
    campana_id: idCampana,
  }
  
  try {
    const {error: insertError} = await supabase
      .from('inscripciones')
      .insert(updateCampana)

      if (insertError) {
        console.error('Error al inscribirte a la campaña:', insertError.message)
        return { success: false, message: 'Error al inscribirte a la campaña' }
      }
      revalidatePath('/', 'layout')
      return { success: true, message: 'Te inscribiste correctamente' }
    
  }catch (error) {
      console.error('Error general:', error)
      return { success: false, message: 'Error inesperado' }
  }
}

export async function getCampañasInscritas(){
  const supabase = await createClient()

  const { data:{user} } = await supabase.auth.getUser()

  if (!user) {
    return []
  }
  const { data, error } = await supabase
  .from('inscripciones')
  .select(`
    campana_id,
    campaña:campanas!campana_id(
    id,
    titulo,
    descripcion,
    fecha,
    lugar,
    tipo_publicacion,
    hora_inicio,
    hora_fin
    )
  `)
  .eq('usuario_id', user.id);

  if (error) {
    console.error('Error obteniendo la campaña:', error.message)
    return []
  }

  const inscripciones = (data as unknown as RespuestaInscripcion[]) || [];
  
  
  return inscripciones
    .map(item => item.campaña)
    .filter(campaña => campaña !== null);
}

export async function confirmarAsistencia(inscripcionId: string) {
  const supabase = await createClient()

  // 1. Obtener los puntos. 
  // Usamos una interfaz temporal para que TS entienda la estructura
  const { data, error: fetchError } = await supabase
    .from('inscripciones')
    .select(`
      campana_id,
      campanas:campanas!campana_id (
        puntos_impacto
      )
    `)
    .eq('id', inscripcionId)
    .single() // El .single() intenta devolver un objeto, no un array

  if (fetchError || !data) {
    return { success: false, message: "No se encontró la inscripción" }
  }

  // TypeScript a veces sigue creyendo que 'campanas' es un array o un objeto
  // Hacemos una comprobación de seguridad o un casting rápido
  const campana = data.campanas as unknown as { puntos_impacto: number };
  const puntosParaAsignar = campana?.puntos_impacto || 0;

  // 2. Actualizar el estado y asignar los puntos
  const { error: updateError } = await supabase
    .from('inscripciones')
    .update({ 
      estado: 'asistió', 
      puntos_ganados: puntosParaAsignar,
      fecha_asistencia: new Date().toISOString()
    })
    .eq('id', inscripcionId)

  if (updateError) {
    return { success: false, message: "Error al actualizar la asistencia" }
  }

  return { success: true, message: "Asistencia confirmada con éxito" }
}

export async function getUserStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { totalInscripciones: 0, puntosTotales: 0, horasTotales: 0 };

  const { data: inscripciones } = await supabase
    .from('inscripciones')
    .select(`
      estado,
      puntos_ganados,
      campanas (
        hora_inicio,
        hora_fin
      )
    `)
    .eq('usuario_id', user.id);

  if (!inscripciones) return { totalInscripciones: 0, puntosTotales: 0, horasTotales: 0 };

  const totalInscripciones = inscripciones.length;

  // Sumamos puntos
  const puntosTotales = inscripciones
    .filter(i => i.estado === 'asistió')
    .reduce((acc, curr) => acc + (curr.puntos_ganados || 0), 0);

  // Sumamos horas reales basadas en la duración de la campaña
  const horasTotales = inscripciones
    .filter(i => i.estado === 'asistió' && i.campanas)
    .reduce((acc, curr) => {
      // @ts-ignore - campanas es un objeto por el join simple
      const { hora_inicio, hora_fin } = curr.campanas;
      
      if (hora_inicio && hora_fin) {
        return acc + calcularDiferenciaHoras(hora_inicio, hora_fin);
      }
      return acc;
    }, 0);

  return { 
    totalInscripciones, 
    puntosTotales, 
    horasTotales: Math.round(horasTotales * 10) / 10 // Redondeamos a 1 decimal
  };
}
