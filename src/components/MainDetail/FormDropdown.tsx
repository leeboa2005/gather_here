import React, { ChangeEvent } from "react";

interface FormDropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number | string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
}

const FormDropdown: React.FC<FormDropdownProps> = ({ label, options, value, onChange, multiple = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        multiple={multiple}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">--선택해주세요--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormDropdown;
