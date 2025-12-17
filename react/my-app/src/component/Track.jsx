import React from "react";
import { useNavigate } from "react-router-dom";

function Track({ completedSteps = 3 }) {
  const navigate = useNavigate();

  const steps = [
    "Order Placed",
    "Order Paid",
    "Order Shipped",
    "Order Delivered",
    "Order Complete",
  ];

  return (
    <div
      style={{
        padding: "40px 20px",
        paddingTop: "100px",
        fontFamily: "Inter, Roboto, sans-serif",
      }}
    >
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        {/* VERTICAL STEPS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {steps.map((label, idx) => {
            const isDone = idx + 1 <= completedSteps;

            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    height: 32,
                    width: 32,
                    borderRadius: "50%",
                    background: isDone
                      ? "linear-gradient(180deg,#6A00F4,#8A2BE2)"
                      : "#fff",
                    boxShadow: isDone
                      ? "0 4px 10px rgba(106,0,244,0.18)"
                      : "0 0 0 2px #D6DAE6 inset",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isDone ? "#fff" : "#6B7280",
                    fontWeight: 700,
                  }}
                >
                  {isDone ? "✓" : ""}
                </div>

                {/* Icon + Label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 20 }}>
                    {idx === 0 && "📝"}
                    {idx === 1 && "💳"}
                    {idx === 2 && "📦"}
                    {idx === 3 && "🚚"}
                    {idx === 4 && "🏁"}
                  </span>

                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: isDone ? "#111827" : "#6B7280",
                      opacity: isDone ? 1 : 0.6,
                    }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping Button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => navigate("/home")}
            style={{
              backgroundColor: "#6A00F4",
              color: "white",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(106,0,244,0.3)",
              transition: "0.3s",
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Track;

