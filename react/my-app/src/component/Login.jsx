import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import API from "../api";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/login", { email, password });
        
        

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ⭐ IMPORTANT: App.js-ku notify pannrom
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Login failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔵 Fullscreen Loader */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} />
        </div>
      )}

      {/* 🔔 Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

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
          padding: "60px",
          paddingTop: "100px",
        }}
      >
        <div
          style={{
            marginBottom: "80px",
            width: "100%",
            maxWidth: "300px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "black", marginBottom: "20px" }}>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              Login
            </button>
          </form>

          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            Don’t have an account?{" "}
            <a href="/register" style={{ color: "black", fontWeight: "bold" }}>
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Login;
