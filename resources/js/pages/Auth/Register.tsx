import { RegisterForm } from "@/components/forms/register-form";
import { Toaster } from "@/components/ui/toaster";
import { Head } from '@inertiajs/react';

export default function Login() {
  return (
    <>
      <Head title="Créer un compte" />
      <main className="flex justify-center items-center h-screen w-full">
        <RegisterForm />
      </main>
      <Toaster />
    </>
  );
}
