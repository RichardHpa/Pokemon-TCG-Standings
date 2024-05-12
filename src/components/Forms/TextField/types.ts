export interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  error?: string;
  required?: boolean;
  readonly?: boolean;
}
