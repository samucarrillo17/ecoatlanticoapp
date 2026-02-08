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
import { LoaderCircleIcon } from "lucide-react";

export function LoginForm() {
  const router = useRouter();


  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const { handleSubmit,formState: { isSubmitting } } = form;

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
      router.refresh();
    } catch (error) {
      return error
    }
  }
    
  return (
    <Card className="border-2 border-brand-green/20 bg-brand-card md:w-150 ">
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
            <div className="flex flex-col gap-2">
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
              <div className="flex justify-end">
                <Link href="/auth/olvide-contrasena" className="text-sm hover:underline text-brand-blue">
                  Olvide mi contraseña
                </Link>
              </div>
              
            </div>
             <p className="text-center">¿Aun no tienes cuenta? <Link href="/registrate" className="text-brand-blue">Registrate</Link></p>
           <Button type="submit" className="bg-brand-blue w-full cursor-pointer h-10 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                {isSubmitting ? <LoaderCircleIcon className="animate-spin size-5" /> : "Iniciar sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
