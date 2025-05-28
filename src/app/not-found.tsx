export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Imagem conforme tema */}
      <img
        src="/images/404-light.webp"
        alt="404 | Página não encontrada"
        className="block dark:hidden w-40 mb-6"
      />
      <img
        src="/images/404-dark.webp"
        alt="404 | Página não encontrada"
        className="hidden dark:block w-40 mb-6"
      />

      <p className="text-lg mb-6">Página não encontrada</p>
      <a href="/" className="underline hover:text-primary transition-all">
        Voltar para a página inicial
      </a>
    </div>
  );
}
