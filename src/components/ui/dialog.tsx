"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  children,
  className,
  ...props
}: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=closed]:animate-none data-[state=open]:animate-[fadeIn_500ms_ease]" />
      <DialogPrimitive.Content
        className={cn(
          "editorial-card fixed left-1/2 top-1/2 z-50 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 p-8 data-[state=open]:animate-[dialogIn_600ms_cubic-bezier(0.22,1,0.36,1)]",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Close className="absolute right-5 top-5 text-[var(--muted)] transition hover:text-[var(--foreground)]">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
