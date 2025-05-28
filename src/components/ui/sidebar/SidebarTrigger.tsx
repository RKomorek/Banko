"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Alternar sidebar</span>
    </Button>
  );
}
