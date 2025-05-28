import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";


const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "Banko",
  description: "Controle suas finanças!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${lato.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Cabeçalho */}
          <header className="flex items-center justify-between bg-card text-card-foreground p-4 shadow-sm">
            <h1 className="text-2xl font-bold">Banko</h1>
                      <ModeToggle />

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Olá, Carol</span>
              <Avatar>
                <AvatarImage src="/avatar.png" alt="Carol" />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
            </div>
          </header>
          {/* Conteúdo da página */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html >
  );
}
