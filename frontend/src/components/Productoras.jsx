import { useState } from 'react';
import {
  IconoBuscar,
  IconoUbicacion,
  IconoFavoritos,
} from '../iconos';

export const PRODUCERS = [
  {
    id: 1,
    name: 'Carla Sanchez Lopez',
    location: 'Jinotepe',
    department: 'Carazo, Nicaragua',
    rating: '5.0',
    tags: ['Aguacates', 'Piñas', 'Mangos'],
    specialty: 'Frutales de temporada y aguacates mantequilla',
    experience: '9 años en cultivo agroecológico',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    bio: 'Soy originaria de Jinotepe, Carazo. Me dedico a producir frutas como la Piña, el Mango, el Aguacate, Mandarinas y Bananos.',
    phone: '+505 8899 1122',
    productsCount: 6,
    truequesCount: '+13',
    productsList: [
      {
        id: 101,
        title: 'Mangos de rosa',
        price: 25,
        unit: 'Docena',
        location: 'Jinotepe',
        producer: 'Carla Sanchez Lopez',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Mangos dulces cultivados de forma orgánica y madurados al sol en Jinotepe.'
      },
      {
        id: 102,
        title: 'Aguacates',
        price: 25,
        unit: 'Unidad',
        location: 'Jinotepe',
        producer: 'Carla Sanchez Lopez',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Aguacates mantequilla recién cortados de la huerta, sin químicos ni pesticidas.'
      },
      {
        id: 103,
        title: 'Piñas dulces',
        price: 35,
        unit: 'Unidad',
        location: 'Jinotepe',
        producer: 'Carla Sanchez Lopez',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Piña de monte jugosa y dulce, cosechada en suelo volcánico.'
      },
      {
        id: 104,
        title: 'Bananos de seda',
        price: 20,
        unit: 'Docena',
        location: 'Jinotepe',
        producer: 'Carla Sanchez Lopez',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Bananos dulces madurados naturalmente en racimo.'
      }
    ],
    productsPreview: [
      { name: 'Piñas dulces', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80' },
      { name: 'Aguacates', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80' },
      { name: 'Mangos de rosa', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    id: 2,
    name: 'Martha Ruíz Moraga',
    location: 'Rivas',
    department: 'Rivas, Nicaragua',
    rating: '5.0',
    tags: ['Elotes', 'Lechuga', 'Cacao'],
    specialty: 'Hortalizas frescas, granos y cacao criollo',
    experience: '14 años de tradición campesina',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    bio: 'Soy agricultora y artesana del cacao en Rivas. Produzco elotes tiernos, lechuga hidropónica y cacao criollo para trueque y venta.',
    phone: '+505 8765 4321',
    productsCount: 5,
    truequesCount: '+18',
    productsList: [
      {
        id: 201,
        title: 'Elotes tiernos',
        price: 70,
        unit: 'Docena',
        location: 'Rivas',
        producer: 'Martha Ruíz Moraga',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Elotes frescos de maíz blanco perfectos para atol, tamales o asar.'
      },
      {
        id: 202,
        title: 'Lechuga fresca',
        price: 20,
        unit: 'Cabeza',
        location: 'Rivas',
        producer: 'Martha Ruíz Moraga',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Lechuga crujiente regada con agua limpia de pozo.'
      }
    ],
    productsPreview: [
      { name: 'Elotes tiernos', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80' },
      { name: 'Lechuga fresca', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400&q=80' },
      { name: 'Cacao artesanal', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    id: 3,
    name: 'María Rojas Pérez',
    location: 'Diriamba',
    department: 'Carazo, Nicaragua',
    rating: '5.0',
    tags: ['Frijoles', 'Plátanos', 'Papaya'],
    specialty: 'Granos básicos y musáceas agroecológicas',
    experience: '11 años en agricultura familiar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    bio: 'Emprendedora rural en Diriamba. Cosecho frijol rojo de seda, plátano gigante y papaya hawaiana.',
    phone: '+505 8456 7890',
    productsCount: 4,
    truequesCount: '+9',
    productsList: [
      {
        id: 301,
        title: 'Frijol Rojo Seda',
        price: 32,
        unit: 'Libra',
        location: 'Diriamba',
        producer: 'María Rojas Pérez',
        image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=500&q=80',
        allowsTrueque: true,
        description: 'Frijol rojo suave y de rápido cocimiento, cosecha nueva.'
      }
    ],
    productsPreview: [
      { name: 'Frijol rojo', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=400&q=80' },
      { name: 'Plátanos gigantes', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Papaya hawaiana', image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    id: 4,
    name: 'Estela Rivas',
    location: 'San Marcos',
    department: 'Carazo, Nicaragua',
    rating: '5.0',
    tags: ['Maíz', 'Tomates', 'Miel'],
    specialty: 'Maíz Criollo y Miel Silvestre',
    experience: '12 años cultivando agroecológico',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    bio: 'Lideresa defensora de las semillas criollas y la apicultura comunitaria en San Marcos.',
    phone: '+505 8888 1234',
    productsCount: 4,
    truequesCount: '+15',
    productsList: [],
    productsPreview: [
      { name: 'Maíz blanco', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80' },
      { name: 'Tomates manzanos', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80' },
      { name: 'Miel de abeja pura', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    id: 5,
    name: 'Lucia Ruíz',
    location: 'Granada',
    department: 'Granada, Nicaragua',
    rating: '5.0',
    tags: ['Cítricos', 'Pitahaya', 'Café'],
    specialty: 'Frutales y Café de Altura',
    experience: '8 años de producción sostenible',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    bio: 'Productora en las faldas del Volcán Mombacho con plantaciones de café y cítricos bajo sombra.',
    phone: '+505 8234 5678',
    productsCount: 3,
    truequesCount: '+11',
    productsList: [],
    productsPreview: [
      { name: 'Naranjas y limones', image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=400&q=80' },
      { name: 'Pitahaya roja', image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=400&q=80' },
      { name: 'Café orgánico', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80' },
    ],
  },
];

const Productoras = ({ onSelectProducer = () => {}, onSeeAll = () => {} }) => {
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
          {PRODUCERS.map((producer) => (
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
  onSelectProducer = () => {},
  favorites = [],
  onToggleFavorite = () => {},
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProducers = PRODUCERS.filter((p) => {
    const term = searchFilter.toLowerCase();
    const matchesName = p.name.toLowerCase().includes(term);
    const matchesLoc = p.location.toLowerCase().includes(term);
    const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(term));
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
                      {producer.tags.map((tag, idx) => (
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
            );
          })
        )}
      </div>
    </div>
  );
};

export default Productoras;
