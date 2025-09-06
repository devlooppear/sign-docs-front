import styled from "@emotion/styled";
import { Box, Typography, Divider } from "@mui/material";
import systemColors from "@/common/constants/systemColors";
import Link from "next/link";

export const FooterContainer = styled(Box)`
  background-color: ${systemColors.gray[700]};
  color: #fff;
  margin-top: 32px;
  padding-top: 32px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  min-height: 10rem;

  @media (min-width: 600px) {
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (min-width: 900px) {
    padding-left: 64px;
    padding-right: 64px;
  }
`;

export const FooterWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const FooterLogo = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "href",
})`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    color: ${systemColors.gray[300]};
  }
`;

export const FooterLogoLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const FooterLinks = styled(Box)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: ${systemColors.gray[300]};
    }
  }

  @media (min-width: 600px) {
    gap: 24px;
  }
`;

export const SocialIcons = styled(Box)`
  display: flex;
  gap: 8px;
`;

export const SocialIconButton = styled("a")`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  padding: 6px;
  transition: color 0.3s ease;

  &:hover {
    color: ${systemColors.gray[300]};
  }
`;

export const FooterDivider = styled(Divider)`
  background-color: rgba(255, 255, 255, 0.2);
  margin: 24px 0;
`;

export const FooterCopy = styled(Typography)`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;
