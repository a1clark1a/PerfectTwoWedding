import React from "react";

const FormInput = ({
  label,
  inputOptions,
}: {
  label: string;
  inputOptions: {
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
    required?: boolean;
  };
}): React.JSX.Element => {
  return (
    <div className="form-group">
      {label && <label className={`form-input-label`}>{label}</label>}
      <input className="form-input" {...inputOptions} />
    </div>
  );
};

export default FormInput;
