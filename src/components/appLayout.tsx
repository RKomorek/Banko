// components/AppLayout.tsx
'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useAppContext } from "@/context/app.context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
   const { user, loading } = useAppContext();

 if (loading) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <p>Carregando...</p>
    </div>
  );
}

  console.log("User:", user);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {user ? (
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="flex-1 min-h-screen">
              <SidebarTrigger className="ml-3 mt-3 cursor-pointer" />
              {children}
            </main>
            <Toaster />
          </div>
        </SidebarProvider>
      ) : (
        <>
          <main className="flex-1 min-h-screen">{children}</main>
          <Toaster />
        </>
      )}
    </ThemeProvider>
  );
}
