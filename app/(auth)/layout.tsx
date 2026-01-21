import { ArrowLeft, Waves } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-brand-yellow/10 ">
    <div className="max-w-6xl mx-auto px-4 space-y-10 py-6  ">
        <div className="flex justify-between">
          <Link href={"/"} className="text-brand-blue flex items-center gap-2">
            <ArrowLeft className="size-7 " />
            <h1 className="font-semibold">Atrás</h1>
          </Link>
          <div className="text-brand-blue flex items-center gap-2">
            <Waves className="size-7"  />
            <h1 className="font-semibold">EcoAtlántico</h1>
          </div>
        </div>
        
    </div>
    {children}
    </div>
  );
}