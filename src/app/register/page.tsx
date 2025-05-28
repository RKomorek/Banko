import RegisterFormComponent from "@/components/register-form.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function SignUpForm() {
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
          <CardTitle className="text-xl">Cadastre-se</CardTitle>
          <CardDescription>
            Se registre nos testes fechados do Banko
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterFormComponent />
        </CardContent>
      </Card>
    </div>
  );
}
