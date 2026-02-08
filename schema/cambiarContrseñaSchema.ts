import {z} from 'zod'

export const cambiarContrasenaSchema = z.object({
  contraseña: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmarContraseña: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
}).refine((data) => data.contraseña === data.confirmarContraseña, {
  path: ['confirmarContraseña'],
  message: 'Las contraseñas no coinciden',
});

export type CambiarContrasenaType = z.infer<typeof cambiarContrasenaSchema>;