import type { ChangeEvent, FocusEvent } from 'react';

export interface TextFieldProps {
  label: string;
  name: string;
  value: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent) => void;

  placeholder?: string;
  type?: 'text' | 'password';
  error?: any;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}
