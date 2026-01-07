import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import API from "../api";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wishlist
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await API.get("/wishlist");
      setWishlistItems(res.data);
    } catch (err) {
      console.log("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    setLoading(true);
    try {
      await API.delete(`/wishlist/${productId}`);
      fetchWishlist();
    } catch (error) {
      console.log(error.response);
      setLoading(false);
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
        ❤️ Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography align="center">No items in wishlist</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 150, objectFit: "cover" }}
                />

                <CardContent>
                  <Typography>{item.name}</Typography>
                  <Typography>₹{item.price}</Typography>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

const loaderStyle = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Wishlist;
