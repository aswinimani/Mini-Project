import React from "react";
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
  return (
    <BrowserRouter>
    <Appbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/products"element={<Product/>}/>
        <Route path="/profile"element={<Profile/>}/>
        <Route path="/store"element={<Store/>}/>
        <Route path="/cart"element={<Cart/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/buy"element={<Buy/>}/>
        <Route path="/order"element={<Order/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/category/Fruits" element={<Fruits/>}/>
        <Route path="/category/Vegetables" element={<Vegetables/>}/> 
        <Route path="/category/Masala"element={<Masala/>}/>
        <Route path="/category/Nuts"element={<Nuts/>}/> 
        <Route path="/category/Seeds"element={<Seeds/>}/> 
        <Route path="/category/Rice"element={<Rice/>}/>
        <Route path="/category/Juice"element={<Juice/>}/> 
        <Route path="/category/MilkProduct"element={<MilkProduct/>}/> 
        <Route path="/search" element={<SearchResult/>}/>
        <Route path="/productdetails" element={<ProductDetails/>}/>
        <Route path="/track" element={<Track/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;