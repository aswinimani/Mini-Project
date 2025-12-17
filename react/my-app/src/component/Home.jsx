



import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import {
  Facebook,
  WhatsApp,
  Instagram,
  X,
  LocalShipping,
  VerifiedUser,
  Inventory2,
  Savings,
  LocalOffer,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

import Carousel from "./Carousel";
import fruitImg from "../assets/fff.jpg";
import flax from "../assets/flax.jpg";
import apple from "../assets/apple.jpg";
import juiccc from "../assets/maaza.jpg";
import badam from "../assets/badam.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // ⭐ Wishlist
  const [wishlist, setWishlist] = React.useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const toggleWishlist = (item) => {
    let updatedList;

    if (wishlist.some((w) => w.name === item.name)) {
      updatedList = wishlist.filter((w) => w.name !== item.name);
    } else {
      updatedList = [...wishlist, item];
    }

    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
  };

  // ⭐ Add to Cart State
  const [cart, setCart] = React.useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ⭐ Add to Cart Function
  const addToCart = (item) => {
    const updatedCart = [...cart, item];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // navigate("/cart"); // redirect to cart page
  };

  const categories = [
    { name: "Fruits", img: fruitImg, path: "/category/Fruits" },
    {
      name: "Vegetables",
      img: "https://wallpaperaccess.com/full/1306571.jpg",
      path: "/category/Vegetables",
    },
    {
      name: "Nuts",
      img: "https://png.pngtree.com/thumb_back/fw800/background/20240102/pngtree-infinite-vector-texture-of-delectable-dried-fruits-and-nuts-image_13904752.png",
      path: "/category/Nuts",
    },
  ];

  // ⭐ Products (image kept same)
  const featured = [
    { name: "Apple", price: 120, image: apple },
    { name: "Maaza", price: 60, image: juiccc },
    { name: "Flax seed", price: 45, image: flax },
    { name: "Badam", price: 50, image: badam },
  ];

  const offerFeatures = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: "#F4B400" }} />,
      title: "Free Delivery",
      desc: "Enjoy free delivery on all orders",
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: "#0F9D58" }} />,
      title: "100% Secure Payment",
      desc: "Your transactions are fully protected",
    },
    {
      icon: <Inventory2 sx={{ fontSize: 40, color: "#F57C00" }} />,
      title: "Quality Guarantee",
      desc: "Premium quality assured",
    },
    {
      icon: <Savings sx={{ fontSize: 40, color: "#7B1FA2" }} />,
      title: "Guaranteed Savings",
      desc: "Best deals every day",
    },
    {
      icon: <LocalOffer sx={{ fontSize: 40, color: "#FF9800" }} />,
      title: "Daily Offer",
      desc: "New deals every day",
    },
  ];

  return (
    <div style={{ paddingTop: "80px", backgroundColor: "#f9f9f9" }}>
      <Carousel />

      {/* Categories */}
      <Typography variant="h4" style={{ textAlign: "center", marginTop: 30 }}>
        Shop by Category
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ padding: "20px" }}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={3} key={cat.name}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardActionArea onClick={() => navigate(cat.path)}>
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{cat.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured */}
      <Typography variant="h4" style={{ textAlign: "center", marginTop: 30 }}>
        Featured Products
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ padding: "20px" }}>
        {featured.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.name}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, position: "relative" }}>
              
              {/* Wishlist */}
              <div
                onClick={() => toggleWishlist(item)}
                style={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
              >
                {wishlist.some((w) => w.name === item.name) ? (
                  <Favorite sx={{ color: "red", fontSize: 28 }} />
                ) : (
                  <FavoriteBorder sx={{ color: "black", fontSize: 28 }} />
                )}
              </div>

              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">₹{item.price}</Typography>

                {/* ⭐ Add to Cart Button */}
                <Button
                  variant="contained"
                  sx={{ mt: 1, backgroundColor: "#4CAF50" }}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Offers */}
      <div style={{ padding: "40px 20px", backgroundColor: "white" }}>
        <Grid container spacing={3} justifyContent="center">
          {offerFeatures.map((item, index) => (
            <Grid item xs={12} sm={6} md={2.2} key={index} style={{ textAlign: "center" }}>
              {item.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* Footer */}
       <footer
         style={{
           background: "black",
           color: "white",
           padding: "40px 20px",
           marginTop: "0px",
         }}
       >
         <Grid container spacing={4} justifyContent="center">
           {/* Logo + Social */}
           <Grid item xs={12} md={3} style={{ textAlign: "center" }}>
             <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "10px" }}>
               MG <span style={{ color: "#FFD700" }}>Grocery</span> 🛒
             </Typography>

             <Typography variant="body1" sx={{ mt: 2 }}>
               Follow Us On
             </Typography>

             <div
               style={{
                 marginTop: "10px",
                 display: "flex",
                 justifyContent: "center",
                 gap: "15px",
               }}
             >
               <Instagram style={{ fontSize: 30, color: "#E1306C", cursor: "pointer" }} />
               <X style={{ fontSize: 30, color: "white", cursor: "pointer" }} />
               <WhatsApp style={{ fontSize: 30, color: "#25D366", cursor: "pointer" }} />
               <Facebook style={{ fontSize: 30, color: "#1877F2", cursor: "pointer" }} />
             </div>
           </Grid>

           {/* About */}
           <Grid item xs={12} md={3}>
             <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
               About
             </Typography>
             <Typography variant="body2">About Us</Typography>
             <Typography variant="body2">Contact Us</Typography>
             <Typography variant="body2">FAQ</Typography>
             <Typography variant="body2">Privacy Policy</Typography>
             <Typography variant="body2">Terms & Conditions</Typography>
           </Grid>
           {/* Deals */}
           <Grid item xs={12} md={3}>
             <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
               Deals
             </Typography>
             <Typography variant="body2">Gift Cards</Typography>
             <Typography variant="body2">Career Opportunities</Typography>
             <Typography variant="body2">Delivery Information</Typography>
             <Typography variant="body2">Return & Refund Policy</Typography>
             <Typography variant="body2">Exclusive Deals</Typography>
           </Grid>

          {/* Delivery */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
               Delivery
             </Typography>
             <Typography variant="body2">Secure Shopping</Typography>
             <Typography variant="body2">Global Shipping</Typography>
           </Grid>
         </Grid>

         <Typography
           variant="body2"
           style={{
             textAlign: "center",
             marginTop: "30px",
             color: "#ccc",
           }}
         >
           © 2025 MG GROCERY. All Rights Reserved
         </Typography>
       </footer>
     </div>
   );
 }

 export default Home;
    
    