import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,
  ListItemButton, ListItemText, Box, InputBase, Badge, Menu, MenuItem
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../assets/OIP.jpg";

function Appbar({ token }) {  // <-- token prop pass pannunga from parent
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // ⭐ Fetch cart count from backend API
  const fetchCartCount = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [token]);

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
      setMobileSearchOpen(false);
    }
  };

  // Profile handlers
  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);
  const handleAdmin = () => { handleProfileClose(); navigate("/profile"); };
  const handleLogout = () => { handleProfileClose(); navigate("/"); };

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, path: "/home" },
    { name: "Products", icon: <StorefrontIcon />, path: "/products" },
    { name: "Wishlist", icon: <FavoriteIcon />, path: "/wishlist" },
    {
      name: "Cart",
      icon: (
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      ),
      path: "/cart",
    },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black", p: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={img} alt="logo" style={{ width: 45 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "white", fontStyle: "italic" }}
              >
                Grocery
              </Typography>
            </Box>
          </Link>

          {/* Desktop Search */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              width: "40%",
            }}
          >
            <SearchIcon
              sx={{ color: "gray", mr: 1, cursor: "pointer" }}
              onClick={handleSearch}/>
            <InputBase
              placeholder="Search Product..."
              sx={{ width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Box>
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Box
                key={item.name}
                onClick={() => navigate(item.path)}
                sx={{
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:hover": { color: "lightgreen" },
                }}
              >
                {item.icon}
                <Typography variant="body2">{item.name}</Typography>
              </Box>
            ))}

            {/* Profile Dropdown */}
            <Box
              onClick={handleProfileOpen}
              sx={{
                color: "white",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "&:hover": { color: "lightgreen" },
              }}
            >
              <AccountCircleIcon />
              <Typography variant="body2">Profile</Typography>
            </Box>

            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleAdmin}>Admin</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Search Drawer */}
      <Drawer
        anchor="top"
        open={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      >
        <Box sx={{ p: 2, display: "flex", gap: 1 }}>
          <InputBase
            autoFocus
            placeholder="Search Product..."
            sx={{
              flexGrow: 1,
              border: "1px solid gray",
              borderRadius: 2,
              px: 2,
              py: 0.7,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Drawer>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 220, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Menu
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => { navigate(item.path); setOpen(false); }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding>
              <ListItemButton onClick={handleAdmin}>
                <ListItemText primary="Admin" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Appbar;
