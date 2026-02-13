import { FeedPost } from '@/components/inicio/feed-post'
import { ListFilter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Main } from 'next/document'
import { MainInicio } from '@/components/inicio/MainInicio'
import { Suspense } from 'react'
import { SkeletonPost } from '@/components/inicio/SkeletonPost'




export default async function page() {
  return (
    <div>
      <main className="mx-auto max-w-3xl space-y-3">
        {/* <div className='flex justify-between px-4 items-center'>
          <span className='text-sm text-gray-400'>Resultados (24)</span>
          <DropdownMenu>
              <DropdownMenuTrigger className='bg-brand-blue text-white cursor-pointer hover:bg-brand-blue/80 p-2 flex items-center gap-2 rounded-md text-sm'>
                  <ListFilter className='cursor-pointer size-4 '/>
                  Filtrar
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white text-brand-balance'>

                  <DropdownMenuItem className='hover:bg-black/10 cursor-pointer'>
                    Campañas
                  </DropdownMenuItem>
                 
                  <DropdownMenuItem className='hover:bg-black/10 cursor-pointer'>
                      Eventos
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-black/10 cursor-pointer'>
                      Cerca de mi
                  </DropdownMenuItem>
                  
              </DropdownMenuContent>
            </DropdownMenu>

        </div> */}
        <Suspense fallback={<SkeletonPost />}>
          <MainInicio />
        </Suspense>
      </main>
    </div>
  )
}
