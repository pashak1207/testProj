import type { Metadata } from "next";
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Project",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={ store }>{ children }</Provider>
      </body>
    </html>
  );
}
