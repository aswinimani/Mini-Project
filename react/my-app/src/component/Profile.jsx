import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate=useNavigate();

    const handle_click = () => {
        if (username === "Aswini" && password === "2003") {
            alert("Successfull!");
            navigate("/store")
        } else {
            alert("Invalid username and password!");
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
            <div
                style={{
                    marginBottom: "80px",
                    width: "100%",
                    maxWidth: "350px",
                    textAlign: "center",
                    padding: "30px",
                }}>
                <h1>Admin</h1>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        boxSizing: "border-box",
                    }} />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        boxSizing: "border-box",
                    }} />

                <button onClick={handle_click}
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
    )
}
export default Profile;