import { z } from "zod";

export const postSchema = z.object({
    titulo:z.string().min(8,"El titulo debe tener al menos 3 caracteres"),
    descripcion:z.string().min(10,"La descripcion debe tener al menos 10 caracteres"),
    fecha:z.string({message:"La fecha es requerida"}),
    hora_inicio:z.string({message:"La hora de inicio es requerida"}),
    hora_fin:z.string({message:"La hora de fin es requerida"}),
    lugar:z.string({message:"El lugar es requerido"}),
    imagen_url:z.any(),
    cupos_totales:z.number({message:"El numero de cupos es requerido"}).min(1,"El numero de cupos debe ser mayor a 0"),
    recomendaciones:z.string({message:"Las recomendaciones son requeridas"}).min(10,"Las recomendaciones deben tener al menos 10 caracteres"),
    puntos_impacto:z.number({message:"Los puntos de impacto son requeridos"}).min(0,"Los puntos de impacto deben ser mayor que 0"),
    tipo_publicacion:z.enum(["evento","campaña"], {message:"El tipo de publicacion es requerido"}),
})

export type PostSchemaType = z.infer<typeof postSchema>;
