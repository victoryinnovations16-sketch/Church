import { clsx, type ClassValue } from "clsx";
import { twMerge } from "./twMerge";

export function cn(...inputs: ClassValue[]) {
  return (twMerge as (...classLists: string[]) => string)(clsx(inputs));
}
