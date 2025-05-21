'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AuthFormComponent() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form >
      <div className="grid gap-4">
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
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Esqueceu a senha?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Deseja entrar nos testes fechados?{" "}
        <Link href="/sign-up" className="underline">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
