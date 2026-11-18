import type { ReactNode } from "react";
import { toast as flootToast } from "./toast";

// Keeps the original shadcn `useToast().toast({ title, description, variant })`
// call shape, shown through the project's built-in toaster.
type ToastInput = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "destructive";
};

function toast({ title, description, variant }: ToastInput) {
  const opts = description ? { description } : undefined;
  if (variant === "destructive") return flootToast.error(title ?? "Something went wrong", opts);
  return flootToast(title ?? "", opts);
}

export function useToast() {
  return { toast, dismiss: (id?: string | number) => flootToast.dismiss(id) };
}
