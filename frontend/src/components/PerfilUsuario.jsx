import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPerfil, updatePerfil } from '../services/usuarioService';
import { FaCamera, FaStore, FaUserCheck } from 'react-icons/fa';
import aslaLogo from '../assets/asla-logo.svg';
import {
  IconoUbicacion,
  IconoEditar,
  IconoTelefono,
  IconoCorreo,
  IconoCandado,
  IconoVerificado,
  IconoCanasta,
  IconoPlantaMaceta,
  IconoCerrarSesion,
} from '../iconos';

const PerfilUsuario = ({ onModalToggle = () => {}, onLogout = () => {} }) => {
  const navigate = useNavigate();
  const { usuario, estaAutenticado, logout } = useAuth();
  // Estado del rol: 'compradora' | 'productora'
  const [activeRole, setActiveRole] = useState('compradora');
  const [mostrarModalProductora, setMostrarModalProductora] = useState(false);

  const [userData, setUserData] = useState(() => {
    if (usuario) {
      const nombreCompleto = usuario.nombreCompleto || `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || usuario.name || 'Usuaria';
      return {
        idUsuario: usuario.idUsuario,
        name: nombreCompleto,
        phone: usuario.telefono || '',
        email: usuario.correo || usuario.email || '',
        location: usuario.ubicacion || 'Nicaragua',
        gender: usuario.genero || usuario.gender || 'Femenino',
        avatar: usuario.fotoUrl || usuario.imagenUrl || null,
        cedula: usuario.cedula || '',
      };
    }
    try {
      const guardado = localStorage.getItem("asla_usuario_comprador");
      if (guardado) {
        const u = JSON.parse(guardado);
        return {
          idUsuario: u.idUsuario,
          name: u.name || `${u.nombre || ''} ${u.apellido || ''}`.trim() || 'Usuaria',
          phone: u.telefono || u.phone || '',
          email: u.correo || u.email || '',
          location: u.location || 'Nicaragua',
          gender: u.gender || u.genero || 'Femenino',
          avatar: u.avatar || u.fotoUrl || null,
          cedula: u.cedula || '',
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      idUsuario: null,
      name: 'Usuaria ASLA',
      phone: '',
      email: '',
      location: 'Nicaragua',
      gender: 'Femenino',
      avatar: null,
      cedula: '',
    };
  });

  useEffect(() => {
    const uid = usuario?.idUsuario || userData.idUsuario;
    if (uid) {
      getPerfil(uid).then((p) => {
        if (p) {
          setUserData((prev) => ({
            ...prev,
            idUsuario: p.usuarioId || uid,
            name: p.nombreCompleto || prev.name,
            phone: p.telefono || prev.phone,
            email: p.correo || prev.email,
            location: p.ubicacion || prev.location,
            gender: p.genero || prev.gender,
            avatar: p.imagenUrl || prev.avatar,
            cedula: p.cedula || prev.cedula,
          }));
        }
      });
    }
  }, [usuario?.idUsuario]);

  const esHombre =
    userData?.gender?.toLowerCase() === 'masculino' ||
    userData?.genero?.toLowerCase() === 'masculino';

  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const nuevaFoto = reader.result;
        setUserData((prev) => {
          const updated = { ...prev, avatar: nuevaFoto };
          try {
            localStorage.setItem("asla_usuario_comprador", JSON.stringify(updated));
          } catch (err) {
            console.error(err);
          }
          return updated;
        });

        const uid = usuario?.idUsuario || userData.idUsuario;
        if (uid) {
          const partes = (userData.name || '').split(' ');
          updatePerfil(uid, {
            nombre: partes[0] || 'Usuaria',
            apellido: partes.slice(1).join(' ') || '',
            telefono: userData.phone || '',
            genero: userData.gender || 'Femenino',
            imagenUrl: nuevaFoto
          }).catch(console.error);
        }

        showToast('¡Foto de perfil actualizada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeModal, setActiveModal] = useState(null);

  const [tempName, setTempName] = useState(userData.name);
  const [tempPhone, setTempPhone] = useState(userData.phone);

  const [tempEmail, setTempEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Cerrar modal y restaurar visibilidad del menú
  const closeModal = () => {
    setActiveModal(null);
    onModalToggle(false);
  };

  const handleOpenModal = (modalType) => {
    if (modalType === 'name_phone') {
      setTempName(userData.name);
      setTempPhone(userData.phone);
    } else if (modalType === 'email') {
      setTempEmail('');
      setConfirmEmail('');
    } else if (modalType === 'password') {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setActiveModal(modalType);
    onModalToggle(true);
  };

  const handleAbrirModalProductora = () => {
    setMostrarModalProductora(true);
    onModalToggle(true);
  };

  const handleCerrarModalProductora = () => {
    setMostrarModalProductora(false);
    onModalToggle(false);
  };

  const handleAceptarProductora = () => {
    setMostrarModalProductora(false);
    onModalToggle(false);
    const partesNombre = (userData?.name || '').trim().split(' ');
    const primerNombre = partesNombre[0] || '';
    const apellido = partesNombre.slice(1).join(' ') || '';

    navigate('/registro-productora', {
      state: {
        datosUsuario: {
          nombre: primerNombre,
          apellido: apellido,
          name: userData?.name || '',
          correo: userData?.email || '',
          email: userData?.email || '',
          telefono: userData?.phone || '',
          phone: userData?.phone || '',
          cedula: userData?.cedula || '',
          genero: 'Femenino'
        }
      }
    });
  };

  // Guardar Nombre y Teléfono
  const handleSaveNamePhone = (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;

    setUserData((prev) => {
      const updated = {
        ...prev,
        name: tempName.trim(),
        phone: tempPhone.trim(),
      };
      try {
        localStorage.setItem("asla_usuario_comprador", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    const uid = usuario?.idUsuario || userData.idUsuario;
    if (uid) {
      const partes = tempName.trim().split(' ');
      updatePerfil(uid, {
        nombre: partes[0] || 'Usuaria',
        apellido: partes.slice(1).join(' ') || '',
        telefono: tempPhone.trim(),
        genero: userData.gender || 'Femenino',
        imagenUrl: userData.avatar || undefined
      }).catch(console.error);
    }

    closeModal();
    showToast('¡Nombre y teléfono actualizados!');
  };

  // Guardar Correo Electrónico
  const handleSaveEmail = (e) => {
    e.preventDefault();
    if (!tempEmail.trim()) return;
    if (tempEmail.trim() !== confirmEmail.trim()) {
      alert('Los correos electrónicos ingresados no coinciden.');
      return;
    }

    setUserData((prev) => ({
      ...prev,
      email: tempEmail.trim(),
    }));
    closeModal();
    showToast('¡Correo electrónico actualizado!');
  };

  // Guardar Contraseña
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      alert('La nueva contraseña y la confirmación no coinciden.');
      return;
    }
    if (newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    closeModal();
    showToast('¡Contraseña actualizada exitosamente!');
  };

  return (
    <div className="profile-screen-container animate-fade-in">
  
      <div className="profile-top-bar">
        <h1 className="profile-top-title">Mi Perfil</h1>
      </div>

      <div className="profile-content-body">
        {/* Tarjeta 1: Información de la Usuaria / Usuario */}
        <div className="profile-card user-header-card">
          <div style={{ position: "relative", display: "inline-block", margin: "0 auto" }}>
            <div
              className="profile-avatar-wrapper"
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: "pointer" }}
              title="Haz clic para subir tu foto de perfil"
            >
              <img
                src={
                  userData.avatar ||
                  (esHombre
                    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                    : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80")
                }
                alt={userData.name}
                className="profile-user-avatar"
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#27C064",
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.15s ease",
              }}
              title="Cambiar foto de perfil"
              aria-label="Cambiar foto de perfil"
            >
              <FaCamera style={{ fontSize: "12px" }} />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          <h2 className="profile-user-name">{userData.name}</h2>

          <div className="profile-user-location">
            <IconoUbicacion className="location-pin-icon" size={15} color="#27C064" />
            <span>{userData.location}</span>
          </div>

          <div className="profile-user-contacts-pills">
            <div className="profile-contact-chip">
              <IconoTelefono size={13} color="#27C064" />
              <span>{userData.phone}</span>
            </div>
            <div className="profile-contact-chip">
              <IconoCorreo size={13} color="#0284C7" />
              <span>{userData.email}</span>
            </div>
          </div>

          <div className="profile-verified-badge">
            <IconoVerificado size={13} color="#16A34A" />
            <span>{esHombre ? 'Usuario Verificado' : 'Usuaria Verificada'}</span>
          </div>
        </div>

        {/* Tarjeta 2: Cambio de Rol (Comprador/a / Productora) */}
        <div className="profile-card role-selector-card">
          <div className="role-toggle-capsule">
            <button
              type="button"
              className={`role-toggle-btn role-compradora ${activeRole === 'compradora' ? 'active-green' : ''}`}
              onClick={() => setActiveRole('compradora')}
              aria-label={esHombre ? 'Rol Comprador' : 'Rol Compradora'}
            >
              <IconoCanasta size={19} color={activeRole === 'compradora' ? '#FFFFFF' : '#94A3B8'} />
              <span>{esHombre ? 'Comprador' : 'Compradora'}</span>
            </button>

            {!esHombre && (
              <button
                type="button"
                className={`role-toggle-btn role-productora ${activeRole === 'productora' ? 'active-pink' : ''}`}
                onClick={() => {
                  if (estaAutenticado) {
                    navigate('/perfil');
                  } else {
                    handleAbrirModalProductora();
                  }
                }}
                aria-label="Rol Productora"
              >
                <IconoPlantaMaceta size={19} color={activeRole === 'productora' ? '#FFFFFF' : '#94A3B8'} />
                <span>Productora</span>
              </button>
            )}
          </div>

          <p className="role-description-text">
            {activeRole === 'compradora'
              ? 'Comprá productos y haz trueques con las productoras'
              : 'Publicá cosechas, gestioná trueques y conectá con compradoras'}
          </p>
        </div>

       
        {activeRole === 'compradora' && (
          
          <div className="profile-card menu-list-card animate-fade-in">
            {}
            <div
              className="menu-list-row"
              onClick={() => handleOpenModal('name_phone')}
            >
              <div className="menu-row-left">
                <div className="menu-row-icon-circle green-bg">
                  <IconoEditar size={18} color="#27C064" />
                </div>
                <div className="menu-row-texts">
                  <span className="menu-row-label">Editar Nombre y Teléfono</span>
                  <span className="menu-row-sublabel">{userData.name} • {userData.phone}</span>
                </div>
              </div>
              <span className="menu-row-chevron">›</span>
            </div>

            {/* Opción 2: Cambio de Correo */}
            <div
              className="menu-list-row"
              onClick={() => handleOpenModal('email')}
            >
              <div className="menu-row-left">
                <div className="menu-row-icon-circle blue-bg">
                  <IconoCorreo size={18} color="#0284C7" />
                </div>
                <div className="menu-row-texts">
                  <span className="menu-row-label">Cambio de Correo</span>
                  <span className="menu-row-sublabel">{userData.email}</span>
                </div>
              </div>
              <span className="menu-row-chevron">›</span>
            </div>

            {/* Opción 3: Cambio de Contraseña */}
            <div
              className="menu-list-row"
              onClick={() => handleOpenModal('password')}
            >
              <div className="menu-row-left">
                <div className="menu-row-icon-circle pink-bg">
                  <IconoCandado size={18} color="#E81E73" />
                </div>
                <div className="menu-row-texts">
                  <span className="menu-row-label">Cambio de Contraseña</span>
                  <span className="menu-row-sublabel">Seguridad y clave de acceso</span>
                </div>
              </div>
              <span className="menu-row-chevron">›</span>
            </div>
          </div>
        )}

        {/* Botón Rojo de Cerrar Sesión en la parte inferior */}
        <button
          type="button"
          className="profile-bottom-logout-btn"
          onClick={() => {
            showToast('Sesión cerrada correctamente');
            if (logout) logout();
            try {
              localStorage.removeItem("asla_usuario_comprador");
            } catch (e) {
              console.error(e);
            }
            if (onLogout) onLogout();
            navigate('/login');
          }}
          aria-label="Cerrar sesión"
        >
          <IconoCerrarSesion size={18} color="#FFFFFF" strokeWidth={2.4} />
          <span>Cerrar Sesión</span>
        </button>

        {/* Espaciador inferior para el menú */}
        <div className="bottom-nav-spacer" />
      </div>

      {/* MODAL 1: Editar Nombre y Teléfono */}
      {activeModal === 'name_phone' && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-sheet profile-edit-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="modal-body profile-modal-content">
              <div className="profile-modal-header">
                <div className="profile-modal-icon-circle green-bg">
                  <IconoEditar size={22} color="#27C064" />
                </div>
                <div>
                  <h3 className="profile-modal-title">Editar Nombre y Teléfono</h3>
                  <p className="profile-modal-subtitle">Actualiza tus datos de contacto para compras y trueques</p>
                </div>
              </div>

              <form onSubmit={handleSaveNamePhone} className="profile-edit-form">
                <div className="form-group">
                  <label htmlFor="edit-user-name">
                    Nombre Completo <span className="required-star">*</span>
                  </label>
                  <input
                    id="edit-user-name"
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Ej. Ana María Lopez"
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-user-phone">
                    Número de Teléfono / WhatsApp <span className="required-star">*</span>
                  </label>
                  <input
                    id="edit-user-phone"
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder="Ej. +505 8899-1122"
                    required
                  />
                </div>

                <button type="submit" className="modal-btn btn-profile-save">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cambio de Correo Electrónico */}
      {activeModal === 'email' && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-sheet profile-edit-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="modal-body profile-modal-content">
              <div className="profile-modal-header">
                <div className="profile-modal-icon-circle blue-bg">
                  <IconoCorreo size={22} color="#0284C7" />
                </div>
                <div>
                  <h3 className="profile-modal-title">Cambio de Correo</h3>
                  <p className="profile-modal-subtitle">Correo actual: <strong>{userData.email}</strong></p>
                </div>
              </div>

              <form onSubmit={handleSaveEmail} className="profile-edit-form">
                <div className="form-group">
                  <label htmlFor="new-user-email">
                    Nuevo Correo Electrónico <span className="required-star">*</span>
                  </label>
                  <input
                    id="new-user-email"
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-user-email">
                    Confirmar Nuevo Correo <span className="required-star">*</span>
                  </label>
                  <input
                    id="confirm-user-email"
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <button type="submit" className="modal-btn btn-profile-save">
                  Actualizar Correo
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/*Cambio de Contraseña */}
      {activeModal === 'password' && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-sheet profile-edit-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="modal-body profile-modal-content">
              <div className="profile-modal-header">
                <div className="profile-modal-icon-circle pink-bg">
                  <IconoCandado size={22} color="#E81E73" />
                </div>
                <div>
                  <h3 className="profile-modal-title">Cambio de Contraseña</h3>
                  <p className="profile-modal-subtitle">Ingresa tu contraseña actual y la nueva clave</p>
                </div>
              </div>

              <form onSubmit={handleSavePassword} className="profile-edit-form">
                <div className="form-group">
                  <label htmlFor="current-user-pass">
                    Contraseña Actual <span className="required-star">*</span>
                  </label>
                  <input
                    id="current-user-pass"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-user-pass">
                    Nueva Contraseña <span className="required-star">*</span>
                  </label>
                  <input
                    id="new-user-pass"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-user-pass">
                    Confirmar Nueva Contraseña <span className="required-star">*</span>
                  </label>
                  <input
                    id="confirm-user-pass"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite la nueva contraseña"
                    required
                  />
                </div>

                <button type="submit" className="modal-btn btn-profile-save">
                  Guardar Nueva Contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Validación: "¿Deseas ser productora?" */}
      {mostrarModalProductora && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 9999,
            animation: "fadeIn 0.25s ease-out"
          }}
          onClick={handleCerrarModalProductora}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "26px",
              padding: "32px 24px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.22)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              border: "1.5px solid rgba(225, 45, 134, 0.15)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo Oficial ASLA */}
            <img
              src={aslaLogo}
              alt="Logo ASLA"
              style={{ width: "68px", height: "68px", objectFit: "contain" }}
            />

            {/* Saludo y Pregunta */}
            <div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-secondary, #27C064)",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: "0 0 4px 0"
                }}
              >
                ¡Registro completado!
              </p>
              <h2
                style={{
                  fontSize: "1.45rem",
                  fontWeight: "800",
                  color: "var(--color-text-main, #111827)",
                  margin: 0,
                  letterSpacing: "-0.3px"
                }}
              >
                ¿Deseas ser productora?
              </h2>
            </div>

            {/* Explicación amigable */}
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--color-text-muted, #6B7280)",
                lineHeight: 1.45,
                margin: 0
              }}
            >
              Hola <strong style={{ color: "var(--color-primary, #E12D86)" }}>{userData?.name}</strong>, como mujer rural o emprendedora puedes publicar y vender tus cosechas y productos directamente en ASLA.
            </p>

            {/* Botones de Decisión Sí / No */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                marginTop: "6px"
              }}
            >
              {/* Opción SÍ: Conducir al Cuestionario de Productora */}
              <button
                type="button"
                onClick={handleAceptarProductora}
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "var(--color-primary, #E12D86)",
                  color: "#ffffff",
                  borderRadius: "var(--radius-full, 9999px)",
                  fontSize: "0.98rem",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(225, 45, 134, 0.28)",
                  transition: "all 0.2s ease"
                }}
              >
                <FaStore /> Sí, quiero ser Productora
              </button>

              {/* Opción NO: Continuar como usuaria compradora */}
              <button
                type="button"
                onClick={handleCerrarModalProductora}
                style={{
                  width: "100%",
                  height: "46px",
                  backgroundColor: "var(--color-secondary-light, #E8F8EE)",
                  color: "var(--color-secondary-dark, #1E8A4D)",
                  borderRadius: "var(--radius-full, 9999px)",
                  fontSize: "0.92rem",
                  fontWeight: "700",
                  border: "1.5px solid rgba(39, 192, 100, 0.35)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease"
                }}
              >
                <FaUserCheck /> No, solo comprar
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast-notification">{toast}</div>}
    </div>
  );
};

export default PerfilUsuario;
