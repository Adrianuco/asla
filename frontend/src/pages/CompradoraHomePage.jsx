import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import CarruselProductos, { INITIAL_PRODUCTS } from '../components/CarruselProductos';
import Productoras, { PRODUCERS, ProductorasView } from '../components/Productoras';
import DetalleProducto from '../components/DetalleProducto';
import PerfilProductora from '../components/PerfilProductora';
import PerfilUsuario from '../components/PerfilUsuario';
import ModalTrueque from '../components/ModalTrueque';
import Carrito from '../components/Carrito';
import RegistroUsuario from '../components/RegistroUsuario';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { IconoUbicacion, IconoFavoritos, IconoRegresar } from '../iconos';

const CompradoraHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Estado de navegación inferior: 'inicio' | 'productoras' | 'favoritos' | 'perfil'
  const [activeTab, setActiveTab] = useState('inicio');

  // Estado de autenticación / registro: null | 'register' | 'login'
  const [authScreen, setAuthScreen] = useState(null);

  // Estado de búsqueda y filtros en Inicio
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Estado de favoritos separados para productos y productoras
  const [favoriteProducts, setFavoriteProducts] = useState([1, 2]);
  const [favoriteProducers, setFavoriteProducers] = useState([1]);
  const [favTabFilter, setFavTabFilter] = useState('todos');

  // Estado del carrito de compras
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado de vistas en pantalla completa
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [truequeTargetProduct, setTruequeTargetProduct] = useState(null);
  const [selectedBannerEvent, setSelectedBannerEvent] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Estado de Notificación / Toast
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (location.state?.usuario) {
      try {
        localStorage.setItem("asla_usuario_comprador", JSON.stringify(location.state.usuario));
      } catch (e) {
        console.error(e);
      }
    }
    if (location.state?.mensajeBienvenida) {
      showToast(location.state.mensajeBienvenida);
    }
  }, [location.state]);

  // Manejo de Favoritos de Productos
  const handleToggleFavoriteProduct = (productId) => {
    setFavoriteProducts((prev) => {
      if (prev.includes(productId)) {
        showToast('Producto eliminado de favoritos');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('❤️ Producto añadido a tus favoritos');
        return [...prev, productId];
      }
    });
  };

  // Manejo de Favoritos / Seguir Productoras
  const handleToggleFavoriteProducer = (producerId) => {
    const producerObj = PRODUCERS.find((p) => p.id === producerId);
    const name = producerObj ? producerObj.name : 'la productora';
    setFavoriteProducers((prev) => {
      if (prev.includes(producerId)) {
        showToast(`Dejaste de seguir a ${name}`);
        return prev.filter((id) => id !== producerId);
      } else {
        showToast(`❤️ Siguiendo a ${name}`);
        return [...prev, producerId];
      }
    });
  };

  // Manejo de Carrito
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`🛒 ${quantity > 1 ? `${quantity}x ` : ''}${product.title} añadido al carrito`);
  };

  const handleUpdateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Abrir modal de trueque
  const handleOpenTrueque = (product) => {
    setTruequeTargetProduct(product);
  };

  // Enviar propuesta de trueque por WhatsApp a la productora
  const handleSubmitTrueque = (e) => {
    e.preventDefault();
    if (!truequeTargetProduct) return;

    const formData = new FormData(e.target);
    const offer = formData.get('offer') || '';
    const meetingPlace = formData.get('location') || truequeTargetProduct.location || 'Nicaragua';
    const message = formData.get('message') || '';

    const phone = '50588991122'; // Teléfono WhatsApp de la red de productoras
    const whatsappText = encodeURIComponent(
      `¡Hola Doña ${truequeTargetProduct.producer}! 🌾🤝\n` +
      `Te contacto a través de la aplicación *Asla* con una propuesta de *Trueque Solidario*:\n\n` +
      `• *Producto de interés:* ${truequeTargetProduct.title}\n` +
      `• *Lo que ofrezco a cambio:* ${offer}\n` +
      `• *Lugar/Comunidad sugerida:* ${meetingPlace}\n\n` +
      `*Mensaje:* "${message}"\n\n` +
      `¿Tenés disponibilidad para coordinar este intercambio?`
    );

    // Abrir WhatsApp de la productora
    window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');

    showToast(`🌾 ¡Abriendo WhatsApp con ${truequeTargetProduct.producer}!`);
    setTruequeTargetProduct(null);
  };

  // Si estamos en la pantalla de registro, renderizar como pantalla aparte independiente (sin headers de la app ni menú)
  if (authScreen === 'register') {
    return (
      <>
        <RegistroUsuario
          onBack={() => setAuthScreen(null)}
          onRegisterSuccess={(newUser) => {
            showToast(`¡Bienvenida a Asla, ${newUser.name}! 🌱`);
            setAuthScreen(null);
            setActiveTab('inicio');
          }}
          onNavigateLogin={() => {
            navigate('/login');
          }}
        />
        {toast && <div className="toast-notification">{toast}</div>}
      </>
    );
  }

  return (
    <div className="app-layout">
      <div className="mobile-frame-container">
        {/* Header Superior solo cuando no hay pantalla completa activa y estamos en Inicio */}
        {!selectedProduct && !selectedProducer && !isCartOpen && activeTab === 'inicio' && (
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            cartCount={cartItemCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* Contenido Dinámico según la Selección o la Pestaña */}
        <main className="main-content-area">
          {isCartOpen ? (
            /* Pantalla Completa de Carrito de Compras (Carpeta: /carrito) */
            <Carrito
              cart={cart}
              onBack={() => setIsCartOpen(false)}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={(id) => setCart((prev) => prev.filter((item) => item.id !== id))}
              onClearCart={() => {
                setCart([]);
                showToast('Carrito vaciado');
              }}
              onOpenProduct={(prod) => {
                setIsCartOpen(false);
                setSelectedProduct(prod);
              }}
            />
          ) : selectedProduct ? (
            /* Pantalla Completa de Detalle de Producto */
            <DetalleProducto
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onAddToCart={(prod, qty) => {
                handleAddToCart(prod, qty);
              }}
              onOpenTrueque={(prod) => handleOpenTrueque(prod)}
              isFavorite={favoriteProducts.includes(selectedProduct.id)}
              onToggleFavorite={() => handleToggleFavoriteProduct(selectedProduct.id)}
              onViewProducer={(prodName) => {
                const found = PRODUCERS.find((p) => p.name === prodName);
                if (found) {
                  setSelectedProduct(null);
                  setSelectedProducer(found);
                }
              }}
            />
          ) : selectedProducer ? (
            /* Pantalla Completa de Perfil de la Productora  */
            <PerfilProductora
              producer={selectedProducer}
              onBack={() => setSelectedProducer(null)}
              onSelectProduct={(prod) => {
                setSelectedProduct(prod);
              }}
              isFavorite={favoriteProducers.includes(selectedProducer.id)}
              onToggleFavorite={() => handleToggleFavoriteProducer(selectedProducer.id)}
            />
          ) : (
            <>
              {activeTab === 'inicio' && (
                <div className="home-view-container animate-fade-in">
                  {/* Carrusel / Banner de Ferias y Eventos */}
                  <Banner onBannerClick={(slide) => setSelectedBannerEvent(slide)} />

                  {/* Carrusel de Productos: Compra o intercambia */}
                  <CarruselProductos
                    products={INITIAL_PRODUCTS}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    favorites={favoriteProducts}
                    onToggleFavorite={handleToggleFavoriteProduct}
                    onSelectProduct={(prod) => setSelectedProduct(prod)}
                    onAddToCart={handleAddToCart}
                    onOpenTrueque={(prod) => handleOpenTrueque(prod)}
                  />

                  {/* Componente Productoras: Productoras cerca de vos */}
                  <Productoras
                    onSelectProducer={(prod) => setSelectedProducer(prod)}
                    onSeeAll={() => setActiveTab('productoras')}
                  />

                  {/* Footer */}
                  <Footer onNavigate={(tab) => setActiveTab(tab)} />
                </div>
              )}

              {activeTab === 'productoras' && (
                <ProductorasView
                  onSelectProducer={(prod) => setSelectedProducer(prod)}
                  favorites={favoriteProducers}
                  onToggleFavorite={handleToggleFavoriteProducer}
                />
              )}

              {activeTab === 'favoritos' && (
                <div className="tab-view favorites-view animate-fade-in">
                  {/* Header Superior Verde Estándar */}
                  <div className="standard-screen-header">
                    <button
                      type="button"
                      className="standard-back-btn"
                      onClick={() => setActiveTab('inicio')}
                      aria-label="Regresar a inicio"
                    >
                      <IconoRegresar size={22} color="#FFFFFF" strokeWidth={3} />
                    </button>
                    <h1 className="standard-screen-title">Mis Favoritos</h1>
                    <div className="standard-header-spacer" />
                  </div>

                  <div className="favorites-body-container">
                    {/* 3 Botones de Filtro en la parte superior: Todos | Productoras | Productos */}
                    <div className="favorites-filter-capsule">
                      <button
                        type="button"
                        className={`fav-capsule-btn ${favTabFilter === 'todos' ? 'active' : ''}`}
                        onClick={() => setFavTabFilter('todos')}
                      >
                        Todos
                      </button>
                      <button
                        type="button"
                        className={`fav-capsule-btn ${favTabFilter === 'productoras' ? 'active' : ''}`}
                        onClick={() => setFavTabFilter('productoras')}
                      >
                        Productoras
                      </button>
                      <button
                        type="button"
                        className={`fav-capsule-btn ${favTabFilter === 'productos' ? 'active' : ''}`}
                        onClick={() => setFavTabFilter('productos')}
                      >
                        Productos
                      </button>
                    </div>

                    {/* Estados Vacíos según el Filtro Seleccionado */}
                    {favTabFilter === 'todos' && favoriteProducers.length === 0 && favoriteProducts.length === 0 && (
                      <div className="empty-state-box">
                        <span className="empty-emoji">💚</span>
                        <p>Aún no tienes productos ni productoras en tus favoritos.</p>
                        <button className="action-btn-secondary" onClick={() => setActiveTab('inicio')}>
                          Explorar en Inicio
                        </button>
                      </div>
                    )}

                    {favTabFilter === 'productoras' && favoriteProducers.length === 0 && (
                      <div className="empty-state-box">
                        <span className="empty-emoji">👩‍🌾</span>
                        <p>Aún no sigues a ninguna productora en tus favoritos.</p>
                        <button className="action-btn-secondary" onClick={() => setActiveTab('productoras')}>
                          Explorar Productoras
                        </button>
                      </div>
                    )}

                    {favTabFilter === 'productos' && favoriteProducts.length === 0 && (
                      <div className="empty-state-box">
                        <span className="empty-emoji">🌱</span>
                        <p>Aún no tienes cosechas o productos en tus favoritos.</p>
                        <button className="action-btn-secondary" onClick={() => setActiveTab('inicio')}>
                          Explorar Cosechas
                        </button>
                      </div>
                    )}

                    <div className="favorites-content-sections">
                      {/* Sección: Productoras Seguidas */}
                      {(favTabFilter === 'todos' || favTabFilter === 'productoras') && favoriteProducers.length > 0 && (
                        <div className="fav-section-block">
                          <h3 className="fav-section-title">
                             Productoras que sigues ({favoriteProducers.length})
                          </h3>
                          <div className="productoras-cards-feed">
                            {PRODUCERS.filter((p) => favoriteProducers.includes(p.id)).map((producer) => (
                              <div
                                key={producer.id}
                                className="productora-feed-card"
                                onClick={() => setSelectedProducer(producer)}
                              >
                                {/* Cabecera de la Tarjeta */}
                                <div className="feed-card-header">
                                  {/* Avatar con borde */}
                                  <div className="feed-avatar-ring">
                                    <img
                                      src={producer.avatar}
                                      alt={producer.name}
                                      className="feed-avatar-img"
                                    />
                                  </div>

                                  {/* Datos de la Productora */}
                                  <div className="feed-header-info">
                                    <div className="feed-name-row">
                                      <h3 className="feed-producer-name">{producer.name}</h3>
                                      <button
                                        type="button"
                                        className="feed-heart-btn active"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleFavoriteProducer(producer.id);
                                        }}
                                        aria-label="Favorito"
                                      >
                                        <IconoFavoritos size={20} color="#E81E73" filled={true} />
                                      </button>
                                    </div>

                                    {/* Ubicación */}
                                    <div className="feed-meta-row">
                                      <span className="feed-location">
                                        <IconoUbicacion className="feed-pin-icon" size={16} color="#E81E73" />
                                        {producer.location}
                                      </span>
                                    </div>

                                    {/* Píldoras de Productos de la Productora  */}
                                    <div className="feed-tags-row">
                                      {producer.tags.map((tag, idx) => (
                                        <span key={idx} className="feed-tag-pill">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Cuadrícula con Fotos de Productos */}
                                {producer.productsPreview && producer.productsPreview.length > 0 && (
                                  <div className="feed-products-grid-box">
                                    {producer.productsPreview.map((prod, pIdx) => (
                                      <div key={pIdx} className="feed-product-thumb-container">
                                        <img
                                          src={prod.image}
                                          alt={prod.name}
                                          className="feed-product-thumb"
                                          loading="lazy"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sección: Productos Guardados */}
                      {(favTabFilter === 'todos' || favTabFilter === 'productos') && favoriteProducts.length > 0 && (
                        <div className="fav-section-block">
                          <h3 className="fav-section-title">
                            Productos guardados ({favoriteProducts.length})
                          </h3>
                          <div className="favorites-list">
                            {INITIAL_PRODUCTS.filter((p) => favoriteProducts.includes(p.id)).map((product) => (
                              <div
                                key={product.id}
                                className="favorite-item-card"
                                onClick={() => setSelectedProduct(product)}
                              >
                                <img src={product.image} alt={product.title} className="fav-thumb" />
                                <div className="fav-details">
                                  <h4>{product.title}</h4>
                                  <p className="fav-producer">Por {product.producer} • {product.location}</p>
                                  <div className="fav-badges">
                                    <span className="badge badge-price">C$ {product.price}</span>
                                    {product.allowsTrueque && (
                                      <button
                                        type="button"
                                        className="badge badge-trueque badge-clickable"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenTrueque(product);
                                        }}
                                        aria-label="Proponer trueque solidario"
                                      >
                                        Trueque
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <button
                                  className="fav-remove-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleFavoriteProduct(product.id);
                                  }}
                                  aria-label="Eliminar de favoritos"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'perfil' && (
                <PerfilUsuario
                  onModalToggle={(isOpen) => setIsProfileModalOpen(isOpen)}
                  onLogout={() => navigate('/login')}
                />
              )}
            </>
          )}
        </main>

        {/* Modal de Propuesta de Trueque Solidario */}
        {truequeTargetProduct && (
          <ModalTrueque
            product={truequeTargetProduct}
            onClose={() => setTruequeTargetProduct(null)}
            onSent={(prod) => showToast(`🌾 ¡Abriendo WhatsApp con ${prod.producer}!`)}
          />
        )}

        {/* Modal de Banner / Evento */}
        {selectedBannerEvent && (
          <div className="modal-backdrop" onClick={() => setSelectedBannerEvent(null)}>
            <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedBannerEvent(null)}>✕</button>
              <div className="modal-body">
                <span className="badge badge-event">{selectedBannerEvent.tag}</span>
                <h3 className="modal-title" style={{ marginTop: '10px' }}>{selectedBannerEvent.title}</h3>
                <p className="modal-subtitle-bold">{selectedBannerEvent.subtitle}</p>
                <p className="modal-description">
                  Participa en este espacio seguro organizado para fortalecer la autonomía económica y agroecológica de las mujeres rurales. Habrá venta directa, zona de trueque libre de intermediarios.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menú de Navegación Inferior Flotante (Se oculta si hay pantallas completas, modales abiertos o pantalla de registro) */}
        {!selectedProduct && !selectedProducer && !isCartOpen && !isProfileModalOpen && !authScreen && (
          <Menu
            activeTab={activeTab}
            onTabChange={(tab) => {
              setIsProfileModalOpen(false);
              setActiveTab(tab);
            }}
          />
        )}

        {/* Toast Notificación Flotante */}
        {toast && <div className="toast-notification">{toast}</div>}
      </div>
    </div>
  );
};

export default CompradoraHomePage;