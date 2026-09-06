import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconoCarrito, IconoBuscar } from '../iconos';

const CATEGORIES = [
  { id: 'frutas', name: 'Frutas' },
  { id: 'artesanias', name: 'Artesanías' },
  { id: 'verduras', name: 'Verduras' },
  { id: 'granos', name: 'Granos Básicos' },
  { id: 'semillas', name: 'Semillas Criollas' },
  { id: 'plantas', name: 'Plantas' },
  { id: 'lacteos', name: 'Lácteos' },
];

const Header = ({
  searchQuery = '',
  setSearchQuery = () => {},
  selectedCategory = 'todos',
  setSelectedCategory = () => {},
  cartCount = 0,
  onOpenCart = () => {},
}) => {
  const navigate = useNavigate();
  const { estaAutenticado, usuario } = useAuth();

  return (
    <div className="header-wrapper">
      <header className="asla-header-green">
        <div className="header-top-row">
          <div
            className="brand-logo"
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
            }}
          >
            <span className="logo-text">Asla</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {estaAutenticado && (usuario?.esProductora || usuario?.idProductora) && (
              <button
                type="button"
                onClick={() => navigate('/productos')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  backdropFilter: 'blur(4px)'
                }}
                title="Volver a mi panel de Productora"
              >
                🌱 Modo Productora
              </button>
            )}

            <button 
              className="cart-button" 
              onClick={onOpenCart}
              aria-label="Carrito de compras"
            >
              <IconoCarrito className="cart-icon" size={30} color="#FFFFFF" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        <div className="search-bar-wrapper">
          <div className="search-bar">
            <IconoBuscar className="search-icon" size={20} color="#27C064" strokeWidth={2.8} />
            <input
              type="text"
              className="search-input"
              placeholder="¿Que andas buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </header>

      {/*Chips de Categorías (Frutas, Artesanías, Verduras...) */}
      <div className="categories-white-bar">
        <nav className="categories-scroll-container">
          <div className="categories-list">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-pill-gray ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'todos' : cat.id)}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;

