import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) return <p>No product selected</p>;

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 400, borderRadius: "20px", padding: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover", borderRadius: "10px" }}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h6" sx={{ color: "green", mt: 1 }}>
            ₹{product.price}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Category: {product.category}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetails;
