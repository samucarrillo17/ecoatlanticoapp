"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { loginAction } from "@/server/auth/actions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginSchema, LoginValues } from "@/schema/loginSchema";
import { toast } from "sonner";

export function LoginForm() {


  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const { handleSubmit } = form;

  const onSubmitLogin = async (values: LoginValues) => {
    const { email, password } = values;
    try {
      const result = await loginAction(email, password);
      if(!result.success){
        toast.error("Inicio de sesión fallido",{
                description: result.message,
                duration: 2000,
                style:{
                    background: "red",
                    color: "white",
                }
            })
      }
    } catch (error) {
      
    }
  }
    
  return (
    <Card className="border-2 border-brand-green/20 bg-brand-card">
      <CardHeader>
        <CardTitle className="text-brand-balance text-2xl">
          Iniciar sesión
        </CardTitle>
        <CardDescription className="text-brand-balance text-sm">
          Inicia sesión en tu cuenta para acceder a tus datos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-balance">
                    Correo electronico
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-brand-green/30 focus:ring-brand-green/20 h-12  "
                      placeholder="ejemplo@universidad.edu.co"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-balance">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-brand-green/30 focus:ring-brand-green/20 h-12 "
                      type="password"
                      placeholder="Contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
             <p className="text-center">¿Aun no tienes cuenta? <Link href="/registrate" className="text-brand-blue">Registrate</Link></p>
            <Button
              className="bg-brand-green text-white w-full rounded-2xl cursor-pointer hover:bg-brand-green/90"
              type="submit"
            >
                Iniciar sesión
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
