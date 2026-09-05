import { useState } from 'react';
import {
  IconoRegresar,
  IconoUbicacion,
  IconoFavoritos,
  IconoCarrito,
  IconoTrueque,
} from '../iconos';

const DetalleProducto = ({
  product,
  onBack = () => {},
  onAddToCart = () => {},
  onOpenTrueque = () => {},
  isFavorite = false,
  onToggleFavorite = () => {},
  onViewProducer = () => {},
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="product-detail-screen animate-fade-in">
      {/* Imagen del Producto y Botón Regresar */}
      <div className="detail-hero-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="detail-hero-image"
        />

        {/* Botón de Regresar  */}
        <button
          type="button"
          className="detail-back-btn"
          onClick={onBack}
          aria-label="Regresar"
        >
          <IconoRegresar size={22} color="#FFFFFF" strokeWidth={3} />
        </button>
      </div>

      <div className="detail-content-body">
        {/*Información Principal del Producto */}
        <div className="detail-card main-info-card">
          <div className="detail-header-row">
            <div className="detail-title-col">
              <h1 className="detail-product-title">{product.title}</h1>
              <div className="detail-location-row">
                <IconoUbicacion className="detail-location-icon" size={16} color="#27C064" />
                <span>{product.location}, Nicaragua</span>
              </div>
            </div>

            {/* Botón Favorito */}
            <button
              type="button"
              className={`detail-fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(product.id)}
              aria-label="Favorito"
            >
              <IconoFavoritos size={20} color={isFavorite ? '#E81E73' : '#0F172A'} filled={isFavorite} />
            </button>
          </div>

          {/* Precio y Unidad  */}
          <div className="detail-price-row">
            <span className="detail-price-amount">C${product.price}</span>
            <span className="detail-price-unit"> / {product.unit || 'Unidad'}</span>
          </div>

          {/* Productora */}
          {product.producer && (
            <div
              className="detail-producer-badge"
              onClick={() => onViewProducer(product.producer)}
            >
              <span>Productora: <strong>{product.producer}</strong></span>
              <span className="detail-producer-arrow">›</span>
            </div>
          )}
        </div>

        {/* Selector de Cantidad a Ordenar */}
        <div className="detail-card quantity-card">
          <div className="quantity-label-box">
            <span className="quantity-title">Cantidad a ordenar</span>
            <span className="quantity-total-text">Total: C${totalPrice}</span>
          </div>

          <div className="quantity-stepper-pill">
            <button
              type="button"
              className="stepper-btn plus-btn"
              onClick={handleIncrease}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
            <span className="stepper-value">{quantity}</span>
            <button
              type="button"
              className="stepper-btn minus-btn"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
            >
              -
            </button>
          </div>
        </div>

        {product.description && (
          <div className="detail-card description-card">
            <h3 className="detail-card-subtitle">Detalles del cultivo</h3>
            <p className="detail-description-text">{product.description}</p>
          </div>
        )}

        <div className="detail-actions-container">
          <button
            type="button"
            className="detail-action-btn btn-add-cart"
            onClick={() => onAddToCart(product, quantity)}
          >
            <IconoCarrito className="btn-icon" size={20} color="currentColor" />
            <span>Añadir al carrito</span>
          </button>

          <button
            type="button"
            className="detail-action-btn btn-open-trueque"
            onClick={() => onOpenTrueque(product)}
          >
            <IconoTrueque size={20} color="currentColor" />
            <span>Propuesta de Trueque</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
