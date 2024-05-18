import type { ReactEventHandler } from 'react';

export interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: ReactEventHandler<HTMLInputElement>;
  disabled?: boolean;

  minDate?: string;
  maxDate?: string;
}
