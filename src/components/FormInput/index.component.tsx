import React from "react";

const FormInput = ({
  label,
  inputOptions,
}: {
  label?: string;
  inputOptions: {
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
    required?: boolean;
    placeholder?: string;
    autoComplete?: string;
    className?: string;
  };
}): React.JSX.Element => {
  return (
    <div className="form-group">
      {label && (
        <label className={`${inputOptions.className}-label`}>{label}</label>
      )}
      <input {...inputOptions} />
    </div>
  );
};

export default FormInput;
