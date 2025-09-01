
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import '@radix-ui/themes/styles.css';
// import { Theme } from '@radix-ui/themes';


const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "PYME Management System",
  description: "Sistema de gestión para pequeñas y medianas empresas",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-100 text-gray-900`}
      >
        {/* <Theme
          appearance="light"
          accentColor="blue"
          grayColor="sand"
          radius="large"
          scaling="95%"
        > */}
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar fija */}
            {/* <Sidebar /> */}

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col">
              {/* <Header /> */}
              <main className="flex-1 overflow-x-hidden overflow-y-auto  bg-sand-1 bg-red-100">
                {/* {children} */}
                  {children}

              </main>
            </div>
          </div>
        {/* </Theme> */}
      </body>
    </html>
  );
}