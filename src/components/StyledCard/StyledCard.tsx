"use client";

import { Box } from "@mui/material";
import systemColors from "@/common/constants/systemColors";
import React, { ReactNode } from "react";

interface StyledCardProps {
  children: ReactNode;
}

export const StyledCard: React.FC<StyledCardProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        boxShadow: `0px 6px 20px ${systemColors.indigo[200]}`,
        background: systemColors.indigo[50],
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
};
