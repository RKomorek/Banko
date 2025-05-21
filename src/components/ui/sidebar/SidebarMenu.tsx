import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

export const SidebarMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open } = useSidebar();

  return (
    <ul
      className={cn("flex flex-col gap-1", !open && "items-center", className)}
    >
      {children}
    </ul>
  );
};

export const SidebarMenuItem = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  >
    {children}
  </li>
);

export const SidebarMenuButton = ({
  children,
  asChild = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  asChild?: boolean;
} & React.ComponentProps<"button">) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      className={cn(
        "flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-muted transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
