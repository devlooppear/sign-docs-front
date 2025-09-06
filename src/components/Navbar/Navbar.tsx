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
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { useTranslation } from "react-i18next";
import {
  Routes,
  unsignedRoutes,
  signedRoutes,
} from "@/common/constants/routes";
import { useAuth } from "@/provider/auth/AuthProvide";
import { UserRole } from "@/enum/userRole";
import systemColors from "@/common/constants/systemColors";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();
  const { isLogged, user, logout } = useAuth();

  const routeMeta: Record<string, { labelKey: string; icon: React.ReactNode }> =
    {
      [Routes.HOME]: { labelKey: "navbar.home", icon: <FaHome /> },
      [Routes.INTRODUCTION]: {
        labelKey: "navbar.introduction",
        icon: <FaFileAlt />,
      },
      [Routes.DASHBOARD]: {
        labelKey: "navbar.dashboard",
        icon: <FaTachometerAlt />,
      },
      [Routes.DOCUMENT]: { labelKey: "navbar.document", icon: <FaFileAlt /> },
      [Routes.PROFILE]: { labelKey: "navbar.profile", icon: <FaUser /> },
      [Routes.LOGIN]: { labelKey: "navbar.login", icon: <FaSignInAlt /> },
      [Routes.REGISTER]: { labelKey: "navbar.register", icon: <FaUserPlus /> },
    };

  let mainRoutes: { path: string; labelKey: string; icon: React.ReactNode }[] =
    [];
  let authRoutes: { path: string; labelKey: string; icon: React.ReactNode }[] =
    [];

  if (isLogged && user?.role) {
    mainRoutes = [
      { path: Routes.HOME, ...routeMeta[Routes.HOME] },
      ...(signedRoutes[user.role as UserRole] || []).map((path) => ({
        path,
        ...routeMeta[path],
      })),
    ];
    authRoutes = [];
  } else {
    mainRoutes = unsignedRoutes
      .filter(
        (path) =>
          path !== Routes.LOGIN &&
          path !== Routes.REGISTER &&
          path !== Routes.HOME
      )
      .map((path) => ({
        path,
        ...routeMeta[path],
      }));

    if (!mainRoutes.some((r) => r.path === Routes.INTRODUCTION)) {
      mainRoutes.unshift({
        path: Routes.INTRODUCTION,
        ...routeMeta[Routes.INTRODUCTION],
      });
    }
    authRoutes = [
      { path: Routes.LOGIN, ...routeMeta[Routes.LOGIN] },
      { path: Routes.REGISTER, ...routeMeta[Routes.REGISTER] },
    ];
  }

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

      {!isLogged && (
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
      )}

      {isLogged && (
        <Box sx={{ p: 2, borderTop: `1px solid ${systemColors.indigo[500]}` }}>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: systemColors.gray[200] }}
          >
            {user?.name} ({user?.role})
          </Typography>
          <ListItemButton
            onClick={logout}
            sx={{
              color: systemColors.gray[100],
              backgroundColor: systemColors.indigo[700],
              mt: 1,
              borderRadius: 1,
              "&:hover": { backgroundColor: systemColors.indigo[800] },
            }}
          >
            <Typography>
              {t("navbar.logout", { defaultValue: "Logout" })}
            </Typography>
          </ListItemButton>
        </Box>
      )}
    </Box>
  );

  const { navTo } = useNavTo();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLogged) {
      navTo(Routes.HOME);
    } else {
      navTo(Routes.INTRODUCTION);
    }
  };

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
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
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
