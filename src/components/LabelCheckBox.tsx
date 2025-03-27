import { ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
  label: string;
  value: string;
  // isChecked: boolean;
};

const LabelCheckBox = (props: Props) => {
  const { label, ...inputProps } = props;

  return (
    <>
      <label
        className="nutrition-navigator__checkbox-label"
        htmlFor={inputProps.id}
        // Text is retrieved from WP REST API and comes with HTML entities
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <input
        type="checkbox"
        className="nutrition-navigator__checkbox"
        {...inputProps}
      />
    </>
  );
};

export default LabelCheckBox;
