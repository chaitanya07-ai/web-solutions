import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  BrowserFrame — a refined macOS-style browser chrome                */
/* ------------------------------------------------------------------ */

export function BrowserFrame({
  url,
  children,
  className,
  dark = false,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-lift",
        dark ? "border-white/10 bg-[#141310]" : "border-line bg-white",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark ? "border-white/10 bg-[#1B1A16]" : "border-line bg-mist"
        )}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8E5DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8E5DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        </div>
        <div
          className={cn(
            "mx-auto flex w-1/2 min-w-40 items-center justify-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide",
            dark
              ? "border-white/10 bg-white/5 text-white/50"
              : "border-line bg-white text-ink-faint"
          )}
        >
          <Lock className="h-2.5 w-2.5 text-gold-deep" />
          {url}
        </div>
        <div className="w-10" aria-hidden />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PhoneFrame — minimal handset shell for the chatbot demo            */
/* ------------------------------------------------------------------ */

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[380px] overflow-hidden rounded-[2.6rem] border border-line bg-white shadow-lift",
        className
      )}
    >
      <div className="absolute left-1/2 top-3 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
      {children}
    </div>
  );
}
