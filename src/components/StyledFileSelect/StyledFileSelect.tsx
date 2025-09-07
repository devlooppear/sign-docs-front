"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import systemColors from "@/common/constants/systemColors";

interface StyledFileSelectProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  label?: string;
  removeLabel?: string;
  accept?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const StyledFileSelect: React.FC<StyledFileSelectProps> = ({
  file,
  onFileChange,
  label = "Selecionar arquivo",
  removeLabel = "Remover",
  accept = "*",
  disabled = false,
  loading = false,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) onFileChange(e.target.files[0]);
    else onFileChange(null);
  };

  const handleRemove = () => {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        accept={accept}
        onChange={handleChange}
        disabled={disabled || loading}
      />

      <Button
        variant="contained"
        onClick={handleClick}
        disabled={disabled || loading}
        startIcon={<AiOutlineUpload />}
        sx={{
          flex: 1,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px",
          padding: "12px 20px",
          background: `linear-gradient(45deg, ${systemColors.indigo[500]} 20%, ${systemColors.indigo[700]} 90%)`,
          color: systemColors.gray[50],
          transition: "all 0.3s ease",
          "&:hover": {
            background: `linear-gradient(45deg, ${systemColors.indigo[600]} 30%, ${systemColors.indigo[800]} 90%)`,
            boxShadow: `0 6px 16px ${systemColors.indigo[300]}`,
            transform: "translateY(-2px)",
          },
          "&:disabled": {
            background: systemColors.indigo[200],
            color: systemColors.gray[400],
            boxShadow: "none",
          },
        }}
      >
        {loading ? "Enviando..." : file ? file.name : label}
      </Button>

      {file && (
        <Button
          variant="outlined"
          onClick={handleRemove}
          disabled={disabled || loading}
          startIcon={<AiOutlineClose />}
          sx={{
            textTransform: "none",
            borderColor: systemColors.error,
            color: systemColors.error,
            borderRadius: "12px",
            padding: "12px 20px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: `${systemColors.error}10`,
              boxShadow: `0 4px 12px ${systemColors.error}50`,
              transform: "translateY(-2px)",
            },
          }}
        >
          {removeLabel}
        </Button>
      )}
    </Box>
  );
};
