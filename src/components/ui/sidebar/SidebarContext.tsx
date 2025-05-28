'use client';
import * as React from 'react';
type SidebarContextProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextProps | null>(null);
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const toggleSidebar = () => setOpen(!open);
  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}