"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/config/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function AuthFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setIsLoading(false);
      console.error("Email and password are required");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Error logging in:", error);
    } else {
      toast.success("Login bem-sucedido.", {
        description: "Você está logado com sucesso!",
      });
      console.log("Logged in successfully:", data);
      router.push("/");
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            ref={emailRef}
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Esqueceu a senha?
            </Link>
          </div>
          <Input id="password" ref={passwordRef} type="password" required />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Deseja entrar nos testes fechados?{" "}
        <Link href="/register" className="underline">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
