import React from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  label: string;
  options: Option[];
  value: Option[];
  onChange: (selectedOptions: Option[]) => void;
}

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({ label, options, value, onChange }) => {
  const handleChange = (selectedOptions: any) => {
    onChange(selectedOptions || []);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <Select
        isMulti
        value={value}
        onChange={handleChange}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="선택해주세요"
      />
    </div>
  );
};

export default FormMultiSelect;
