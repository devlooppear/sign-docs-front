import { Control } from "react-hook-form";

export interface FormTextFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  error?: string;
  icon?: React.ReactNode;
}
