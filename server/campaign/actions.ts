"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { PostSchemaType } from "@/schema/postSchema"
import { updateSchemaPostType } from "@/schema/UpdateSchema"
import { CampanaConVoluntarios } from "@/app/_type/CampanasPorVoluntario"
import { PostType } from "@/app/_type/Post"

export const getAllPostInfo = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
        .from('campanas')
        .select('*')
        .eq('creado_por', user?.id)

    if (error) {
        console.error('Error obteniendo la camapaña:', error.message)
        return []
    }
    
    

    return data || []
}

//Obtiene la lista de post, quien lo publico y si el usuario activo esta inscrito o no en cada campaña, para mostrar el estado en el feed
export const getPostInfo = async () => {
    const supabase = await createClient()
    const [userResponse, dataResponse] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('campanas').select(`*, admin:usuarios!creado_por(
                id,
                nombre,
                email,
                biografia,
                foto_perfil,
                created_at
            ),
            inscripcion_usuario:inscripciones(usuario_id)`)
    ])
    
    if (!userResponse.data.user) {
        return []
    }
    
    if (dataResponse.error) {
        console.error('Error obteniendo las campañas:', dataResponse.error.message)
        return []
    }

    const postsConEstado = (dataResponse.data as unknown as PostType[]) || []

    return postsConEstado.map((post) => ({
        ...post,
        esta_inscrito: post.inscripcion_usuario && post.inscripcion_usuario.length > 0 || false,
    }))

    

}

export async function CrearPost(data: PostSchemaType) {
  const supabase = await createClient()
  
  const updatePortada = await uploadPortada(data.imagen_url as any)
  const imagen_url = updatePortada.success ? updatePortada.url : data.imagen_url

  try {

    const updateData = {
      ...data,
      imagen_url,
      cupos_disponibles:data.cupos_totales,
      updated_at: new Date().toISOString()
    }

    const [userResponse, dataResponse] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('campanas')
      .insert(updateData)
    ])

  
  if (!userResponse.data.user) {
    return { success: false, message: 'No autenticado' }
  }

    if (dataResponse.error) {
      console.error('Error creando la publicación:', dataResponse.error.message)
      return { success: false, message: 'Error al actualizar la portada' }
    }


    return { 
      success: true, 
      message: 'Publicación creada correctamente'
    }

  } catch (error) {
    console.error('Error general:', error)
    return { success: false, message: 'Error inesperado' }
  }
}

export async function updatePostInfo(data: updateSchemaPostType) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  
  if (!user) {
    return { success: false, message: 'No autenticado' }
  }


  try {
    let finalPortadaUrl = data.imagen_url;
    
        if (data.imagen_url instanceof File) {
          const uploadResult = await uploadPortada(data.imagen_url);
          if (!uploadResult.success) {
            throw new Error(uploadResult.message);
          }
          finalPortadaUrl = uploadResult.url; 
        } 
      
        else if (data.imagen_url === null) {
          finalPortadaUrl = null;
        }
    const updateData = {
      ...data,
      imagen_url: finalPortadaUrl,  
      updated_at: new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('campanas')
      .update(updateData)
      .eq('id', data.id)
      .eq('creado_por', user.id)

    if (updateError) {
      console.error('Error actualizando portada:', updateError)
      return { success: false, message: 'Error al actualizar la portada' }
    }

    revalidatePath('/', 'layout')

    return { 
      success: true, 
      message: 'Portada actualizado correctamente'
    }

  } catch (error) {
    console.error('Error general:', error)
    return { success: false, message: 'Error inesperado' }
  }
}

export async function uploadPortada(image: File) {
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


  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portada_post') 
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error al subir laimagen:', uploadError)
      return { success: false, message: 'Error al subir la imagen' }
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('portada_post') 
      .getPublicUrl(uploadData.path)

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

export async function publicarPost(idPublicacion:string, isPublic:boolean) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  
  if (!user) {
    return { success: false, message: 'No autenticado' }
  }
  const updateisPublic =  {
    is_public: isPublic,
  }
  
  try {
    const {error: updateError} = await supabase
      .from('campanas')
      .update(updateisPublic)
      .eq('id', idPublicacion)
      .eq('creado_por', user.id)

      if (updateError) {
        console.error('Error actualizando la publicación:', updateError.message)
        return { success: false, message: 'Error al actualizar la publicación' }
      }
      revalidatePath('/dashboard/perfil')
      return { success: true, message: 'Publicación actualizada correctamente' }
    
  } catch (error) {
      console.error('Error general:', error)
      return { success: false, message: 'Error inesperado' }
  }
}

export async function getVoluntariosPorCampana():Promise<CampanaConVoluntarios[]> {
  const supabase = await createClient()

  const { data:{user} } = await supabase.auth.getUser()

  if (!user) {
    return []
  }
  
  const { data, error } = await supabase
  .from('campanas')
  .select(`
    id,
    titulo,
    lugar,
    fecha,
    tipo_publicacion,
    inscritos,
    inscripciones (
      id,
      puntos_ganados,
      estado,
      usuario_id,
      voluntarios:usuarios!inscripciones_usuario_id_fkey (
        nombre,
        apellido,
        email,
        telefono
      )
    )
  `)
  .eq('creado_por', user.id);

  if (error) {
    console.error('Error obteniendo la campaña:', error.message)
    return []
  }
  const dataFormateada: CampanaConVoluntarios[] = (data || []).map(campana => ({
    ...campana,
    inscripciones: campana.inscripciones.map((ins: any) => ({
      id: ins.id,
      estado: ins.estado,
      puntos_ganados: ins.puntos_ganados,
      usuario_id: ins.usuario_id,
      // Tomamos el primer elemento del array que devuelve Supabase
      voluntarios: Array.isArray(ins.voluntarios) ? ins.voluntarios[0] : ins.voluntarios
    }))
  }));


  return dataFormateada 
  
}