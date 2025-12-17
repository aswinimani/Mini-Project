import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Store() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      alert("Please fill all fields!");
      return;
    }

    const newProduct = { name, category, price, image };

    try {
      await axios.post("http://localhost:5000/api/store", newProduct);
      // alert("Product added successfully!");
      // navigate("/products");
      setName("");
      setCategory("");
      setPrice("");
      setImage("");
    } catch (err) {
      alert("Error adding product!");
      console.error(err);
    }
  };

  return (
    <div
    style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/empty-wooden-table-with-beautiful-grocery-store-background-design_870512-11128.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
    <div style={{
          marginBottom:"80px",
          width: "100%",
          maxWidth: "350px",
          textAlign: "center",
          padding: "30px",
        }}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
               width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
      />
      

      <select value={category} onChange={(e) => setCategory(e.target.value)}
        style={{
               width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}>
        <option value="">Select Category</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Rice">Rice</option>
        <option value="MilkProduct">MilkProduct</option>
        <option value="Juice">Juice</option>
        <option value="Seeds">Seeds</option>
        <option value="Nuts">Nuts</option>
        <option value="Masala">Masala</option>
      </select>
      

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
               width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
      />
      

      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 image string
      };
      reader.readAsDataURL(file);
    }
  }}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    backgroundColor: "#ccc",
    color:"black",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  }}
/>


      <button onClick={handleSubmit}
      style={{
               width: "100%",
              padding: "12px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              boxSizing: "border-box",
            }}>Submit</button>
    </div>
    </div>
  );
}

export default Store;
