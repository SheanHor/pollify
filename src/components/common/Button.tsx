import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const variantTypes = {
  primary:
    "bg-[#534B45] text-white border-transparent hover:bg-[#CCCAC8]/90 transition-colors",
  secondary:
    "bg-[#fff] text-color-text-primary border-[1px] hover:bg-[#4D99CE]/10 transition-colors",
  link: "bg-transparent text-[#4D99CE] border-transparent hover:bg-transparent md:px-0",
  error:
    "bg-[#EB001B] text-white border-transparent hover:bg-[#EB001B]/80 transition-colors ",
};

const sizesTypes = {
  small: "px-3 py-1.5",
  medium: "px-5 py-3",
  large: "px-8 py-4",
};

export default function Button({
  variant = "primary",
  size = "medium",
  onClick,
  className,
  loading,
  rounded,
  disabled,
  isFull,
  children,
}: {
  variant?: "primary" | "secondary" | "link" | "error";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  loading?: boolean;
  rounded?: boolean;
  classname?: string;
  isFull?: boolean;
  children: React.ReactNode;
} & JSX.IntrinsicElements["button"]) {
  const variantStyle = useMemo(() => variantTypes[variant], [variant]);
  const sizeStyle = useMemo(() => sizesTypes[size], [size]);

  const style = twMerge(
    "px-4 md:px-10 flex justify-center gap-2 items-center rounded-md border-2 duration-200",
    isFull ? "w-full" : "w-full md:w-auto",
    rounded ? "rounded-[30px]" : "rouded-md",
    variantStyle,
    sizeStyle,
    className,
    disabled || loading ? "opacity-50 cursor-not-allowed" : ""
  );

  return (
    
      <button
      type="button"
      onClick={() => {
          if (!disabled && !loading && onClick) {
          onClick();
          }
      }}
      className={style}
      disabled={disabled || loading}
      >
      {children}
      </button>
    
  );
}