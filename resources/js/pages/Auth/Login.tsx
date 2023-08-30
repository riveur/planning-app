import { LoginForm } from "@/components/forms/login-form";
import { Toaster } from "@/components/ui/toaster";
import { Head } from "@inertiajs/react";

export default function Login() {
  return (
    <>
      <Head title="Connexion" />
      <main className="flex justify-center items-center h-screen w-full">
        <LoginForm />
      </main>
      <Toaster />
    </>
  );
}
