"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {  Edit, EllipsisVertical, Eye, Globe, Lock, Trash2, WholeWordIcon } from "lucide-react";

import { useState } from "react";
import { VerDetallesDialog } from "./VerDetallesDialog";
import { PostType } from "@/app/_type/Post";
import { EditarDialog } from "./EditarDialog";
import AlertEliminar from "./AlertEliminar";

interface PostContentProps {
  postInfo: PostType[]
}

export default function CampanasCreadas({postInfo}:PostContentProps) {
    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
    const [verDetalles, SetverDetalles] = useState(false)
    const [editar, Seteditar] = useState(false)
    const [eliminar, Seteliminar] = useState(false)

  const handleVerDetalles =(post:PostType) => {
    setSelectedPost(post)
    SetverDetalles(true)
  }
   const handleEditar =(post:PostType) => {
    setSelectedPost(post)
    Seteditar(true)
  }
   const handleDelete =(post:PostType) => {
    setSelectedPost(post)
    Seteliminar(true)
  }
  
  return (
    <div className="text-brand-balance space-y-4">
      <h1 className="text-lg font-bold text-center">Tus campañas </h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 py-6">
        {postInfo.map((post) => (
          <Card key={post.id} className="gap-4 border-2 border-black/10">
            <CardHeader>
                <div className="flex justify-between">
                    <h2 className="font-semibold text-lg">
                        {post.titulo}
                    </h2>
                    {post.is_public ? (
                      <Globe className="size-5 text-brand-blue" />
                    ) :(
                      <Lock className="size-5 text-gray-400" />
                    )
                    }
                    
                </div>
              <CardDescription>
                <p>{post.descripcion}</p>
              </CardDescription>

              <div className="flex gap-2 py-3 border-b border-black/5 text-xs">

              {
                post.tipo_publicacion === "evento" && (
                  <Badge
                  className="bg-[#fcfee8] text-[#a8b05f] border-[#f8fbd0]"
                  >
                    Evento
                  </Badge>
                )
              }
              {
                post.tipo_publicacion === "campaña" && (
                  <Badge
                  className="bg-[#f5f3dc] text-[#8a8c4e] border-[#ebe9c3]"
                  >
                    Campaña
                  </Badge>
                )
              }
              {
                post.estado === "programado" && (
                  <Badge
                  className="bg-[#d4e8e9] text-brand-blue border-[#a8d1d3]"
                  >
                    Programado
                  </Badge>
                )
              }

              {
                post.estado === "en curso" && (
                  <Badge
                  className="bg-[#e5f2e3] text-[#4a7f45] border-[#b8dbb5]"
                  >
                    Programado
                  </Badge>
                )
              }

              {
                post.estado === "completado" && (
                  <Badge
                  className="bg-gray-100 text-gray-600 border-gray-300"
                  >
                    Programado
                  </Badge>
                )
              }
              </div>
            </CardHeader>

            <CardContent className="gap-3 flex flex-col text-sm">
                <div className="flex justify-between">
                    {post.is_public ? (
                        <span className="flex items-center gap-1 text-xs ">
                          <span className="w-2 h-2 bg-green-500 rounded-full  animate-pulse"></span>
                          Publicada
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs ">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          No publicada
                        </span>
                      )}

                    <DropdownMenu >
                        <DropdownMenuTrigger>
                            <EllipsisVertical  className="size-5 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-zinc-50 text-brand-balance'>  
                            <DropdownMenuItem className='hover:bg-black/10 cursor-pointer' onClick={()=>handleVerDetalles(post)}>
                                <Eye className="size-4" />
                                Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-black/10 cursor-pointer' onClick={()=>handleEditar(post)}>
                                <Edit className="size-4" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-red-500/10 cursor-pointer' onClick={()=>handleDelete(post)}>
                                <Trash2 className="size-4 text-red-500" />
                                Eliminar                          
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
  
                </div>
            </CardContent>
          </Card>
        ))}
           {selectedPost && (
            <VerDetallesDialog
              verDetalles={verDetalles}
              SetVerDetalles={SetverDetalles}
              post={selectedPost}
            />
          )}

          {selectedPost && (
            <EditarDialog
              editar={editar}
              Seteditar={Seteditar}
              post={selectedPost}
            />
          )}

          {selectedPost && (
            <AlertEliminar
              eliminar={eliminar}
              Seteliminar={Seteliminar}
              post={selectedPost}
            />
          )}
      </div>
    </div>
  );
}
