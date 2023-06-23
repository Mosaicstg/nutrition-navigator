import React from 'react';

const LabelCheckBox = (props: {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}) => {
  const { label, name, value, onChange, isChecked } = props;

  return (
    <>
      <label className="nutrition-navigator__checkbox-label" htmlFor={value}>
        {label}
      </label>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={value}
        className="nutrition-navigator__checkbox"
        onChange={onChange}
        checked={isChecked}
      />
    </>
  );
};

export default LabelCheckBox;
