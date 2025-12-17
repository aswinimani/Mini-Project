import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);

    // If you want to clear cart:
    localStorage.removeItem("cart");

    // Optional: Navigate to home after cancel
    setTimeout(() => navigate("/home"), 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        background: "#f7f7f7",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        {/* SUCCESS OR CANCEL STATUS */}
        <div
          style={{
            height: "90px",
            width: "90px",
            margin: "auto",
            borderRadius: "50%",
            backgroundColor: cancelled ? "#E53935" : "#4CAF50",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            animation: "pop 0.4s ease-out",
          }}
        >
          <span
            style={{
              fontSize: "50px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {cancelled ? "✕" : "✓"}
          </span>
        </div>

        <h1 style={{ marginBottom: "10px" }}>
          {cancelled ? "Order Cancelled" : "Order Confirmed!"}
        </h1>

        <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
          {cancelled
            ? "Your order has been cancelled successfully."
            : "Thank you for your purchase. Your order has been placed successfully."}
        </p>

        <hr style={{ margin: "20px 0" }} />

        {!cancelled && (
          <>
            {/* TRACK ORDER BUTTON */}
            <button
              onClick={() => navigate("/track")}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                width: "100%",
                cursor: "pointer",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              Track Order
            </button>

            {/* CANCEL ORDER BUTTON */}
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#E53935",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                width: "100%",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Cancel Order
            </button>
          </>
        )}

        {/* CSS Animation */}
        <style>
          {`
            @keyframes pop {
              0% { transform: scale(0.5); opacity: 0.5; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default Order;
