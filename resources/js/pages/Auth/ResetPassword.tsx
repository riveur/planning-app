import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { Toaster } from "@/components/ui/toaster";
import { Head } from "@inertiajs/react";

export default function ForgotPassword({ token }: { token: string }) {
  return (
    <>
      <Head title="Réinitialisation de mot de passe" />
      <main className="flex justify-center items-center h-screen w-full">
        <ResetPasswordForm token={token} />
      </main>
      <Toaster />
    </>
  );
}
