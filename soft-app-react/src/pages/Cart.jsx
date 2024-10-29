// src/pages/Cart.js
import { useEffect, useState } from "react";
import "../styles/Cart.css";
import ContactForm from "../components/ContactForm";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const clearCart = () => {
    setCartItems([]); // Limpia el estado
    localStorage.removeItem("cart"); // Elimina el carrito de localStorage
  };

  // Calcular el precio total
  const totalPrice = cartItems.reduce((total, product) => total + parseFloat(product.price), 0);

  return (
    <div className="cart-container">
      <h2>Productos en el Carrito</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="cart-list">
            {cartItems.map((product, index) => (
              <li key={index} className="cart-item">
                <img src={product.imageUrl} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Precio: ${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
          <button className="clear-cart-button" onClick={clearCart}>
            Limpiar Carrito
          </button>

          <div className="contact-section">
            <ContactForm />
          </div>
        </>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default Cart;
