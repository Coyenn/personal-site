import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

function PageIntroFrame({ className, ...props }: ComponentProps<"header">) {
  return <header className={cn("my-12", className)} {...props} />;
}

function PageIntroTitle({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={cn("text-primary", className)} {...props} />;
}

function PageIntroSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-foreground", className)}>{children}</p>;
}

function PageIntroTime({ className, ...props }: ComponentProps<"time">) {
  return <time className={cn("block text-secondary-foreground", className)} {...props} />;
}

export const PageIntro = {
  Frame: PageIntroFrame,
  Subtitle: PageIntroSubtitle,
  Time: PageIntroTime,
  Title: PageIntroTitle,
};
