import React, { FC } from "react";

export interface LabelProps {
  className?: string;
  children :any
}

const Label: FC<LabelProps> = ({ className = "", children }) => {
  return (
    <span
      className={`nc-Labeltext-neutral-800 font-medium text-sm dark:text-neutral-300 ${className} `}
      data-nc-id="Label"
    >
      {children}
    </span>
  );
};

export default Label;
