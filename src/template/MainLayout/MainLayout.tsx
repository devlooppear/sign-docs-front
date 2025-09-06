"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Wrapper, StyledContainer } from "./MainLayout.style";
import Footer from "@/components/Footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Wrapper>
      <Navbar />
      <StyledContainer maxWidth="lg">{children}</StyledContainer>
      <Footer />
    </Wrapper>
  );
}
