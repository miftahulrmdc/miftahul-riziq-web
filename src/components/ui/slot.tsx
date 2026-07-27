import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal stand-in for Radix's `<Slot>`.
 *
 * Merges its own props onto its single child instead of rendering a wrapper
 * element, which is what lets `<Button asChild><a /></Button>` produce a plain
 * anchor. Implemented locally to avoid pulling in all of @radix-ui/react-slot
 * for one behaviour.
 */
export function Slot({ children, ...props }: HTMLAttributes<HTMLElement>) {
  if (!isValidElement(children)) return null;

  const child = Children.only(children) as ReactElement<HTMLAttributes<HTMLElement>>;

  return cloneElement(child, {
    ...props,
    ...child.props,
    // Own className first so the child's utilities win on conflict.
    className: cn(props.className, child.props.className),
  });
}
