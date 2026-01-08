import React ,{useState,useEffect} from "react";
import API from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Appbar from "./component/Appbar";
import Home from "./component/Home";
import Product from "./component/Product";
import Cart from "./component/Cart";
import Store from "./component/Store";
import Fruits from "./component/Fruits";
import Vegetables from "./component/Vegetables";
import Wishlist from "./component/Wishlist";
import Masala from "./component/Masala";
import Nuts from "./component/Nuts";
import Seeds from "./component/Seeds";
import Rice from "./component/Rice";
import Juice from "./component/Juice";
import MilkProduct from "./component/MilkProduct";
import Profile from "./component/Profile";
import Buy from "./component/Buy";
import Order from "./component/Order";
import SearchResult from "./component/SearchResult";
import ProductDetails from "./component/ProductDetails";
import Track from "./component/Track";



function App() {
  
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ⭐ REFRESH SUPPORT

    const fetchCounts = async () => {
      const token = localStorage.getItem("token");

      // ❌ not logged in
      if (!token) {
        setCartCount(0);
        setWishlistCount(0);
        return;
      }
      try {
        const cartRes = await API.get("/cart");
        setCartCount(cartRes.data.length);

        const wishRes = await API.get("/wishlist");
        setWishlistCount(wishRes.data.length);
      } catch (err) {
        console.log("Count fetch error", err);
      }
    };

    useEffect(()=>{
    fetchCounts();
  }, []);
  return (
    <BrowserRouter>
    <Appbar 
    cartCount={cartCount}
        wishlistCount={wishlistCount}
        setCartCount={setCartCount}
        setWishlistCount={setWishlistCount}/>
      <Routes>

        <Route path="/" element={<Login onLoginSuccess={fetchCounts} />}/>

        <Route path="/home" element={<Home />} />
        <Route path="/products"element={<Product/>}/>
        <Route path="/profile"element={<Profile/>}/>
        <Route path="/store"element={<Store/>}/>
        
        <Route path="/cart"element={<Cart setCartCount={setCartCount}/>}/>

        <Route path="/register" element={<Register />} />
        <Route path="/buy"element={<Buy/>}/>
        <Route path="/order"element={<Order/>}/>

        <Route path="/wishlist" element={<Wishlist setWishlistCount={setWishlistCount}/>}/>

        <Route path="/category/Fruits" element={<Fruits setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/>
        <Route path="/category/Vegetables" element={<Vegetables setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/> 
        <Route path="/category/Masala"element={<Masala setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/>
        <Route path="/category/Nuts"element={<Nuts setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/> 
        <Route path="/category/Seeds"element={<Seeds setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/> 
        <Route path="/category/Rice"element={<Rice setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/>
        <Route path="/category/Juice"element={<Juice setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/> 
        <Route path="/category/MilkProduct"element={<MilkProduct setCartCount={setCartCount}
              setWishlistCount={setWishlistCount}/>}/> 

        <Route path="/search" element={<SearchResult />}/>
        <Route path="/productdetails" element={<ProductDetails/>}/>
        <Route path="/track" element={<Track/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;