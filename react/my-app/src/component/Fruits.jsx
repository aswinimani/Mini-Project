import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Fruits({setCartCount,setWishlistCount}) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ❤️ Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setWishlist(res.data.map((item) => item._id));
    } catch (err) {
      console.log("Wishlist error:", err);
    }
  };

  // 🍎 Fetch Fruits
  const fetchFruits = async () => {
    try {
      const res = await API.get("/store/Fruits");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching fruits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFruits();
    fetchWishlist();
  }, []);

  // ❤️ Toggle Wishlist
  const toggleWishlist = async (productId) => {
    try {
      await API.post("/wishlist/add", { productId });
      setWishlistCount(prev=>prev+1)
      fetchWishlist();
      setSnackbar({
        open: true,
        message: "Added to wishlist",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Please login first",
        severity: "error",
      });
    }
  };

  // 🛒 Add to Cart
  const handleAddToCart = async (product) => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
      });
      setCartCount(prev => prev + 1);
      setSnackbar({
        open: true,
        message: "Product added to cart",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Please login first",
        severity: "error",
      });
    }
  };

  // 🔵 Loader
  if (loading) {
    return (
      <div style={loaderStyle}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div style={{ padding: "60px", paddingTop: "100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Fruits Category
      </Typography>

      {/* 🔔 Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Grid container spacing={3} justifyContent="center">
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            <Card
              sx={{
                height: "270px",
                width: "180px",
                boxShadow: 3,
                borderRadius: 3,
                padding: "8px",
                position: "relative",
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

const loaderStyle = {
  minHeight: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default Fruits;
