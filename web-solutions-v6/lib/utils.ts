import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** House easing — a long, expensive-feeling ease-out used everywhere. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
