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
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {  Camera, Edit, EllipsisVertical, LogOut, Moon, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { UserType } from "@/app/_type/User";
import { updateUserProfile, uploadAvatar } from "@/server/user/actions";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from "next/link";
import { logout } from "@/server/auth/actions";

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
    formState: { errors },
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
    } finally {
      // setLoading(false)
    }

  };

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

        <Form {...form} >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-2">
            <FormField
              control={form.control}
              name="foto_perfil"
              render={({ field: { onChange,ref, ...field } }) => (
                <FormItem>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-balance">
                    ¿Como te llamas?
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-brand-green/30  focus:ring-brand-green/20 "
                      placeholder="Nombre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-balance">
                    ¿Cual es tu apellido?
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-brand-green/30  focus:ring-brand-green/20 "
                      placeholder="Apellido"
                      {...field}
                   
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                      className="border-brand-green/30 focus:ring-brand-green/20  "
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
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-balance">
                    Numero de contacto
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-brand-green/30  focus:ring-brand-green/20"
                      type="number"
                      placeholder="ej: 3502454567"
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="universidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Universidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-brand-green/30 w-full focus:ring-brand-green/20">
                        <SelectValue placeholder="Selecciona una universidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-brand-balance">
                      {universities.map((university, index) => (
                        <SelectGroup key={index}>
                          <SelectItem
                            value={university}
                            className="hover:bg-black/5"
                          >
                            {university}
                          </SelectItem>
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit" className="cursor-pointer bg-brand-blue text-white">Save changes</Button>
              <SheetClose asChild>
                <Button className="bg-red-400 text-white cursor-pointer">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>

      </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
