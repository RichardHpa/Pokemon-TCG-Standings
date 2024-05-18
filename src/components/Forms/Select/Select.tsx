import clsx from 'clsx';

// maybe move this into its own shared file as the label classes will all be the same
import { textFieldClasses } from '../TextField/classes';

import type { SelectProps } from './types';
import type { FC } from 'react';

export const Select: FC<SelectProps> = ({
  name,
  label,
  error,
  options,
  value,
  onChange,
  disabled,
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

      <select
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value == null ? '' : value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" label={`Select a ${label.toLowerCase()}`}>
          Select a {label.toLowerCase()}
        </option>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
};
