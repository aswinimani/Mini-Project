import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleBuy = (item) => {
    navigate("/buy", { state: { products: [item] } });
  };

  const handleBuyAll = () => {
    navigate("/buy", { state: { products: cartItems } });
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div style={{ padding: "60px", paddingTop: "100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        🛒 Your Cart
      </Typography>

      {/* BUY ALL BUTTON */}
      {cartItems.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ borderRadius: 2 }}
            onClick={handleBuyAll}
          >
            Buy All
          </Button>
        </div>
      )}

      {cartItems.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No items in your cart.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {cartItems.map((item) => (
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
                  <Typography sx={{ color: "#444" }}>₹{item.price}</Typography>

                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleBuy(item)}
                  >
                    Buy Now
                  </Button>

                  <br />

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => removeFromCart(item._id)}
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

export default Cart;
