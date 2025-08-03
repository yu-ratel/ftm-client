import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "icon" | "input";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-md font-medium transition-colors";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-opacity-90",
    secondary: "bg-gray-100 text-primary hover:bg-gray-200",
    outline: "border border-gray-200 text-primary hover:bg-gray-50",
    icon: "rounded-full p-2 hover:bg-gray-100",
    input: "w-full rounded-md border border-gray-200 bg-gray-100/50 p-2",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const mergedClassName = twMerge(
    baseStyles,
    variantStyles[variant],
    variant !== "icon" && sizeStyles[size],
    className
  );

  return (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  );
}
