import React from "react";

const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels = {
    true: "Yes",
    false: "No",
  },
  disabled,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optionLabels?: {
    true: string;
    false: string;
  };
  disabled?: boolean;
}): React.JSX.Element => {
  return (
    <div className={"toggle-switch"}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled={disabled}
      />
      {id && optionLabels && (
        <label className="toggle-switch-label" htmlFor={id}>
          <span
            className={
              disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={optionLabels.true}
            data-no={optionLabels.false}
          />
          <span />
        </label>
      )}
    </div>
  );
};

export default ToggleSwitch;
