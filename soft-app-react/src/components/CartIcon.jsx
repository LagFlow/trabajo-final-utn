// src/components/CartIcon.js
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Usa react-icons para el ícono de carrito
import "../styles/CartIcon.css";

const CartIcon = ({ cartCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cart"); // Navegar a la pantalla del carrito
  };

  return (
    <div className="cart-icon" onClick={handleClick}>
      <FaShoppingCart size={24} />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  );
};

export default CartIcon;
