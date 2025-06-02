"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function NotFoundPage() {
    const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <Image
        src="/images/404-light.webp"
        alt="404 | Página não encontrada"
        className="block dark:hidden w-40 mb-6"
        width={160}
        height={160}
      />
      <Image
        src="/images/404-dark.webp"
        alt="404 | Página não encontrada"
        className="hidden dark:block w-40 mb-6"
        width={160}
        height={160}
      />

      <p className="text-lg mb-6">Página não encontrada</p>
      <Button  onClick={() => router.push("/")} >
        Voltar para a página inicial
      </Button>
    </div>
  );
}