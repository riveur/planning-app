import { UserNav } from "@/components/layouts/elements/user-nav";
import { useUser } from "@/lib/hooks";
import { SideMenuMobile } from "./sidemenu-mobile";

export function Header() {
  const { user } = useUser();
  return (
    <header className="w-full p-2 border-b flex items-center justify-between xl:justify-end">
      <SideMenuMobile />
      <UserNav username={user.fullname} />
    </header >
  );
}