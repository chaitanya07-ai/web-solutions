import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-paper shadow-soft hover:bg-gold hover:text-ink hover:shadow-lift",
        gold: "bg-gold text-ink shadow-soft hover:bg-paper hover:shadow-lift",
        outline:
          "border border-line bg-transparent text-ink hover:border-gold hover:text-gold-deep",
        outlineLight:
          "border border-paper/25 bg-transparent text-paper hover:border-gold hover:text-gold",
        ghost: "text-ink hover:text-gold-deep",
      },
      size: {
        default: "h-12 px-7",
        lg: "h-14 px-9 text-[15px]",
        sm: "h-10 px-5 text-[13px]",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

/** Anchor styled as a button — used for tel:, wa.me, booking links. */
const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <a
    className={cn(buttonVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
));
ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants };
