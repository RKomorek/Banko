import AuthFormComponent from "@/components/auth-form.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login - Banko",
  description: "Entre na sua conta para acessar sua gestão financeira.",
};

export default function LoginForm() {
  return (
    <div className="min-h-screen content-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <Image
            src="/logo-banko-full-dark.webp"
            width={90}
            height={90}
            alt="Logo do Banko"
            className="overflow-hidden rounded-full mx-auto"
          />
          <CardTitle className="text-2xl">Bem-vindo ao Banko</CardTitle>
          <CardDescription>
            Controle suas finanças de forma fácil e intuitiva
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthFormComponent />
        </CardContent>
      </Card>
    </div>
  );
}
