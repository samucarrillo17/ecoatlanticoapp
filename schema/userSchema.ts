
import {z} from 'zod'

export const userSchema = z.object({
  nombre: z.string().min(2, "Ingresa un nombre válido"),
  email: z.email().min(5, "Ingresa un email válido"),
  apellido: z.string().min(2, "Ingresa un apellido válido"),
  telefono: z.string().min(10, "Ingresa un número de telefono válido").max(15, "Ingresa un número de telefono válido"),
  universidad: z.enum(["Universidad Simon Bolivar","Universidad de la Costa","Universidad Autonoma","Universidad Metropolina","Universidad Libre"],{message:"Selecciona una universidad"}),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmarContraseña: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
}).refine((data) => data.password === data.confirmarContraseña, {
  path: ['confirmarContraseña'],
  message: 'Las contraseñas no coinciden',
});

export type User = z.infer<typeof userSchema>;
export const defaultValues = {
    nombre: "",
    email: "",
    apellido: "",
    telefono: "",
    universidad: undefined,
    password: "",
    confirmarContraseña: "",

}