


import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Nuts() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

   // 🔹 Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setWishlist(res.data.map((item) => item._id));
    } catch (err) {
      console.log("Wishlist error:", err);
    }
  };

   const fetchNuts = async () => {
    try {
      const res = await API.get("/store/Nuts");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching nuts:", err);
    }
  };

  // 🔹 Fetch nuts
  useEffect(() => {
    fetchNuts();
    fetchWishlist();
  }, []);


  // ❤️ Toggle Wishlist
  const toggleWishlist = async (productId) => {
    try {
      await API.post("/wishlist/add", { productId });
      fetchWishlist();
    } catch (err) {
      alert("Please login first");
    }
  };

  // 🛒 Add to Cart
  const handleAddToCart = async (product) => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
      });
      alert("Added to cart");
    } catch (err) {
      alert("Please login first");
    }
  };

  return (
    <div style={{ padding: "60px", paddingTop: "100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Nuts Category
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
              }}
            >
              {/* ❤️ Wishlist */}
              <IconButton
                onClick={() => toggleWishlist(item._id)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  color: wishlist.includes(item._id) ? "red" : "grey",
                }}
              >
                <FavoriteIcon />
              </IconButton>

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                }}
              />

              <CardContent sx={{ textAlign: "center" }}>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography>₹{item.price}</Typography>

                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ mt: 1 }}
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

export default Nuts;

