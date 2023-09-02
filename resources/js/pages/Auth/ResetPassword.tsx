import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { Toaster } from "@/components/ui/toaster";
import { Head } from "@inertiajs/react";

export default function ForgotPassword({ token }: { token: string }) {
  return (
    <>
      <Head title="Réinitialisation de mot de passe" />
      <main className="container mx-auto">
        <div className="flex justify-center items-center h-screen w-full">
          <ResetPasswordForm token={token} />
        </div>
      </main>
      <Toaster />
    </>
  );
}
