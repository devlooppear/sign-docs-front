"use client";

import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import systemColors from "@/common/constants/systemColors";
import { SubmitButtonProps } from "./interface";

const StyleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "uppercase" && prop !== "variant",
})<{ uppercase?: boolean; variant?: "contained" | "outlined" }>(
  ({ uppercase, variant }) => ({
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: 600,
    textTransform: uppercase === false ? "none" : "uppercase",
    transition: "all 0.3s ease",
    letterSpacing: "0.5px",

    ...(variant === "contained"
      ? {
          background: `linear-gradient(45deg, ${systemColors.indigo[500]} 20%, ${systemColors.indigo[700]} 90%)`,
          boxShadow: `0px 4px 10px ${systemColors.indigo[300]}`,
          color: systemColors.gray[50],
          "&:hover": {
            background: `linear-gradient(45deg, ${systemColors.indigo[600]} 30%, ${systemColors.indigo[800]} 90%)`,
            boxShadow: `0px 6px 14px ${systemColors.indigo[400]}`,
          },
          "&:disabled": {
            background: systemColors.indigo[200],
            color: systemColors.gray[400],
            boxShadow: "none",
          },
        }
      : {
          background: "transparent",
          color: systemColors.indigo[700],
          border: `2px solid ${systemColors.indigo[700]}`,
          "&:hover": {
            color: systemColors.gray[50],
            background: systemColors.indigo[700],
            boxShadow: `0px 4px 12px ${systemColors.indigo[400]}`,
          },
          "&:disabled": {
            background: "transparent",
            color: systemColors.gray[400],
            border: `2px solid ${systemColors.indigo[300]}`,
            boxShadow: "none",
          },
        }),
  })
);

export default function StyledButton({
  isLoading = false,
  label,
  uppercase = true,
  variant = "contained",
  ...props
}: SubmitButtonProps & { variant?: "contained" | "outlined" }) {
  return (
    <StyleButton
      type="submit"
      variant={variant}
      disabled={isLoading || props.disabled}
      uppercase={uppercase}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={22}
          thickness={5}
          sx={{
            color:
              variant === "contained"
                ? systemColors.gray[100]
                : systemColors.indigo[50],
          }}
        />
      ) : (
        label
      )}
    </StyleButton>
  );
}
