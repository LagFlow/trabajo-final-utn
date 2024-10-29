// src/pages/Login.js
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-products");
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/admin-products");
    } catch (err) {
      setError("Error al iniciar sesión con Google: " + err.message);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="submit">Login</button>
          <button onClick={handleLoginWithGoogle}>
            Iniciar sesión con Google
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
