import "./globals.css";

import AppLayout from "@/components/appLayout";
import { AppProvider } from "@/context/app.context";
import { Lato } from "next/font/google";
import type { Metadata } from "next";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
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
      <AppProvider>
          <body className={`${lato.variable} antialiased`}>
            <AppLayout>{children}</AppLayout>
          </body>
      </AppProvider>
    </html>
  );
}
