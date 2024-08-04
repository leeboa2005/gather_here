import React from "react";
import Select from "react-select";
import { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  label: string;
  options: Option[];
  value: Option[];
  onChange: (selectedOptions: Option[]) => void;
  className?: string;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#28282A",
    border: state.isFocused ? "1px solid #919191" : "1px solid #28282A",
    color: "#919191",
    padding: "2px 12px",
    borderRadius: "4px",
    boxShadow: "none",
    minHeight: "36px", // 여기서 세로 크기를 조정
    "&:hover": {
      borderColor: "#919191",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#28282A",
    borderColor: "#28282A",
    color: "#ffffff",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#444",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#ffffff",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#919191",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#ffffff",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#ffffff",
  }),
};

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({ label, options, value, onChange, className }) => {
  const instanceId = useId();

  const handleChange = (selectedOptions: any) => {
    onChange(selectedOptions || []);
  };

  return (
    <div className="mb-4">
      <label className="block text-labelNeutral text-sm font-bold mb-2">{label}</label>
      <Select
        isMulti
        value={value}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        className={className}
        classNamePrefix="select"
        instanceId={instanceId}
        placeholder="선택..."
      />
    </div>
  );
};

export default FormMultiSelect;
