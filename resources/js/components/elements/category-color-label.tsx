import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

type CategoryColorLabelProps = ComponentPropsWithoutRef<"span"> & {
  color?: string;
  children?: React.ReactNode
}

export const CategoryColorLabel = ({ color, children, className, ...props }: CategoryColorLabelProps) => {
  return (
    <span
      style={{ backgroundColor: color }}
      {...props}
      className={cn('px-2 py-1 rounded-sm', className, !color && 'bg-accent')}
    >
      {children}
    </span>
  );
}