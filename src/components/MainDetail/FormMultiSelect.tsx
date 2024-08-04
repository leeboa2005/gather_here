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
    backgroundColor: "#3B3D3F",
    border: state.isFocused ? "1px solid #3B3D3F" : "1px solid #3B3D3F",
    color: "#919191",
    padding: "2px 12px",
    borderRadius: "7px",
    boxShadow: "none",
    minHeight: "45px",
    "&:hover": {
      borderColor: "#919191",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#3B3D3F",
    borderColor: "#3B3D3F",
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
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#19191A" : "#3B3D3F",
    color: state.isFocused ? "#ffffff" : "#ffffff",
    "&:hover": {
      backgroundColor: "#28282A",
    },
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
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default FormMultiSelect;
