export type CampañaConVoluntarios = {
    id: string
    titulo: string,
    lugar: string,
    fecha: string,
    tipo_publicacion: string,
    inscritos: number,
    inscripciones: InscripcionConVoluntario[]
}

export type InscripcionConVoluntario = {
    id: string;
    usuario_id: string,
    voluntarios: User
    estado: string
}

type User = {
    id?: string
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
}

