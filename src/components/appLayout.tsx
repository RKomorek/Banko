'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useAppContext } from "@/context/app.context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
   const { user, accountId } = useAppContext();

  console.log("User:", user);
  console.log("Account ID:", accountId);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {user ? (
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="flex-1 min-h-screen">
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
