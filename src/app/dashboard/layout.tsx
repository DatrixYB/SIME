'use client'
import { Theme } from '@radix-ui/themes';
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { UserProvider } from "@/hooks/context/user-context";
import { HeaderMovil } from "@/components/dashboard/headerMovil";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme appearance="light" accentColor="blue" grayColor="sand" radius="large" scaling="95%">
      <UserProvider>
        <div className="flex h-screen overflow-hidden">
          <div className="hidden md:flex">
            <Sidebar />
          </div>
          <div className="flex md:hidden">
            <HeaderMovil />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </UserProvider>
    </Theme>
  );
}