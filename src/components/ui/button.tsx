import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@/components/ui/slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: shared layout, focus ring and disabled handling.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        /** Primary emerald fill — reserve for the single most important action. */
        // The fill is brand-700, not 600: white on #16a34a measured 3.3:1,
        // under the 4.5:1 WCAG AA wants for button text. #15803d gives 5.02:1.
        // Hover moves to 800 so the state change stays visible.
        primary:
          "bg-brand-700 text-white shadow-[0_8px_24px_-8px_rgb(22_163_74/0.6)] hover:bg-brand-800 hover:shadow-[0_12px_32px_-8px_rgb(22_163_74/0.7)] hover:-translate-y-0.5",
        /** Bordered, low-emphasis companion to primary. */
        outline:
          "border border-line bg-surface/60 text-ink backdrop-blur hover:border-brand-600/40 hover:bg-brand-50 hover:text-brand-700 hover:-translate-y-0.5 dark:hover:bg-brand-400/10 dark:hover:text-brand-300",
        /** No chrome until hover — for icon buttons and nav items. */
        ghost:
          "text-ink-soft hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-400/10 dark:hover:text-brand-300",
        /** Dark inverse, used on emerald backgrounds. */
        inverse:
          "bg-ink text-surface hover:bg-ink/90 hover:-translate-y-0.5 dark:bg-white dark:text-ink-900",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element instead of a <button> — e.g. wrapping an <a>. */
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
