"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import systemColors from "@/common/constants/systemColors";

const LoaderWrapper = styled(Box)({
  width: 50,
  height: 165,
  position: "relative",
});

const BounceDot = styled(Box)({
  content: '""',
  position: "absolute",
  left: "50%",
  top: 0,
  transform: "translate(-50%, 0)",
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: systemColors.blue[900],
  animation: "bounce 2s linear infinite",
  "@keyframes bounce": {
    "0%, 50%, 100%": { transform: "translate(-50%, 0)", height: 20 },
    "20%": { transform: "translate(-25%, 85px)", height: 28 },
    "25%": { transform: "translate(-25%, 110px)", height: 12 },
    "70%": { transform: "translate(-75%, 85px)", height: 28 },
    "75%": { transform: "translate(-75%, 108px)", height: 12 },
  },
});

const RotatingBox = styled(Box)({
  content: '""',
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto",
  width: 48,
  height: 48,
  borderRadius: 4,
  backgroundColor: systemColors.blue[200],
  animation: "rotate 2s linear infinite",
  "@keyframes rotate": {
    "0%, 50%, 100%": { transform: "rotate(0deg)" },
    "25%": { transform: "rotate(90deg)" },
    "75%": { transform: "rotate(-90deg)" },
  },
});

const Overlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: systemColors.blue[700] + "E6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
});

interface LoaderProps {
  inAll?: boolean;
}

export default function Loader({ inAll = false }: LoaderProps) {
  const spinner = (
    <LoaderWrapper>
      <BounceDot />
      <RotatingBox />
    </LoaderWrapper>
  );

  return inAll ? <Overlay>{spinner}</Overlay> : spinner;
}
