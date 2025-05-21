import { useSidebar } from './SidebarContext';
export const Sidebar = () => {
  const { open } = useSidebar();
  return (
    <aside data-state={open ? 'expanded' : 'collapsed'}>
      Sidebar content
    </aside>
  );
};