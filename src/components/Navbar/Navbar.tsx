"use client";

import React from "react";
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
} from "@mui/material";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <Typography>Menu Item</Typography>
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
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
