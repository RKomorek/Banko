'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/config/supabaseClient';
import type { User } from '@supabase/supabase-js';

type AppContextType = {
  user: User | null;
  loading: boolean;
};

const AppContext = createContext<AppContextType>({
  user: null,
  loading: true,
});
  
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);

      // Redireciona se não estiver logado e tentando acessar rota protegida
      const isProtectedRoute = ['/', '/dashboard'].includes(pathname);
      if (!data.session && isProtectedRoute) {
        router.replace('/login');
      }
    };

    getSession();

    // opcional: escuta mudanças no auth
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [pathname]);

  return (
    <AppContext.Provider value={{ user, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
