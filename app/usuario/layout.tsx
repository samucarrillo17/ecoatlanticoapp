import { FeedHeader } from "@/components/inicio/feed-header";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-3xl mx-auto">
    <FeedHeader/>
    <main className="pt-4 pb-10"> 
        {children}
      </main>
    
    </div>
  );
}