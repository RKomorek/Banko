"use client";

import * as React from "react";

type SidebarContextProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  isReady: boolean;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpenState] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);

  const setOpen = (value: boolean) => {
    setOpenState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-open", String(value));
    }
  };

  const toggleSidebar = () => setOpen(!open);

  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar-open");
    if (saved !== null) {
      setOpenState(saved === "true");
    }
    setIsReady(true);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar, isReady }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
