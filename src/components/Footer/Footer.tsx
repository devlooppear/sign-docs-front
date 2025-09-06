"use client";

import React from "react";
import { Typography, Link as MuiLink, IconButton, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "@/components/Logo/Logo";
import { Routes } from "@/common/constants/routes";
import { socialLinks } from "@/common/constants/socialLinks";
import {
  FooterContainer,
  FooterWrapper,
  FooterDivider,
  FooterCopy,
  FooterSection,
} from "./Footer.style";

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("footer.quickLinks.home", "Início"), href: Routes.HOME },
    { label: t("footer.quickLinks.login", "Login"), href: Routes.LOGIN },
    {
      label: t("footer.quickLinks.register", "Registrar"),
      href: Routes.REGISTER,
    },
  ];

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterSection>
          <Logo width={60} height={60} />
          <Box display="flex" gap={1}>
            {socialLinks.map(({ icon, href }, idx) => (
              <MuiLink
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "inherit",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <IconButton sx={{ color: "inherit", fontSize: 24 }}>
                  {icon}
                </IconButton>
              </MuiLink>
            ))}
          </Box>
        </FooterSection>

        <FooterSection>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("footer.quickLinks.title", "Links Rápidos")}
          </Typography>
          {quickLinks.map(({ label, href }, idx) => (
            <MuiLink
              key={idx}
              href={href}
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {label}
            </MuiLink>
          ))}
        </FooterSection>

        <FooterSection>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("footer.contact.title", "Contato")}
          </Typography>
          <Typography variant="body2">
            {t("footer.contact.email", "iago.profissional.developer@gmail.com")}
          </Typography>
          <Typography variant="body2">
            {t("footer.contact.phone", "+55 (11) 94186-7093")}
          </Typography>
        </FooterSection>
      </FooterWrapper>

      <FooterDivider />

      <FooterCopy variant="body2">
        © {new Date().getFullYear()} Docs-Sign
      </FooterCopy>
    </FooterContainer>
  );
}
