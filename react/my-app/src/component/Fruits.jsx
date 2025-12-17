import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Fruits() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});

  // 🥬 Fetch fruits
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/store/Fruits");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching fruits:", err);
      }
    };
    fetchData();
  }, []);

  // ❤️ Toggle favorite and store in wishlist
  const toggleFavorite = (product) => {
    setFavorites((prev) => ({
      ...prev,
      [product._id]: !prev[product._id],
    }));

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      // Remove from wishlist
      wishlist = wishlist.filter((item) => item._id !== product._id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      // alert(`${product.name} removed from wishlist 💔`);
    } else {
      // Add to wishlist
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      // alert(`${product.name} added to wishlist ❤️`);
    }
  };

  // 🛒 Add to cart
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      alert(`${product.name} is already in the cart!`);
      return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart 🛒`);
  };

  return (
    <div style={{ padding: "60px",paddingTop:"100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Fruits Category
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            <Card
              sx={{
                height: "270px",
                width: "180px",
                boxShadow: 3,
                borderRadius: 3,
                position: "relative",
                padding: "8px",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {/* ❤️ Favorite Button */}
              <IconButton
                onClick={() => toggleFavorite(item)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  color: favorites[item._id] ? "red" : "grey",
                }}
              >
                <FavoriteIcon />
              </IconButton>

              {/* 🖼️ Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: 3,
                  marginTop: "10px",
                }}
              />

              {/* 📦 Product Details */}
              <CardContent sx={{ textAlign: "center", padding: "10px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography sx={{ color: "#555", mb: 1 }}>
                  ₹{item.price}
                </Typography>

                {/* 🛒 Add to Cart Button */}
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Fruits;
