import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BoxProps = {
  children: ReactNode;
  className?: string;
};

export default function Box({ children, className }: BoxProps) {
  return (
    <div
      className={`${twMerge("bg-slate-300 rounded-sm py-2 px-3", className)}`}
    >
      {children}
    </div>
  );
}
