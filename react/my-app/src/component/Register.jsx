// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate=useNavigate()

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("https://mini-project-57ws.onrender.com/api/register", {
//         name,
//         email,
//         password,
//       });
//       alert("User registered successfully!");
//       navigate('/') // redirect to login
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage:
//           "url('https://img.freepik.com/premium-photo/empty-wooden-table-with-beautiful-grocery-store-background-design_870512-11128.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "60px",paddingTop:"100px"
//       }}
//     >
//       <div
//         style={{
//           marginBottom:"80px",
//           width: "100%",
//           maxWidth: "350px",
//           textAlign: "center",
//         }}
//       >
//         <h2 style={{ color: "black", marginBottom: "20px" }}>Register</h2>

//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="Name"
//             onChange={(e) => setName(e.target.value)}
//             required
//             style={{
//                width: "100%",
//               padding: "12px",
//               marginBottom: "15px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               fontSize: "16px",
//               boxSizing: "border-box",
//             }}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//                width: "100%",
//               padding: "12px",
//               marginBottom: "15px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               fontSize: "16px",
//               boxSizing: "border-box",
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginBottom: "15px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               fontSize: "16px",
//               boxSizing: "border-box",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//                width: "100%",
//               padding: "12px",
//               backgroundColor: "black",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: "bold",
//               fontSize: "16px",
//               boxSizing: "border-box",
//             }}
//           >
//             Register
//           </button>
//         </form>

//         <p style={{ marginTop: "15px", fontSize: "14px" }}>
//           Already have an account?{" "}
//           <a href="/" style={{ color: "black", fontWeight: "bold" }}>
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;



import React, { useState } from "react";
import API from "../api";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]=useState(false);
  const [snackbar, setSnackbar]=useState({
    open:false,
    message:"",
    severity:"success",
  });
  const navigate=useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res=await API.post("/register",{name,email,password});
      localStorage.setItem("token", res.data.token);
      setSnackbar({
        open:true,
        message:"Login successful!",
        severity:"success",
      });
      setTimeout(()=>navigate("/"),1200) // redirect to login
    } catch (err) {
      setSnackbar({
        open:true,
        message:err.response?.data?.message || "Registration failed",
        severity:"error",
      });
    }finally{
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
            disabled={loading}
            style={inputStyle}
            
          />
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


export default Register;



