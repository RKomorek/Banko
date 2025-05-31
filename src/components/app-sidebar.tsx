"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Grid,
  Home,
  LineChart,
  LogOut,
  Repeat,
  User,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/app.context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ui/modeToggle";

// Menu items
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Transações", url: "/transactions", icon: Repeat },
  { title: "Investimentos", url: "/investimentos", icon: LineChart },
  { title: "Outros Serviços", url: "/servicos", icon: Grid },
];
export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const { user } = useAppContext();
  const router = useRouter();

  function handleLogout() {
    // Limpa o localStorage ou sessionStorage
    localStorage.removeItem("sb-xrnhzpiwgzhjcmyiuxfv-auth-token"); // ou "token", dependendo do que você salvou
    // Redireciona o usuário
    router.replace("/login");
  }

  useEffect(() => {
    const session = localStorage.getItem("sb-xrnhzpiwgzhjcmyiuxfv-auth-token");
    if (!session) {
      router.push("/login");
    }
  }, []);

  return (
    <div
      className={cn(
        "h-screen bg-background border-r flex flex-col justify-between transition-all duration-300",
        open ? "w-64" : "w-[72px]"
      )}
    >
      {/* Header (logo + toggle) */}
      <div
        onClick={() => setOpen(!open)}
        className="p-4 flex items-center justify-center cursor-pointer"
        aria-label="Alternar menu"
      >
        {open ? (
          <>
            {/* Logo completo light/dark */}
            <Image
              src="/logo-banko-full-light.webp"
              alt="Logo Banko completo light"
              width={120}
              height={32}
              className="block dark:hidden"
              priority
            />
            <Image
              src="/logo-banko-full-dark.webp"
              alt="Logo Banko completo dark"
              width={120}
              height={32}
              className="hidden dark:block"
              priority
            />
          </>
        ) : (
          <>
            {/* Logo mini light/dark */}
            <Image
              src="/logo-banko-mini-light.webp"
              alt="Logo Banko mini light"
              width={32}
              height={32}
              className="block dark:hidden"
              priority
            />
            <Image
              src="/logo-banko-mini-dark.webp"
              alt="Logo Banko mini dark"
              width={32}
              height={32}
              className="hidden dark:block"
              priority
            />
          </>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 px-2">
        <SidebarMenu className={cn(!open && "items-center")}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    {open && <span>{item.title}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-3">
        <DropdownMenu>
          <div className="flex items-center justify-between">
            <ModeToggle />
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 w-full text-left hover:bg-muted px-2 py-1.5 rounded-md">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                {open && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">{user?.user_metadata.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </div>
    </div>
  );
}
