import { useState, useEffect } from 'react';

const BANNER_SLIDES = [
  {
    id: 1,
    title: 'Ferias y Eventos',
    subtitle: 'Feria de Productoras Rurales - San Marcos',
    tag: 'Próximo Sábado 9:00 AM',
    actionText: 'Ver detalles',
  },
  {
    id: 2,
    title: 'Intercambio & Trueque',
    subtitle: 'Encuentro de Semillas Criollas en Masaya',
    tag: 'Trueque Comunitario',
    actionText: 'Participar',
  },

];

const Banner = ({ onBannerClick = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? BANNER_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const activeSlide = BANNER_SLIDES[currentSlide];

  return (
    <section className="banner-section" aria-label="Banners informativos">
      <div 
        className="banner-card"
        onClick={() => onBannerClick(activeSlide)}
        role="region"
        aria-roledescription="carousel"
      >
        {/* Flecha Izquierda */}
        <button 
          className="banner-nav-btn prev-btn" 
          onClick={handlePrev} 
          aria-label="Slide anterior"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        {/* Contenido del Banner */}
        <div className="banner-content">
          <h2 className="banner-title">{activeSlide.title}</h2>
          <p className="banner-subtitle">{activeSlide.subtitle}</p>
          <span className="banner-tag">{activeSlide.tag}</span>
        </div>

        {/* Flecha Derecha */}
        <button 
          className="banner-nav-btn next-btn" 
          onClick={handleNext} 
          aria-label="Siguiente slide"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* Indicadores / Puntos */}
        <div className="banner-dots">
          {BANNER_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
