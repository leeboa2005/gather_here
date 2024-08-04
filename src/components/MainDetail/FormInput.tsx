import React, { ChangeEvent } from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  className,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-labelNeutral text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`shared-input-gray border-none rounded w-full py-2 px-3 text-labelNeutral leading-tight focus:outline-none focus:shadow-outline ${className}`}
        style={{ color: value === "" ? "#919191" : undefined }}
      />
    </div>
  );
};

export default FormInput;
