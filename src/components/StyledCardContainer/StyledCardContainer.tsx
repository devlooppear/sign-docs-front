"use client";

import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";
import React, { ReactNode } from "react";
import systemColors from "@/common/constants/systemColors";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: systemColors.gray[50],
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0px 3px 6px ${systemColors.gray.transparent[20]}`,
  padding: theme.spacing(3),
  width: "98%",
  height: "75dvh",
  maxWidth: 2100,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
}));

interface StyledCardContainerProps extends BoxProps {
  children: ReactNode;
}

const StyledCardContainer: React.FC<StyledCardContainerProps> = ({
  children,
  ...props
}) => {
  return <Container {...props}>{children}</Container>;
};

export default StyledCardContainer;
