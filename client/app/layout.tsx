import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Test Project",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout ({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class">
          <>
            <Toaster toastOptions={ {
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)'
              },
            } } position="top-right" />
            <Header />
            <main>{ children }</main>
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
