// SelectField.tsx
import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  options: Option[];
  register: any; // Replace 'any' with a more specific type if possible
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-xs text-gray-500">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        onChange={onChange}
      >
        <option value="" className="capitalize">
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
