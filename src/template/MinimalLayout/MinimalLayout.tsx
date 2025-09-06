"use client";

import React from "react";
import { Box, Container } from "@mui/material";

interface MinimalLayoutProps {
  children: React.ReactNode;
}

export default function MinimalLayout({ children }: MinimalLayoutProps) {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box>{children}</Box>
    </Container>
  );
}
