import { ButtonProps } from "@mui/material";

export interface SubmitButtonProps extends ButtonProps {
  isLoading?: boolean;
  label: React.ReactNode;
  uppercase?: boolean;
}
