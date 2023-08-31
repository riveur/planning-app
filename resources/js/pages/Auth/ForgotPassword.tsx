import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { Toaster } from "@/components/ui/toaster";
import { Head } from "@inertiajs/react";

export default function ForgotPassword() {
  return (
    <>
      <Head title="Mot de passe oublié" />
      <main className="flex justify-center items-center h-screen w-full">
        <ForgotPasswordForm />
      </main>
      <Toaster />
    </>
  );
}
