import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Cart({setCartCount}) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // 🔵 loader state
  const navigate = useNavigate();

  // ✅ Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data);
    } catch (err) {
      console.log("Cart fetch error:", err);
    } finally {
      setLoading(false); // 🔵 stop loader
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Remove from cart
  const removeFromCart = async (productId) => {
    try {
      await API.post("/cart/remove", { productId });
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
      setCartCount(prev => Math.max(prev - 1, 0));
    } catch (err) {
      console.log("Remove cart error:", err);
      
    }
  };

  // ✅ Buy single product
  const buyProduct = (product) => {
    navigate("/buy", { state: { products: [product] } });
  };

  // ✅ Buy all products
  const buyAllProducts = () => {
    navigate("/buy", {
      state: { products: cartItems.map((item) => item.product) },
    });
  };

  // 🔵 Loader UI
  if (loading) {
    return (
      <div style={loaderStyle}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div style={{ padding: "60px", paddingTop: "100px" }}>
      <Typography variant="h4" align="center">
        🛒 Your Cart
      </Typography>

      {cartItems.length > 0 && (
        <Box textAlign="center" mb={3}>
          <Button variant="contained" color="success" onClick={buyAllProducts}>
            Buy All
          </Button>
        </Box>
      )}

      {cartItems.length === 0 ? (
        <Typography align="center">No items in cart</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: "100%", height: 150 }}
                />
                <CardContent>
                  <Typography>{item.product.name}</Typography>
                  <Typography>₹{item.product.price}</Typography>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ mt: 1, mr: 1 }}
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => buyProduct(item.product)}
                  >
                    Buy
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
  justifyContent: "center",
  alignItems: "center",
};

export default Cart;
