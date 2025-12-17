import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });
      alert("User registered successfully!");
      navigate('/') // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
        padding: "60px",paddingTop:"100px"
      }}
    >
      <div
        style={{
          marginBottom:"80px",
          width: "100%",
          maxWidth: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "black", marginBottom: "20px" }}>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
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
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
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
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
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
          <button
            type="submit"
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
            }}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "black", fontWeight: "bold" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;



