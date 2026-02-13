import { PostType } from "@/app/_type/Post"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePost } from "@/server/campaign/actions"
import { toast } from "sonner"

interface AlertEliminarProps {
    eliminar:boolean
    Seteliminar:React.Dispatch<React.SetStateAction<boolean>>
    post:PostType

}
export default function AlertEliminar({eliminar,Seteliminar,post}:AlertEliminarProps) {
    const handleEliminar = async () => {
        try {
            const result = await deletePost(post.id)
            if (result.success) {
                Seteliminar(false)
                toast.success('Post eliminado exitosamente',{
                    style:{
                    background:"green",
                    color:"white"
                    }
                })
            } else {
                toast.error(result.message,{
                    style:{
                    background:"red",
                    color:"white"
                    }
                })
            }
        } catch (error) {
            toast.error('Error al eliminar la campaña',{
                style:{
                background:"red",
                color:"white"
                }
            })
        }
        
    }
  return (
    <AlertDialog open={eliminar} onOpenChange={Seteliminar} >
        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
            <AlertDialogTitle>¿Estas seguro que deseas eliminar este post?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta accion no se puede deshacer. Si confirmas, eliminaras el post "{post.titulo}" de tu perfil
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-500 text-white cursor-pointer">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-brand-green text-white cursor-pointer" 
            onClick={handleEliminar}>
                Eliminar
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
