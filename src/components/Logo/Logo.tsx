"use client";

import React from "react";
import Image from "next/image";
import Box, { BoxProps } from "@mui/material/Box";
import systemColors from "@/common/constants/systemColors";
import { LogoProps } from "./interface";

const Logo: React.FC<LogoProps> = ({
  width = 120,
  height = 120,
  alt = "Docs-Sign Logo",
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: systemColors.indigo[50],
        border: `2px solid ${systemColors.blue[500]}`,
        borderRadius: "12px",
        boxShadow: `0 4px 12px ${systemColors.indigo.transparent[50]}`,
        padding: "8px",
        width: width,
        height: height,
      }}
    >
      <Image
        src="/logo/android-chrome-512x512.png"
        width={width - 16}
        height={height - 16}
        alt={alt}
        priority
      />
    </Box>
  );
};

export default Logo;
