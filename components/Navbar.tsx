import { useState, MouseEvent, TouchEvent, FC } from "react";
import Link from "next/link";
import Image from "next/image";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const drawerWidth = 240;

const ResponsiveDrawer: FC = ({children}) => {
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Falcon 1", link: "/falcon1" },
    { text: "Falcon 9", link: "/falcon9" },
    { text: "Falcon Heavy", link: "/falconheavy" },
    { text: "Starship", link: "/starship" },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ margin: "0.5rem 0 1rem 1.5rem" }}>
        <Link href="/">
          <a>
            <Image src="/logo.png" width="200px" height="30px" alt="logo" />
          </a>
        </Link>
      </Toolbar>

      <List>
        <ListItem button onClick={handleDrawerToggle}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link href="/" passHref>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem
          button
          id="basic-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="rocket"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ListItemIcon>
            <AirplaneTicketIcon />
          </ListItemIcon>
          <ListItemText primary="Rocket" />
          <KeyboardArrowDownIcon />
        </ListItem>
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleDrawerToggle}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          role: "listbox",
        }}
        sx={{ marginLeft: "4rem" }}
      >
        {menuItems.map(({ text, link }) => (
          <Link key={link} href={link} passHref>
            <MenuItem onClick={handleClose}>{text}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );

  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", paddingRight: "0" }}>
          <Box component="div">
            <Link href="/">
              <a>
                <Image src="/logo.png" width="200px" height="30px" alt="logo" />
              </a>
            </Link>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976D2",
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976D2",
              color: "white",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //   p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
