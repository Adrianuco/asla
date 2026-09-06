import { useState } from 'react';
import {
  IconoBuscar,
  IconoUbicacion,
  IconoFavoritos,
} from '../iconos';

export const PRODUCERS = [];

const Productoras = ({
  producers = [],
  onSelectProducer = () => {},
  onSeeAll = () => {},
}) => {
  return (
    <section className="personas-section" aria-label="Productoras comunitarias">
      <div className="section-header">
        <h2 className="section-title">Productoras cerca de vos</h2>
        {onSeeAll && (
          <button type="button" className="see-all-btn" onClick={onSeeAll}>
            Ver todas →
          </button>
        )}
      </div>

      <div className="personas-horizontal-scroll">
        <div className="personas-track">
          {producers.map((producer) => (
            <div
              key={producer.id}
              className="producer-card"
              onClick={() => onSelectProducer(producer)}
            >
              {/* Avatar  */}
              <div className="producer-avatar-ring">
                <img
                  src={producer.avatar}
                  alt={`Foto de ${producer.name}`}
                  className="producer-avatar-img"
                  loading="lazy"
                />
              </div>

              {/* Nombre de la productora */}
              <h3 className="producer-name">{producer.name}</h3>

              {}
              <div className="producer-location">
                <span className="location-dot">●</span>
                <span className="location-text">{producer.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProductorasView = ({
  producers = [],
  onSelectProducer = () => {},
  favorites = [],
  onToggleFavorite = () => {},
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProducers = producers.filter((p) => {
    const term = searchFilter.toLowerCase();
    const matchesName = (p.name || '').toLowerCase().includes(term);
    const matchesLoc = (p.location || '').toLowerCase().includes(term);
    const matchesTags = (p.tags || []).some((tag) => tag.toLowerCase().includes(term));
    return matchesName || matchesLoc || matchesTags;
  });

  return (
    <div className="productoras-screen-container animate-fade-in">
      {}
      <div className="productoras-hero-banner">
        <div className="hero-text-content">
          <h1 className="hero-title">
            Productoras
            <span className="hero-title-underline"></span>
          </h1>
          <p className="hero-subtitle">
            Conocé, apoyá y comprá directamente a nuestras productoras nicaragüenses.
          </p>

          {/* Buscador */}
          <div className="productoras-search-pill">
            <IconoBuscar className="pill-search-icon" size={20} color="#FFFFFF" strokeWidth={2.8} />
            <input
              type="text"
              className="pill-search-input"
              placeholder="Buscá a una productora..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            {searchFilter && (
              <button
                type="button"
                className="clear-pill-btn"
                onClick={() => setSearchFilter('')}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="hero-image-box">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
            alt="Productora nicaragüense"
            className="hero-producer-img"
          />
        </div>
      </div>

      {/* Lista  de Tarjetas de Productoras  */}
      <div className="productoras-cards-feed">
        {filteredProducers.length === 0 ? (
          <div className="empty-state-box">
            <span className="empty-emoji">👩‍🌾</span>
            <p>No se encontraron productoras para "{searchFilter}".</p>
          </div>
        ) : (
          filteredProducers.map((producer) => {
            const isFav = favorites.includes(producer.id);
            return (
              <div
                key={producer.id}
                className="productora-feed-card"
                onClick={() => onSelectProducer(producer)}
              >
                {}
                <div className="feed-card-header">
                  {}
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
                        className={`feed-heart-btn ${isFav ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(producer.id);
                        }}
                        aria-label="Favorito"
                      >
                        <IconoFavoritos size={20} color={isFav ? '#E81E73' : '#9E9E9E'} filled={isFav} />
                      </button>
                    </div>

                    {/* Ubicación */}
                    <div className="feed-meta-row">
                      <span className="feed-location">
                        <IconoUbicacion className="feed-pin-icon" size={16} color="#E81E73" />
                        {producer.location}
                      </span>
                    </div>

                    {}
                    <div className="feed-tags-row">
                      {(producer.tags || []).map((tag, idx) => (
                        <span key={idx} className="feed-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {}
                {producer.productsPreview && producer.productsPreview.length > 0 && (
                  <div className="feed-products-grid-box">
                    {producer.productsPreview.map((prod, pIdx) => (
                      <div key={pIdx} className="feed-product-thumb-container">
                        <img
                          src={prod.image || prod.imagenUrl}
                          alt={prod.name || prod.nombre}
                          className="feed-product-thumb"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Productoras;
