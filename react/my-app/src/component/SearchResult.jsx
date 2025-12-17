import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

function SearchResult() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 🛑 IMPORTANT: Convert id → _id (cart page expects _id)
    const item = { ...product, _id: product._id || product.id };

    const exists = cart.some((c) => c._id === item._id);
    if (!exists) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart");
    } else {
      alert("Already in cart");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        const filtered = res.data.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
      });
  }, [query]);

  return (
        <div style={{ padding: "60px",paddingTop:"100px" }}>
      <Typography variant="h4"align="center" gutterBottom>
        Search Results 
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id || p.id}>
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
              }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: 3,
                  marginTop: "10px",
                }}
              />
              <CardContent sx={{ textAlign: "center", padding: "10px" }}>
                <Typography variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}>
                    {p.name}
                    </Typography>
                <Typography sx={{ color: "#555", mb: 1 }}>₹{p.price}</Typography>
                <Typography>{p.category}</Typography>

                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  onClick={() => addToCart(p)}
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

export default SearchResult;
