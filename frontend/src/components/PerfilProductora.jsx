import {
  IconoRegresar,
  IconoVerificado,
  IconoUbicacion,
  IconoWhatsApp,
  IconoFavoritos,
} from '../iconos';

const PerfilProductora = ({
  producer,
  onBack = () => {},
  onSelectProduct = () => {},
  isFavorite = false,
  onToggleFavorite = () => {},
}) => {
  if (!producer) return null;

  // Productos de la productora
  const products = Array.isArray(producer.productsList) ? producer.productsList : [];

  const firstName = producer.name.split(' ')[0];

  const handleWhatsApp = () => {
    const raw = producer.phone || '50588888888';
    const digits = String(raw).replace(/\D/g, '');
    const phone = digits.length === 8 ? '505' + digits : (digits.length === 11 && digits.startsWith('505') ? digits : (digits || '50588888888'));
    const message = encodeURIComponent(`Hola ${producer.name}, te contacto desde la app Asla. Me interesan tus productos.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="producer-detail-screen animate-fade-in">
      {/* botón Regresar */}
      <div className="producer-top-nav-bar">
        <button
          type="button"
          className="producer-back-btn"
          onClick={onBack}
          aria-label="Regresar"
        >
          <IconoRegresar size={22} color="#0F172A" strokeWidth={3} />
        </button>
      </div>

      <div className="producer-profile-content">
        {}
        <div className="producer-banner-container">
          <img
            src={producer.coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'}
            alt="Parcela y huerto"
            className="producer-cover-img"
          />

          {}
          <div className="producer-avatar-floating-circle">
            <img
              src={producer.avatar}
              alt={producer.name}
              className="producer-profile-avatar-img"
            />
          </div>
        </div>

        {/* Información y Verificación de la Productora */}
        <div className="producer-identity-section">
          <div className="producer-name-badge-row">
            <IconoVerificado className="verified-green-check" size={24} color="#27C064" />
            <h1 className="producer-main-name">{producer.name}</h1>
          </div>

          {}
          <div className="producer-loc-rating-row">
            <span className="producer-loc-tag">
              <IconoUbicacion className="producer-magenta-pin" size={16} color="#E81E73" />
              {producer.location}
            </span>
          </div>

         
          <p className="producer-bio-paragraph">
            {producer.bio}
          </p>
        </div>

        <div className="producer-stats-action-grid">
          {/* Cantidad de Productos */}
          <div className="producer-stat-card">
            <span className="producer-stat-number">{producer.productsCount || products.length || 6}</span>
            <span className="producer-stat-label">Productos</span>
          </div>

          {/*Trueques */}
          <div className="producer-stat-card">
            <span className="producer-stat-number">{producer.truequesCount || '+13'}</span>
            <span className="producer-stat-label">Trueques</span>
          </div>

          {/* Btn Seguir */}
          <div className="producer-follow-card-box">
            <button
              type="button"
              className={`producer-follow-btn ${isFavorite ? 'following' : ''}`}
              onClick={onToggleFavorite}
            >
              <IconoFavoritos size={15} color="#FFFFFF" filled={isFavorite} />
              <span>{isFavorite ? 'Siguiendo' : 'Seguir'}</span>
            </button>
          </div>
        </div>

        {/* Btn WhatsApp */}
        <button
          type="button"
          className="producer-whatsapp-banner-btn"
          onClick={handleWhatsApp}
        >
          <IconoWhatsApp className="whatsapp-icon" size={22} color="#25D366" />
          <span>Contactá a {firstName} Por Whatsapp</span>
        </button>

        {/* Sección de Productos Disponibles */}
        <div className="producer-products-section">
          <div className="producer-products-header">
            <div className="producer-products-title-group">
              <span className="products-title-text">Productos</span>
              <span className="products-dropdown-arrow">▼</span>
            </div>
            <div className="producer-products-available-badge">
              <span>{producer.productsCount || products.length} Disponibles</span>
              <span className="green-status-dot">●</span>
            </div>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "28px 16px", color: "#64748B", fontSize: "0.9rem" }}>
              <span style={{ fontSize: "1.8rem", display: "block", marginBottom: "8px" }}>🌱</span>
              Esta productora no tiene cosechas publicadas en este momento.
            </div>
          ) : (
            <div className="producer-products-2col-grid">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="producer-product-grid-card"
                  onClick={() => onSelectProduct(prod)}
                >
                  <div className="producer-product-img-box">
                    <img
                      src={prod.image || prod.imagenUrl}
                      alt={prod.title || prod.nombre}
                      className="producer-product-img"
                      loading="lazy"
                    />
                    {prod.allowsTrueque && (
                      <span className="producer-trueque-chip">Trueque</span>
                    )}
                  </div>

                  <div className="producer-product-meta">
                    <h4 className="producer-product-name">{prod.title || prod.nombre}</h4>
                    <div className="producer-product-price-row">
                      <span className="prod-price-green">C${prod.price ?? prod.precio ?? 0}</span>
                      <span className="prod-unit-gray">/{prod.unit || prod.unidadMedidaNombre || 'Unidad'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilProductora;
