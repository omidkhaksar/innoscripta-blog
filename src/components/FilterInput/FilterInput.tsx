import React from "react";
import Input from "@/components/Input/Input"
import Label from "@/components/Label/Label"

interface FilterInputProps {
  label: string;
  type: string;
  name: string;
  value: string  | unknown;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ label, type, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <Label>
      {label}
    </Label>
    <Input type={type} name={name} value={value} onChange={onChange} />
  </div>
);

export default FilterInput;
