import { PropsWithChildren } from "react";

interface TextProps extends PropsWithChildren {
  className?: string;
}

export const Text = ({ children, className = "" }: TextProps) => (
  <p className={`text-base text-gray-700 leading-relaxed ${className}`}>
    {children}
  </p>
);
