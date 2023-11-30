import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = JSX.IntrinsicElements["input"] & {
  label?: string;
  labelClassname?: string;
  error?: string;
  helperMsg?: string;
  helperMsgClassname?: string;
  helperMsgIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
};

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      className,
      disabled,
      required,
      label,
      error,
      labelClassname,
      helperMsg,
      helperMsgClassname,
      helperMsgIcon,
      prefix,
      suffix,
      ...rest
    } = props;
    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={rest.id}
            className={twMerge(
              "text-secondary-title font-semibold text-color-text-primary",
              required
                ? "after:content-['*'] after:ml-1 after:text-[#991B1B]"
                : "",
              labelClassname && labelClassname
            )}
          >
            {label}
          </label>
        )}
        <div className="relative ">
          <input
            ref={ref}
            className={twMerge(
              "border-[1px] w-full rounded-md px-2 py-1 bg-[#fff] text-color-text-secondary focus:outline-none",
              disabled ? "cursor-not-allowed bg-[#F8F8F8] text-gray-500" : "",
              prefix && "pl-14",
              className
            )}
            required={required}
            disabled={disabled}
            {...rest}
          />
          {prefix && (
            <span className="absolute left-0 top-0 h-full flex items-center px-2 rounded-l-md text-[#4F5462] bg-gray-100">
              {prefix}
            </span>
          )}
          {suffix && (
            <span className="absolute right-0 top-0 h-full flex items-center px-2 rounded-l-md text-[#4F5462] bg-gray-100">
              {suffix}
            </span>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {helperMsg && (
          <div
            className={twMerge(
              "flex items-center gap-1 mt-1 text-[12px] font-semibold",
              helperMsgClassname
            )}
          >
            {helperMsgIcon && helperMsgIcon}
            <p>{helperMsg}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;