import { Header } from "@/components/layouts/elements/header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Head } from "@inertiajs/react";

export function DashboardLayout({ children, title = 'Planning' }: { children: React.ReactNode, title?: string }) {
  return (
    <>
      <Head title={title} />
      <Header />
      <main className="container mx-auto pt-4">
        {children}
      </main>
      <Toaster />
    </>
  )
}


export function useDashboardLayout(title?: string) {
  return (page: React.ReactNode) => <DashboardLayout children={page} title={title} />;
}
