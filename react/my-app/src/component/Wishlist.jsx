import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(stored);
  }, []);

  // 💔 Remove from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    // alert("Removed from wishlist 💔");
  };

  return (
    <div style={{ padding: "60px",paddingTop:"100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
         Your Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No items in your wishlist.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, padding: "10px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    borderRadius: 3,
                  }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography sx={{ color: "#444" }}>
                    ₹{item.price}
                  </Typography>

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

export default Wishlist;
