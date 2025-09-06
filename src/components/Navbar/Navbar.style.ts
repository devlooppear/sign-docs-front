import styled from "@emotion/styled";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";
import systemColors from "@/common/constants/systemColors";

export const NavbarAppBar = styled(AppBar)`
  background-color: #fff;
  color: ${systemColors.gray[700]};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const NavbarToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

export const NavbarLogoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const NavbarLogo = styled(Typography)`
  text-decoration: none;
  color: ${systemColors.gray[700]};
  font-weight: bold;
  font-size: 1.25rem;
`;

export const NavbarLogoLink = styled("span")`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

export const NavbarMenu = styled(Box)`
  display: flex;
  gap: 16px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavbarButton = styled(Button)`
  color: ${systemColors.gray[700]};
  font-weight: 600;

  &:hover {
    color: ${systemColors.gray[900]};
  }
`;

export const NavbarMenuIconButton = styled(IconButton)`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const NavbarDrawer = styled(Drawer)`
  @media (min-width: 900px) {
    display: none;
  }
`;

export const DrawerContent = styled(Box)`
  text-align: center;
  padding: 16px;
`;

export const DrawerTitle = styled(Typography)`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${systemColors.gray[700]};
  font-weight: bold;
`;
