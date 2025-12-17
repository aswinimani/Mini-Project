import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import nutslogo from "../assets/nuts.png";
import juicelogo from "../assets/juice.png";
import masalalogo from "../assets/masala.png";

function Carousel() {
  const images = [
    { src: nutslogo, title: "Healthy nuts", subtitle: "Power-Packed with Protein & Energy" },
    { src: juicelogo, title: "Fresh juice", subtitle: "Perfect for Every Occasion" },
    { src: masalalogo, title: "Masala", subtitle: "Home-Made and Healthy" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "280px", sm: "350px", md: "400px" },  // responsive height
        overflow: "hidden",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img.src}
          alt={img.title}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}

      {/* Overlay Text */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          padding: "20px 30px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "32px",  // mobile small
              sm: "48px",  // tablet medium
              md: "64px",  // desktop large
            },
          }}
        >
          {images[current].title}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "18px",
              md: "20px",
            },
            marginTop: "8px",
          }}
        >
          {images[current].subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default Carousel;
