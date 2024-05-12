import clsx from 'clsx';

import { textFieldClasses } from './classes';
import { TextFieldProps } from './types';
import type { FC } from 'react';

export const TextField: FC<TextFieldProps> = ({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
  value,
  onChange,
  error,
  readonly = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={clsx(
          textFieldClasses.label.base,
          error ? textFieldClasses.label.validation.error : textFieldClasses.label.validation.base
        )}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={clsx(
          textFieldClasses.input.base,
          error ? textFieldClasses.input.validation.error : textFieldClasses.input.validation.base
        )}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readonly}
      />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
};
