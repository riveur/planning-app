import { Header } from "@/components/layouts/elements/header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Head } from "@inertiajs/react";

export function DashboardLayout({ children, title = 'Planning' }: { children: React.ReactNode, title?: string }) {
    return (
        <>
            <Head title={title} />
            <Header />
            {children}
            <Toaster />
        </>
    )
}
