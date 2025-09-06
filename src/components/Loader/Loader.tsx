"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import systemColors from "@/common/constants/systemColors";

export interface LoaderProps {
  size?: number;
  colorOuter?: string;
  colorInner?: string;
  inAll?: boolean;
}

const Spinner = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "size" && prop !== "colorOuter" && prop !== "colorInner",
})<{ size: number; colorOuter: string; colorInner: string }>(
  ({ size, colorOuter, colorInner }) => ({
    width: size,
    height: size,
    borderRadius: "50%",
    position: "relative",
    border: `3px solid`,
    borderColor: `${colorOuter} ${colorOuter} transparent`,
    boxSizing: "border-box",
    animation: "rotation 1s linear infinite",
    "&::after": {
      content: '""',
      boxSizing: "border-box",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
      width: size / 2,
      height: size / 2,
      borderRadius: "50%",
      border: `3px solid`,
      borderColor: `transparent ${colorInner} ${colorInner}`,
      animation: "rotationBack 0.5s linear infinite",
      transformOrigin: "center center",
    },
    "@keyframes rotation": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    "@keyframes rotationBack": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(-360deg)" },
    },
  })
);

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: systemColors.indigo[700] + "E6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

export default function Loader({
  size = 80,
  colorOuter = systemColors.blue[50],
  colorInner = systemColors.blue[700],
  inAll = false,
}: LoaderProps) {
  const spinner = (
    <Spinner size={size} colorOuter={colorOuter} colorInner={colorInner} />
  );

  return inAll ? <Overlay>{spinner}</Overlay> : spinner;
}
