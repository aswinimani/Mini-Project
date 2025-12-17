import React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fruit from "../assets/fff.jpg";

function Product() {
  const navigate = useNavigate();

  const categories = [
    { name: "Fruits", img: fruit },
    { name: "Vegetables", img: "https://wallpaperaccess.com/full/1306571.jpg" },
    { name: "Masala", img: "https://static.vecteezy.com/system/resources/thumbnails/026/718/888/small_2x/indian-spices-close-up-pepper-turmeric-thyme-paprika-cumin-generative-ai-free-photo.jpg" },
    { name: "Seeds", img: "https://images6.alphacoders.com/411/thumb-1920-411545.jpg" },
    { name: "Nuts", img: "https://png.pngtree.com/thumb_back/fw800/background/20240102/pngtree-infinite-vector-texture-of-delectable-dried-fruits-and-nuts-image_13904752.png" },
    { name: "Rice", img: "https://i0.wp.com/lareine.com.kh/wp-content/uploads/2018/03/rice-field-rainbow-background-footage-011898394_prevstill.jpeg?w=1000&ssl=1" },
    { name: "MilkProduct", img: "https://tse3.mm.bing.net/th/id/OIP._odZVp1ouPQm4Znj8LsCPAHaEJ?pid=Api&P=0&h=180" },
    { name: "Juice", img: "https://static.vecteezy.com/system/resources/previews/030/088/223/large_2x/fresh-juice-with-fruits-and-vegetables-on-a-dark-background-ai-generated-free-photo.jpg" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700445788-1024x640.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ padding: "60px" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold",color:"white" }}
        >
          Product Categories
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {categories.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.name}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                  transition: "0.3s",
                }}
              >
                <CardActionArea 
                onClick={() => navigate(`/category/${item.name}`)}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: 3,
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Product;





