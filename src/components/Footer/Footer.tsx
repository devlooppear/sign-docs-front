"use client";

import React from "react";
import {
  FooterContainer,
  FooterWrapper,
  FooterDivider,
  FooterCopy,
} from "./Footer.style";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <h6>Footer</h6>
      </FooterWrapper>

      <FooterDivider />

      <FooterCopy variant="body2">© {new Date().getFullYear()} Footer</FooterCopy>
    </FooterContainer>
  );
}
