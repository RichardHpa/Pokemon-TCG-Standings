import type { ChangeEventHandler } from 'react';

interface Options {
  label: string;
  value: string;
}

export interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
  disabled?: boolean;

  options: Options[];
}
