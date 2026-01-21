import { z } from "zod";
export const loginSchema = z.object({
  email: z.email("Correo inválido"),
  password: z.string().min(6, "La contraseña es obligatoria"),
});

export type LoginValues = z.infer<typeof loginSchema>;