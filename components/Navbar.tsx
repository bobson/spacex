import { useState, FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaRocket, FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";
import { RiRocketLine } from "react-icons/ri";
import {
  MdKeyboardArrowDown,
  MdOutlineMenu,
  MdHome,
  MdKeyboardArrowUp,
} from "react-icons/md";

import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const ResponsiveDrawer: FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openNestedLink, setOpenNestedLink] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(4);

  const handleDrawerToggle = () => {
    setMobileOpen((prevMobOpen) => !prevMobOpen);
  };

  const handleNestedLinkToggle = () => {
    setOpenNestedLink((prevOpenLink) => !prevOpenLink);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
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
        <Link href="/" passHref>
          <a
            onClick={() => {
              handleDrawerToggle();
              setOpenNestedLink(false);
              setSelectedIndex(4);
            }}
          >
            <Image src="/logo.png" width="200px" height="30px" alt="logo" />
          </a>
        </Link>
      </Toolbar>
      <Toolbar />

      <List>
        <Divider />
        <ListItemButton
          onClick={() => {
            handleDrawerToggle();
            setOpenNestedLink(false);
            setSelectedIndex(4);
          }}
        >
          <ListItemIcon>
            <MdHome size="1.5em" />
          </ListItemIcon>
          <Link href="/" passHref>
            <ListItemText>Home</ListItemText>
          </Link>
        </ListItemButton>

        <Divider />
        <ListItemButton onClick={handleNestedLinkToggle}>
          <ListItemIcon>
            <FaRocket size="1.2em" />
          </ListItemIcon>
          <ListItemText primary="Rocket" />
          {openNestedLink ? (
            <MdKeyboardArrowUp size="1.5em" />
          ) : (
            <MdKeyboardArrowDown size="1.5em" />
          )}
        </ListItemButton>
        <Collapse in={openNestedLink} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menuItems.map(({ text, link }, i) => (
              <ListItemButton
                selected={selectedIndex === i}
                onClick={(e) => {
                  handleDrawerToggle();
                  handleListItemClick(i);
                }}
                key={i}
                sx={{
                  px: 4,
                  "&.Mui-selected": {
                    background:
                      "linear-gradient(90deg, rgba(255, 169, 0, 1) 0%, rgba(161, 255, 0, 1) 100%)",
                  },
                }}
              >
                <ListItemIcon>
                  <RiRocketLine />
                </ListItemIcon>
                <Link href={link} passHref>
                  <ListItemText primary={text} />
                </Link>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <Divider />
      </List>

      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          "& *": {
            color: "#005E5D",
            cursor: "pointer",
          },
        }}
      >
        <FaFacebook size="2rem" />
        <FaGithub size="2rem" />
        <FaTwitter size="2rem" />
      </Box>
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
          background:
            "linear-gradient(90deg, rgba(0, 212, 210, 1) 38%, rgba(130, 167, 238, 1) 100%)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", paddingRight: "0" }}>
          <Box component="div">
            <Link href="/">
              <a
                onClick={() => {
                  setSelectedIndex(4);
                  setOpenNestedLink(false);
                }}
              >
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
            <MdOutlineMenu style={{ color: "black" }} size="1.5em" />
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
              background:
                "linear-gradient(187deg, rgba(0, 212, 210, 1) 38%, rgba(130, 167, 238, 1) 100%)",
              color: "black",
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
              background:
                "linear-gradient(187deg, rgba(0, 212, 210, 1) 38%, rgba(130, 167, 238, 1) 100%)",
              color: "black",
              overflow: "hidden",
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
};

export default ResponsiveDrawer;
