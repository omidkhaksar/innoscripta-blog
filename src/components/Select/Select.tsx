import React, { FC, useState, useEffect } from "react";
import Label from "@/components/Label/Label";

export interface SelectProps {
  className?: string;
  sizeClass?: string;
  label: string;
  value: string | unknown;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  className = "",
  label = "",
  sizeClass = "h-11",
  options,
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | null | unknown>(value);
  const [isOpen, setIsOpen] = useState(false);

  // Sync selected state when value prop changes
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      <Label>{label}</Label>
      <button
        className={`w-full ${sizeClass} text-left text-sm rounded-lg border border-neutral-300 px-4 py-2 bg-white dark:bg-neutral-900 dark:border-neutral-700`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? options.find((opt) => opt.value === selected)?.label : "Select an option"}
      </button>
      {isOpen && (
        <div className="absolute mt-5 w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg border border-neutral-200 dark:border-neutral-700 z-10">
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
