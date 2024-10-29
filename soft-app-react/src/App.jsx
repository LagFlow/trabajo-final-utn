// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminProducts from "./pages/AdminProducts";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ marginTop: "100px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin-products"
              element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={ <Cart /> }/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
