import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Imagem conforme tema */}
      <Image
        src="/images/404-light.webp"
        alt="404 | Página não encontrada"
        width={160}
        height={160}
        className="block dark:hidden mb-6"
      />
      <Image
        src="/images/404-dark.webp"
        alt="404 | Página não encontrada"
        width={160}
        height={160}
        className="hidden dark:block mb-6"
      />

      <p className="text-lg mb-6">Página não encontrada</p>
      <Link href="/" className="underline hover:text-primary transition-all" aria-label="Voltar para a página inicial">
        Voltar para a página inicial
      </Link>
    </main>
  );
}