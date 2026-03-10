import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ContainerElement = "div" | "section" | "nav" | "header" | "footer" | "main";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: ContainerElement;
  children: ReactNode;
};

export function Container({
  as: Component = "div",
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
