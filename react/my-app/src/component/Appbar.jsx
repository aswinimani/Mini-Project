

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  InputBase,
  Badge
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link, useNavigate } from "react-router-dom";
import img from "../assets/OIP.jpg";

function Appbar() {
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ⭐ Get cart count from localStorage
  const cartCount = JSON.parse(localStorage.getItem("cart"))?.length || 0;

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
      setMobileSearchOpen(false);
    }
  };

  const menuItems = [
    { name: "Home", icon: <HomeIcon sx={{ fontSize: 20 }} />, path: "/home" },
    { name: "Products", icon: <StorefrontIcon sx={{ fontSize: 20 }} />, path: "/products" },
    { name: "Wishlist", icon: <FavoriteIcon sx={{ fontSize: 20 }} />, path: "/wishlist" },

    // ⭐ Cart icon with badge
    {
      name: "Cart",
      icon: (
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartIcon sx={{ fontSize: 20 }} />
        </Badge>
      ),
      path: "/cart",
    },

    { name: "Profile", icon: <AccountCircleIcon sx={{ fontSize: 20 }} />, path: "/profile" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black", p: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={img} alt="logo" style={{ width: 45 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "white", letterSpacing: 1, fontStyle: "italic" }}
              >
                Grocery
              </Typography>
            </Box>
          </Link>

          {/* Desktop Search Bar */}
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
              onClick={handleSearch}
            />

            <InputBase
              placeholder="Search Product..."
              sx={{ width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Box>

          {/* Mobile Search Icon */}
          <IconButton
            sx={{ display: { xs: "block", sm: "none" }, color: "white", mr: 1 }}
            onClick={() => setMobileSearchOpen(true)}
          >
            <SearchIcon />
          </IconButton>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
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
      <Drawer anchor="top" open={mobileSearchOpen} onClose={() => setMobileSearchOpen(false)}>
        <Box sx={{ p: 2, background: "white", display: "flex", gap: 1 }}>
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
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Drawer>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 220, bgcolor: "lightgray", height: "100%", p: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            Menu
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {item.icon}
                        {item.name}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Appbar;

