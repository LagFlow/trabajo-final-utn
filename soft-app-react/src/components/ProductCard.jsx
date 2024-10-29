/* eslint-disable react/prop-types */
import "../styles/AdminProducts.css";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      </div>
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Precio: ${product.price}</p>
        <button onClick={addToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
