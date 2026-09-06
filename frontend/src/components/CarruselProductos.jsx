import React from 'react';
import { IconoFavoritos, IconoUbicacion } from '../iconos';

export const INITIAL_PRODUCTS = [];

const CarruselProductos = ({
  products = [],
  searchQuery = '',
  selectedCategory = 'todos',
  favorites = [],
  onToggleFavorite = () => {},
  onSelectProduct = () => {},
  onAddToCart = () => {},
  onOpenTrueque = () => {},
}) => {
  // Filtrar productos por búsqueda y categoría
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="productos-section" aria-label="Productos en venta o trueque">
      <div className="section-header">
        <h2 className="section-title">Compra o intercambia</h2>
        <span className="section-subtitle-tag">{filteredProducts.length} disponibles</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state-container">
          <p className="empty-text">No encontramos productos en esta categoría o búsqueda.</p>
        </div>
      ) : (
        <div className="carrusel-horizontal-scroll">
          <div className="productos-track">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => onSelectProduct(product)}
                >
                  {/* Contenedor de Imagen */}
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                      loading="lazy"
                    />

                    {/* Botón de Favorito */}
                    <button
                      type="button"
                      className={`favorite-btn ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                      }}
                      aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      <IconoFavoritos size={20} color={isFav ? '#E11D48' : '#ffffff'} filled={isFav} />
                    </button>
                  </div>

                  {/* Información del Producto */}
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    
                    <div className="product-location">
                      <IconoUbicacion className="location-pin-icon" size={14} color="#1E293B" />
                      <span>{product.location}</span>
                    </div>

                    {/* Precio y Trueque */}
                    <div className="product-badges">
                      <span className="badge badge-price">
                        C$ {product.price}
                      </span>
                      {product.allowsTrueque && (
                        <button
                          type="button"
                          className="badge badge-trueque badge-clickable"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenTrueque(product);
                          }}
                          aria-label="Proponer trueque solidario"
                        >
                          Trueque
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CarruselProductos;
