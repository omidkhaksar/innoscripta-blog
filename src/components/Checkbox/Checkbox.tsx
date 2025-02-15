import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  name: string;
  onChange?: any
  checked?: boolean
}

const Checkbox: FC<CheckboxProps> = ({ subLabel = "", label = "", name , onChange , checked = false }) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          checked ={checked}
          type="checkbox"
          className="focus:ring-action-primary h-4 w-4 text-primary border-primary"
          onChange={onChange}
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label
            htmlFor={name}
            className="text-paragraph-small text-black dark:text-white"
          >
            {label}
          </label>
          {subLabel && <p className="text-neutral-500">{subLabel}</p>}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
