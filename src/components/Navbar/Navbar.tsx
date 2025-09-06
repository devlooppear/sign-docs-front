"use client";

import React from "react";
import {
  FaHome,
  FaFileAlt,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Box,
} from "@mui/material";
import Logo from "@/components/Logo/Logo";
import { useTranslation } from "react-i18next";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();

  const mainRoutes = [
    { path: Routes.HOME, labelKey: "navbar.home", icon: <FaHome /> },
    {
      path: Routes.INTRODUCTION,
      labelKey: "navbar.introduction",
      icon: <FaFileAlt />,
    },
    {
      path: Routes.DASHBOARD,
      labelKey: "navbar.dashboard",
      icon: <FaTachometerAlt />,
    },
    { path: Routes.DOCUMENT, labelKey: "navbar.document", icon: <FaFileAlt /> },
    { path: Routes.PROFILE, labelKey: "navbar.profile", icon: <FaUser /> },
  ];

  const authRoutes = [
    { path: Routes.LOGIN, labelKey: "navbar.login", icon: <FaSignInAlt /> },
    {
      path: Routes.REGISTER,
      labelKey: "navbar.register",
      icon: <FaUserPlus />,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: systemColors.indigo[600],
        color: systemColors.gray[100],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <List>
        {mainRoutes.map((route, index) => (
          <React.Fragment key={route.path}>
            <ListItem disablePadding>
              <ListItemButton
                href={route.path}
                sx={{
                  color: systemColors.gray[100],
                  "&:hover": {
                    backgroundColor: systemColors.indigo[700],
                    color: systemColors.blue[200],
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {route.icon}
                </ListItemIcon>
                <Typography>{t(route.labelKey)}</Typography>
              </ListItemButton>
            </ListItem>
            {index < mainRoutes.length - 1 && (
              <Divider sx={{ borderColor: systemColors.indigo[500] }} />
            )}
          </React.Fragment>
        ))}
      </List>

      {/* Auth routes no final */}
      <List>
        {authRoutes.map((route, index) => (
          <React.Fragment key={route.path}>
            <ListItem disablePadding>
              <ListItemButton
                href={route.path}
                sx={{
                  color: systemColors.gray[100],
                  "&:hover": {
                    backgroundColor: systemColors.indigo[700],
                    color: systemColors.blue[200],
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {route.icon}
                </ListItemIcon>
                <Typography>{t(route.labelKey)}</Typography>
              </ListItemButton>
            </ListItem>
            {index < authRoutes.length - 1 && (
              <Divider sx={{ borderColor: systemColors.indigo[500] }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: systemColors.blue[500],
          color: "#fff",
          boxShadow: `0 4px 12px ${systemColors.indigo[300]}`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Logo width={40} height={40} />
            <Typography
              variant="h6"
              sx={{ ml: 2, color: systemColors.gray[50] }}
            >
              Docs-Sign
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}
