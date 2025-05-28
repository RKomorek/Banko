"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, Home, LineChart, LogOut, Repeat, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Menu items
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Transferências", url: "/login", icon: Repeat },
  { title: "Investimentos", url: "/register", icon: LineChart },
  { title: "Outros Serviços", url: "/servicos", icon: Grid },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();

  return (
    <TooltipProvider delayDuration={100}>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
                        >
                          <Icon className="h-5 w-5" />
                          {open && <span>{item.title}</span>}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <span>{item.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 w-full text-left hover:bg-muted px-2 py-1.5 rounded-md">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="@user" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                {open && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">Marcelo</p>
                    <p className="text-xs text-muted-foreground truncate">
                      marcelo@banko.bank
                    </p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
}
