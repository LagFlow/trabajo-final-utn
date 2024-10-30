// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ContactForm from "../components/ContactForm";
import CartIcon from "../components/CartIcon";
import { fetchProducts } from "../services/products";
import { auth } from "../config/firebase";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Inicializa el carrito con los productos de localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!auth.currentUser);
  }, [auth.currentUser]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guarda en localStorage
    } else {
      alert("Debe cerrar sesión para poder agregar productos al carrito.");
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="home-container">
      <h1 className="title">Lista de Productos</h1>
      <CartIcon cartCount={cart.length} onClick={goToCart} />
      <div className="product-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="product-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
            </div>
          ))
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))
        )}
      </div>
      <ContactForm />
    </div>
  );
};

export default Home;
