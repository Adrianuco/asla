// Librería Central de Iconos Asla (src/iconos/index.jsx)

export const IconoInicio = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1zm0 2.67l6 5.4V19h-2v-6H8v6H6v-8.83l6-5.4z"/>
  </svg>
);

export const IconoProductoras = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="7" r="3.2" />
    <circle cx="5" cy="9" r="2.4" />
    <circle cx="19" cy="9" r="2.4" />
    <path d="M12 11.5c-3.1 0-6.2 1.6-6.2 4.5V19h12.4v-3c0-2.9-3.1-4.5-6.2-4.5z" />
    <path d="M2.5 19h2.3v-2.3c0-1.6 1.2-2.9 2.8-3.4-.6-.2-1.3-.3-2-.3-2.3 0-4.6 1.2-4.6 3.4V19z" />
    <path d="M21.5 19h-2.3v-2.3c0-1.6-1.2-2.9-2.8-3.4.6-.2 1.3-.3 2-.3 2.3 0 4.6 1.2 4.6 3.4V19z" />
  </svg>
);

export const IconoFavoritos = ({ className = 'asla-icon', size = 24, color = 'currentColor', filled = true }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? "0" : "2"}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const IconoPerfil = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

export const IconoCarrito = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export const IconoWhatsApp = ({ className = 'asla-icon', size = 24, color = '#25D366' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.15c-.24.68-1.39 1.3-1.92 1.38-.51.08-1.18.11-3.38-.8-2.63-1.09-4.32-3.77-4.45-3.95-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.19.24-.26.53-.33.71-.33.18 0 .36 0 .51.01.17.01.39-.06.61.47.23.55.77 1.88.84 2.02.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.3.35-.43.47-.14.14-.29.29-.12.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.17-.2.74-.86.94-1.16.2-.29.4-.24.67-.14.28.1.1.75 2.21 1.89 2.32.14.07.24.11.28.17.04.06.04.35-.2.98z"/>
  </svg>
);

export const IconoTrueque = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
  </svg>
);

export const IconoUbicacion = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export const IconoBuscar = ({ className = 'asla-icon', size = 24, color = 'currentColor', strokeWidth = 2.8 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const IconoVerificado = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const IconoEditar = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M9 13.5c-3.5 0-6.5 1.8-6.5 4v2.5h9.8l-1.1-2.2c-.1-.3 0-.7.3-.9l3.5-3.5c-1.8-.6-3.8-.9-6-.9z" />
    <path d="M21.7 12.3a1 1 0 0 0-1.4 0l-5.8 5.8V21h2.9l5.8-5.8a1 1 0 0 0 0-1.4l-1.5-1.5z" />
  </svg>
);

export const IconoConfiguracion = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

export const IconoCerrarSesion = ({ className = 'asla-icon', size = 24, color = 'currentColor', strokeWidth = 2.4 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const IconoRegresar = ({ className = 'asla-icon', size = 24, color = 'currentColor', strokeWidth = 3 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

export const IconoEliminar = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

export const IconoCanasta = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C9.24 2 7 4.24 7 7H3.5C2.67 7 2 7.67 2 8.5v.5c0 .83.67 1.5 1.5 1.5H4l1.45 9.42C5.65 20.55 6.55 21.4 7.6 21.4h8.8c1.05 0 1.95-.85 2.15-1.98L20 10.5h.5c.83 0 1.5-.67 1.5-1.5v-.5C22 7.67 21.33 7 20.5 7H17c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm-3 8.5h1.5v6.5H9v-6.5zm3 0h1.5v6.5H12v-6.5zm3 0h1.5v6.5H15v-6.5z"/>
  </svg>
);

export const IconoPlanta = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    {/* Borde superior de la maceta */}
    <rect x="6" y="14" width="12" height="2" rx="1" />
    {/* Maceta */}
    <path d="M7.5 16.5l.9 4.3c.15.8.8 1.2 1.6 1.2h4c.8 0 1.45-.4 1.6-1.2l.9-4.3H7.5z" />
    {/* Tallo central */}
    <path d="M12 14V6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    {/* Hoja izquierda */}
    <path d="M12 11c-2.8 0-5-2-5-4.5 0-.3.2-.5.5-.5 2.8 0 5 2 5 4.5 0 .3-.2.5-.5.5z" />
    {/* Hoja derecha */}
    <path d="M12 9c2.8 0 5-2 5-4.5 0-.3-.2-.5-.5-.5-2.8 0-5 2-5 4.5 0 .3.2.5.5.5z" />
  </svg>
);

export const IconoPlantaMaceta = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    {/* Borde superior de la maceta */}
    <rect x="6" y="14" width="12" height="2" rx="1" />
    {/* Maceta */}
    <path d="M7.5 16.5l.9 4.3c.15.8.8 1.2 1.6 1.2h4c.8 0 1.45-.4 1.6-1.2l.9-4.3H7.5z" />
    {/* Tallo central */}
    <path d="M12 14V6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    {/* Hoja izquierda */}
    <path d="M12 11c-2.8 0-5-2-5-4.5 0-.3.2-.5.5-.5 2.8 0 5 2 5 4.5 0 .3-.2.5-.5.5z" />
    {/* Hoja derecha */}
    <path d="M12 9c2.8 0 5-2 5-4.5 0-.3-.2-.5-.5-.5-2.8 0-5 2-5 4.5 0 .3.2.5.5.5z" />
  </svg>
);

export const IconoTelefono = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

export const IconoCorreo = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

export const IconoCandado = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

export const IconoOjo = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconoOjoCerrado = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const IconoCedula = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12zM6 10h4v4H6zm6 0h6v1.5h-6zm0 2.5h6V14h-6zM6 15h12v1.5H6z"/>
  </svg>
);

export const IconoGenero = ({ className = 'asla-icon', size = 24, color = 'currentColor' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="5" />
    <line x1="12" y1="14" x2="12" y2="21" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);


