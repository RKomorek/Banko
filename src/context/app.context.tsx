"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/config/supabaseClient";
import type { User } from "@supabase/supabase-js";

type AppContextType = {
  user: User | null;
  loading: boolean;
  accountId: string | null;
  saldo: number;
  setSaldo: (saldo: number) => void;
};

const AppContext = createContext<AppContextType>({
  user: null,
  loading: true,
  accountId: null,
  saldo: 0,
  setSaldo: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [saldo, setSaldo] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getSession = async () => {
      try {
        console.log('🔍 Iniciando verificação de sessão...');
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erro ao obter sessão:', error);
          setLoading(false);
          return;
        }

        const currentUser = data.session?.user ?? null;
        setUser(currentUser);
        setLoading(false);

        if (currentUser) {
          console.log('👤 Usuário encontrado:', currentUser.email);
          
          // Busca o id do usuário na tabela users
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id")
            .eq("auth_user_id", currentUser.id)
            .single();

          if (userError) {
            console.error("❌ Erro ao buscar usuário:", userError.message);
          } else {
            console.log('✅ Usuário encontrado na tabela users');
            
            // Busca o account_id na tabela accounts
            const { data: accountData, error: accountError } = await supabase
              .from("accounts")
              .select("id")
              .eq("user_id", userData.id)
              .single();

            if (accountError) {
              console.error("❌ Erro ao buscar conta:", accountError.message);
            } else {
              console.log('✅ Conta encontrada:', accountData.id);
              setAccountId(accountData.id);
            }
          }
        } else {
          console.log('👤 Nenhum usuário logado');
        }

        // Redireciona se não estiver logado e tentando acessar rota protegida
        const isProtectedRoute = ["/", "/dashboard"].includes(pathname);
        if (!data.session && isProtectedRoute) {
          console.log('🔄 Redirecionando para login...');
          router.replace("/login");
        }
      } catch (error) {
        console.error('❌ Erro geral no getSession:', error);
        setLoading(false);
      }
    };

    getSession();

    // opcional: escuta mudanças no auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('🔄 Mudança no estado de autenticação:', _event);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return (
    <AppContext.Provider value={{ user, loading, accountId, saldo, setSaldo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
