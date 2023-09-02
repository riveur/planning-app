import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SideMenu } from "./sidemenu";

export function SideMenuMobile() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onResize = (event: UIEvent) => {
      if (window.innerWidth > 1280 && open) {
        setOpen(false);
      }
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [open]);


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden">
          <MenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0 w-[250px] md:w-[300px]" side="left">
        <SideMenu onChangePage={setOpen} />
      </SheetContent>
    </Sheet>
  );
}