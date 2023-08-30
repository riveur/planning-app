import { Page, PageProps, Errors, ErrorBag } from "@inertiajs/inertia";

export type User = {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
};

export interface AuthenticatedInertiaPage extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag,
    auth: {
      user: User
    }
  }
};
