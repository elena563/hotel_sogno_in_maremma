import * as React from "react";
import { cn } from "cn";

function Input({ className, name, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      name={name}
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 border border-input bg-background px-2 py-1 text-base transition-[color,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive md:text-sm dark:aria-invalid:border-b-destructive/50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
