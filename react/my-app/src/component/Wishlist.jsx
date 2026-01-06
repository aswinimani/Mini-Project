import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import API from "../api";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ✅ Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setWishlistItems(res.data);
    } catch (err) {
      console.log("Wishlist error:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ✅ Remove from wishlist
  // const removeFromWishlist = async (productId) => {
  //   try {
  //     await API.post("/wishlist/remove", { productId });

  //     setWishlistItems((prev) =>
  //       prev.filter((item) => item.product._id !== productId)
  //     );
  //   } catch (err) {
  //     console.log("Remove wishlist error:", err);
  //   }
  // };


  const removeFromWishlist = async (productId) => {
  try {
    const res = await API.delete(`/wishlist/${productId}`);
    setWishlistItems(res.data);
    fetchWishlist()
  } catch (error) {
    console.log(error.response);
  }
};

  return (
    <div style={{ padding: "60px", paddingTop: "100px" }}>
      <Typography variant="h4" align="center">
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
                  style={{ width: "100%", height: 150 }}
                />

                <CardContent>
                  <Typography>{item.name}</Typography>
                  <Typography>₹{item.price}</Typography>

                  <Button
                  variant="contained"
                    color="error"
                    size="small"
                    sx={{mt:1}}
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
