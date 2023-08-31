import { cn } from "@/lib/utils";
import React from "react";
import Select from "react-select";

const MultiSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select>
>(({ className, isMulti, unstyled, ...props }, ref) => {
  return (
    <Select
      ref={ref}
      {...props}
      isMulti
      unstyled
      className="imp"
      classNames={{
        container(state) {
          return cn("flex w-full items-center justify-between");
        },
        valueContainer(state) {
          return cn("flex gap-2");
        },
        control(state) {
          return cn("flex w-full items-center justify-between rounded-md border border-input bg-background p-2 text-sm ring-offset-background placeholder:text-muted-foreground",
            state.isFocused && "outline-none ring-2 ring-ring ring-offset-2",
            state.isDisabled && "cursor-not-allowed opacity-50"
          );
        },
        menu(state) {
          return cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          );
        },
        menuList(state) {
          return cn("p-1");
        },
        option(state) {
          return cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            state.isFocused && "bg-accent text-accent-foreground"
          );
        },
        multiValue(state) {
          return cn("px-2 py-1 border rounded-md flex items-center gap-1")
        }
      }}
    />
  );
});

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };