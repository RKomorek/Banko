"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { useAppContext } from "@/context/app.context";
import { useSidebar } from "@/components/ui/sidebar";

function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();

  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <main
        className={`flex-1 h-screen overflow-y-auto transition-all ${
          open ? "pl-64" : "pl-[72px]"
        }`}
      >
        {children}
      </main>
      <Toaster />
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, accountId } = useAppContext();

  console.log("User:", user);
  console.log("Account ID:", accountId);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {user ? (
        <SidebarProvider>
          <LayoutWithSidebar>{children}</LayoutWithSidebar>
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
