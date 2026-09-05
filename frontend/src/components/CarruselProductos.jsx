import React from 'react';
import { IconoFavoritos, IconoUbicacion } from '../iconos';

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: '12cena de Elotes',
    category: 'granos',
    location: 'San Marcos',
    price: 70,
    allowsTrueque: true,
    producer: 'Estela Rivas',
    producerId: 1,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    description: 'Elotes tiernos cosechados de forma agroecológica, sin químicos. Ideales para güirilas, atol o elotes cocidos.',
    truequeInterest: 'Acepto intercambio por abono orgánico o semillas de frijol.',
    unit: 'Docena',
    inStock: 15,
  },
  {
    id: 2,
    title: 'Aguacates',
    category: 'frutas',
    location: 'Jinotepe',
    price: 25,
    allowsTrueque: false,
    producer: 'Lucia Ruíz',
    producerId: 2,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    description: 'Aguacates mantequilla de gran tamaño, cremosos y recién cortados del huerto.',
    unit: 'Unidad',
    inStock: 30,
  },
  {
    id: 3,
    title: 'Cocos de Agua',
    category: 'frutas',
    location: 'Nandaime',
    price: 25,
    allowsTrueque: false,
    producer: 'Martha Campos',
    producerId: 3,
    image: 'https://th.bing.com/th/id/R.d9936350ff3ec84a7ab278a34190cc3d?rik=GcKacVPPBLxGyQ&pid=ImgRaw&r=0',
    description: 'Cocos frescos con abundante agua dulce y carne tierna. Cosechados en finca familiar.',
    unit: 'Unidad',
    inStock: 25,
  },
  {
    id: 4,
    title: 'Plátanos Verdes',
    category: 'verduras',
    location: 'Rivas',
    price: 40,
    allowsTrueque: true,
    producer: 'Rosa Morales',
    producerId: 4,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    description: 'Plátanos gigantes de primera calidad para tostones o tajadas.',
    truequeInterest: 'Intercambio por plantas aromáticas o miel pura.',
    unit: 'Docena',
    inStock: 20,
  },
  {
    id: 5,
    title: 'Miel de Abeja Pura',
    category: 'artesanias',
    location: 'Masaya',
    price: 120,
    allowsTrueque: true,
    producer: 'Carmen Ortiz',
    producerId: 5,
    image: 'https://tse1.mm.bing.net/th/id/OIP.MFRJomr9El23d-GgOfXAPgHaE0?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Miel de floración silvestre 100% pura y natural, extraída artesanalmente por cooperativa de mujeres.',
    truequeInterest: 'Acepto café en grano o frutas de temporada.',
    unit: 'Botella 500ml',
    inStock: 12,
  },
  {
    id: 6,
    title: 'Frijol Rojo Criollo',
    category: 'granos',
    location: 'Carazo',
    price: 130,
    allowsTrueque: true,
    producer: 'Estela Rivas',
    producerId: 1,
    image: 'https://th.bing.com/th/id/R.5459428196f5d1ee81a82ce2f011999b?rik=FJqPfUWK0kMOHQ&pid=ImgRaw&r=0',
    description: 'Frijol nuevo de seda, suave y de rápida cocción. Semilla criolla preservada.',
    truequeInterest: 'Intercambio por maíz blanco o herramientas de mano.',
    unit: 'Bolsa 5 lbs',
    inStock: 18,
  },
];

const CarruselProductos = ({
  products = INITIAL_PRODUCTS,
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
