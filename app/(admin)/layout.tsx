import { AppSidebar } from "@/components/admin/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserType } from "../_type/User";
import { getAuthProfile } from "../_helper/user-info";


export default async function RootLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile:UserType = await getAuthProfile()
  if (!profile) {return}
  const nombreApellido = profile?.nombre + " " + profile?.apellido
  return (
    <SidebarProvider className="">
      <AppSidebar nombreApellido={nombreApellido} profilePhoto={profile?.foto_perfil} />
      <main className=" text-brand-balance w-full">
        <SidebarTrigger className="cursor-pointer " />
        <div className="px-10 py-2 ">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}