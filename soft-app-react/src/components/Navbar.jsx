// src/components/Navbar.js
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/react.svg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Escucha los cambios de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const handleLogin = async () => {
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}> {/* Aquí puedes agregar un logo en lugar del texto */}
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Soft App</h1>
      </div>
      <div className="navbar-user">
        {user ? 
          <>
            <span>{user.displayName || user.email}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
          : 
          <>
            <button onClick={handleLogin}>Iniciar sesión</button>
          </>
        }
      </div>
    </header>
  );
};

export default Navbar;
