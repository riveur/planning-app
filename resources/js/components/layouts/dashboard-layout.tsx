import { Header } from "@/components/layouts/elements/header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Head } from "@inertiajs/react";
import { SideMenu } from "./elements/sidemenu";

export function DashboardLayout({ children, title = 'Planning' }: { children: React.ReactNode, title?: string }) {
  return (
    <>
      <Head title={title} />
      <Header />
      <div className="grid lg:grid-cols-7 h-[calc(100dvh-57px)]">
        <SideMenu className="hidden xl:block" />
        <main className="lg:col-span-7 xl:col-span-6 xl:border-l">
          <div className="container mx-auto pt-4">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  )
}


export function useDashboardLayout(title?: string) {
  return (page: React.ReactNode) => <DashboardLayout children={page} title={title} />;
}
