"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  UpdateSchema,
  UpdateUser,
} from "@/schema/UpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {  Camera, Edit, EllipsisVertical, LoaderCircleIcon, LogOut, Moon, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { UserType } from "@/app/_type/User";
import { updateUserProfile, uploadAvatar } from "@/server/user/actions";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from "next/link";
import { logout, resetEmailPasswordConfirmation } from "@/server/auth/actions";
import { FormController } from "../FormController";
import { SelectWrapper } from "../SelectWrapper";
import { Field, FieldError } from "../ui/field";

interface UpdateUserProps {
  profile: UserType
}
export function DrawerUpdate({ profile }: UpdateUserProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.foto_perfil);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false);

  const nombreApellido = profile?.nombre + " " + profile?.apellido;


  const form = useForm<UpdateUser>({
    defaultValues: {
      foto_perfil: profile?.foto_perfil || "",
      nombre: profile?.nombre || "",
      apellido: profile?.apellido || "",
      email: profile?.email || "",
      telefono: profile?.telefono || "",
      universidad: profile?.universidad as any,
    },
    resolver: zodResolver(UpdateSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (values: UpdateUser) => {
    try {
      const result = await updateUserProfile(values)

      if (result.success) {
        setAvatarFile(null)
        
        toast.success("Perfil actualizado correctamente",{
        style:{
          background:"green",
          color:"white"
        }
      })
        setOpen(false);
      } else {
        alert(result.message)
      }

    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar el perfil')
    }

  };

  const HandleUpdatePassword = async() => {
    const result = await resetEmailPasswordConfirmation()
    if(!result){
      toast.error("No se ha podido enviar el correo electrónico",{
        style:{
          background:"red",
          color:"white"
        }
      })
      return
    }
    toast.success("Solicitud enviada",{
      description: "Verifica tu correo electrónico para cambiar tu contraseña",
      style:{
        background:"green",
        color:"white"
      }
    })
  }

  const universities = [
    "Universidad Simon Bolivar",
    "Universidad de la costa",
    "Universidad Autonoma",
    "Universidad metropolina",
    "Universidad Libre",
  ];
  return (

    <Sheet open={open} onOpenChange={setOpen}>
      <DropdownMenu >
                    <DropdownMenuTrigger>
                        <EllipsisVertical  className="size-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-zinc-50 text-brand-balance' align="end">  
                        <DropdownMenuItem className='hover:bg-black/10 cursor-pointer'>
                            <Moon className="size-4" />
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem className='hover:bg-black/10 cursor-pointer'>
                            <SheetTrigger className="cursor-pointer flex items-center gap-2">
                              <Edit className="size-4 text-brand-balance" />
                              Editar perfil
                          </SheetTrigger>
                        </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-red-500/10 cursor-pointer' onClick={logout}>
                                <LogOut className="size-4 text-red-400" />
                                Salir
                            </DropdownMenuItem>
                    </DropdownMenuContent>
      </DropdownMenu>
        
      <SheetContent className="bg-white p-2">

        <ScrollArea className="h-full">

        <SheetHeader className="p-0 my-4 flex-row items-center gap-2">
          <Edit className="size-4 text-brand-green" />
          <SheetTitle>Actualiza tu perfil</SheetTitle>
        </SheetHeader>

        
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-2">
            <Controller
              control={form.control}
              name="foto_perfil"
              render={({ field: { onChange,ref, ...field },fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="size-24">
                        <AvatarImage src={avatarPreview || "/placeholder.svg"} className="object-cover" />
                        <AvatarFallback className="bg-gray-200 text-2xl font-semibold">
                          {nombreApellido

                              ?.split(" ")

                              .map((n: string) => n[0])

                              .join("")
                            }
                        </AvatarFallback>
                      </Avatar>

                      {avatarPreview ? (
                        <Button
                          type="button"
                          onClick={() => {
                            setAvatarPreview(null);
                            setAvatarFile(null);
                            onChange(null);
                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                          className="cursor-pointer"
                        >
                          <Trash2 className="size-5 text-red-500" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="cursor-pointer"
                        >
                          <Camera className="size-5 text-brand-green" />
                        </Button>

                      )}
                      <Input
                          ref={(e) => {
                            ref(e); // Le damos la referencia a React Hook Form
                            fileInputRef.current = e; // Y también a nuestra propia ref para el click()
                          }}
                          type="file"
                          accept="image/*"
                          className="cursor-pointer hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            if (file.type && !file.type.startsWith('image/')) {
                              form.setError('foto_perfil', { message: 'El archivo debe ser una imagen' });
                              return;
                            }

                            if (file.size > 5 * 1024 * 1024) {
                              form.setError('foto_perfil', { message: 'La imagen no puede superar 5MB' });
                              return;
                            }

                            form.clearErrors('foto_perfil');
                            setAvatarFile(file);

                            const reader = new FileReader();
                            reader.onloadend = () => setAvatarPreview(reader.result as string);
                            reader.readAsDataURL(file);

                            onChange(file);
                          }}
                        />
                    </div>
                  {fieldState.invalid && <FieldError className="text-red-500 text-sm" errors={[fieldState.error]} />}
             
                </Field>
              )}
            />

            <FormController
              name="nombre"
              control={form.control}
              as={Input}
              label="Nombre"
              inputProps={{
                  className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
              }}
          />

            <FormController
              name="apellido"
              control={form.control}
              as={Input}
              label="Apellido"
              inputProps={{
                  className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
              }}
          />

            <FormController
              name="email"
              control={form.control}
              as={Input}
              label="Correo"
              inputProps={{
                  className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
              }}
          />

            <FormController
              name="telefono"
              control={form.control}
              as={Input}
              label="Telefono"
              inputProps={{
                  type:"number",
                  className: "border-brand-green/30  focus:ring-brand-green/20 h-10 "
              }}
          />
            <FormController
              name="universidad"
              control={form.control}
              as={SelectWrapper}
              label="Universidad"
              inputProps={{
                  options:universities.map((university) => ({
                    label: university,
                    value: university,
                  }))
              }}
          />
            <Button className="bg-brand-green text-white cursor-pointer" type="button" onClick={HandleUpdatePassword}>
              Cambiar contraseña
            </Button>
            <SheetFooter>
              <Button type="submit" className="bg-brand-blue w-full cursor-pointer h-10 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                  {isSubmitting ? <LoaderCircleIcon className="animate-spin size-5" /> : "Guardar"}
              </Button>
              <SheetClose asChild>
                <Button className="bg-red-400 text-white cursor-pointer">Cerrar</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        

      </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
