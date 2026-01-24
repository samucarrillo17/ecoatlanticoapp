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

export async function confirmarAsistenciaLote(inscripcionIds: string[]) {
  const supabase = await createClient()

  if (inscripcionIds.length === 0) {
    return { success: false, message: "No hay inscripciones para actualizar", actualizadas: 0 }
  }

  try {
    // Obtener información de las inscripciones y campañas en una sola consulta
    const { data: inscripciones, error: fetchError } = await supabase
      .from('inscripciones')
      .select(`
        id,
        campana_id,
        campanas:campanas!campana_id (
          puntos_impacto
        )
      `)
      .in('id', inscripcionIds)

    if (fetchError || !inscripciones) {
      return { success: false, message: "No se encontraron las inscripciones", actualizadas: 0 }
    }

    // Preparar las actualizaciones con los puntos correspondientes
    const actualizaciones = inscripciones.map(inscripcion => {
      const campana = inscripcion.campanas as unknown as { puntos_impacto: number };
      const puntosParaAsignar = campana?.puntos_impacto || 0;

      return {
        id: inscripcion.id,
        estado: 'asistió',
        puntos_ganados: puntosParaAsignar,
        fecha_asistencia: new Date().toISOString()
      }
    })

    // Actualizar todas las inscripciones en una sola operación
    // Nota: Supabase no soporta bulk update directo, así que usamos Promise.all
    const resultados = await Promise.all(
      actualizaciones.map(async (actualizacion) => {
        const { error } = await supabase
          .from('inscripciones')
          .update({
            estado: actualizacion.estado,
            puntos_ganados: actualizacion.puntos_ganados,
            fecha_asistencia: actualizacion.fecha_asistencia
          })
          .eq('id', actualizacion.id)
        
        return { id: actualizacion.id, error }
      })
    )

    // Verificar si hubo errores
    const errores = resultados.filter(r => r.error)
    const exitosos = resultados.length - errores.length

    if (errores.length > 0) {
      return { 
        success: false, 
        message: `Se actualizaron ${exitosos} de ${inscripcionIds.length} asistencias`,
        actualizadas: exitosos
      }
    }

    return { 
      success: true, 
      message: "Todas las asistencias fueron confirmadas con éxito",
      actualizadas: exitosos
    }

  } catch (error) {
    console.error("Error al confirmar asistencias:", error)
    return { success: false, message: "Error al procesar las asistencias", actualizadas: 0 }
  }
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
