import React, { InputHTMLAttributes } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  value?: string | number | readonly string[] | undefined | unknown
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-lg",
      value = "", // Default value is empty string
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
        value={value as any}
        {...args}
      />
    );
  }
);
Input.displayName = 'Input'; // Add displayName

export default Input;
