"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { registerUser } from "@/services/users.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      console.error("Todos os campos são obrigatórios");
      setIsLoading(false);
      return;
    }

    const user = {
      email,
      password,
      name: `${firstName} ${lastName}`,
    };

    const { error } = await registerUser(user);

    if (error) {
      toast.error("Erro ao registrar. Verifique suas informações.");
      console.error("Erro ao registrar:", error.message);
    } else {
      toast.success("Usuário registrado com sucesso.", {
        description: "Agora faça a verificação no email para poder logar.",
      });
      router.push("/login");
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Nome</Label>
            <Input id="firstName" ref={firstNameRef} placeholder="Seu nome" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Sobrenome</Label>
            <Input id="lastName" ref={lastNameRef} placeholder="Seu sobrenome" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            ref={emailRef}
            type="email"
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="Sua senha"
            required
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Criar conta
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="underline">
          Entrar
        </Link>
      </div>
    </form>
  );
}
