'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";


export default function RegisterFormComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Nome</Label>
            <Input id="firstName" placeholder="Seu nome" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Sobrenome</Label>
            <Input id="lastName" placeholder="Seu sobrenome" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Sua senha" required />
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
