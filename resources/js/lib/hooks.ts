import { AuthenticatedInertiaPage } from "@/types";
import { usePage } from "@inertiajs/react";

export function useUser() {
  const { props: { auth: { user }, can: authorizations } } = usePage() as AuthenticatedInertiaPage;

  const can = (authorization: keyof AuthenticatedInertiaPage['props']['can']) => {
    return authorizations[authorization];
  }

  return { user, can };
}