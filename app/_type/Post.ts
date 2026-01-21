export type PostType ={
    id:string
    titulo:string,
    descripcion:string,
    fecha:string,
    hora_inicio:string,
    hora_fin:string,
    lugar:string,
    imagen_url:string,
    cupos_totales:number,
    cupos_disponibles:number,
    esta_inscrito:boolean,
    is_public:boolean,
    recomendaciones:string,
    estado:string,
    creado_por:string,
    created_at:string,
    updated_at:string,
    puntos_impacto:number,
    tipo_publicacion:string,
    inscritos:number,
    admin:adminPostType
    inscripcion_usuario?: { usuario_id: string }[]; 
}

export type adminPostType = {
    id:number
    nombre:string,
    email:string,
    foto_perfil:string,
    created_at:string,
    biografia:string,
}

export type RespuestaInscripcion = {
  campana_id: string;
  campaña: {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    lugar: string;
    tipo_publicacion: string;
    hora_inicio:string,
    hora_fin:string,
  } | null; 
}

