"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import { FormTextFieldProps } from "./interface";

export default function FormTextField({
  name,
  control,
  label,
  type = "text",
  error,
  icon,
  endAdornment,
}: FormTextFieldProps & { endAdornment?: React.ReactNode }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!error}
          helperText={error}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : undefined,
              endAdornment: endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : undefined,
            },
          }}
        />
      )}
    />
  );
}
