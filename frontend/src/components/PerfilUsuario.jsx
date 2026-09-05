import { useState } from 'react';
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

const PerfilUsuario = ({ onModalToggle = () => {} }) => {
  // Estado del rol: 'compradora' | 'productora'
  const [activeRole, setActiveRole] = useState('compradora');

  // Datos del perfil de la usuaria
  const [userData, setUserData] = useState({
    name: 'Ana María Lopez',
    phone: '+505 8899-1122',
    email: 'anamaria.lopez@gmail.com',
    location: 'Jinotepe, Nicaragua',
  });

  // Modal activo: 'name_phone' | 'email' | 'password' | null
  const [activeModal, setActiveModal] = useState(null);

  // Estados temporales para los formularios
  const [tempName, setTempName] = useState(userData.name);
  const [tempPhone, setTempPhone] = useState(userData.phone);

  const [tempEmail, setTempEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toast local de notificación
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

  // Abrir modal preparando los valores y ocultar menú inferior
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

  // Guardar Nombre y Teléfono
  const handleSaveNamePhone = (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;

    setUserData((prev) => ({
      ...prev,
      name: tempName.trim(),
      phone: tempPhone.trim(),
    }));
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
      {/* Barra Superior Verde */}
      <div className="profile-top-bar">
        <h1 className="profile-top-title">Mi Perfil</h1>
      </div>

      <div className="profile-content-body">
        {/* Tarjeta 1: Información de la Usuaria */}
        <div className="profile-card user-header-card">
          <div className="profile-avatar-wrapper">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
              alt={userData.name}
              className="profile-user-avatar"
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
            <span>Usuaria Verificada</span>
          </div>
        </div>

        {/* Tarjeta 2: Cambio de Rol (Compradora / Productora) */}
        <div className="profile-card role-selector-card">
          <div className="role-toggle-capsule">
            <button
              type="button"
              className={`role-toggle-btn role-compradora ${activeRole === 'compradora' ? 'active-green' : ''}`}
              onClick={() => setActiveRole('compradora')}
              aria-label="Rol Compradora"
            >
              <IconoCanasta size={19} color={activeRole === 'compradora' ? '#FFFFFF' : '#94A3B8'} />
              <span>Compradora</span>
            </button>

            <button
              type="button"
              className={`role-toggle-btn role-productora ${activeRole === 'productora' ? 'active-pink' : ''}`}
              onClick={() => setActiveRole('productora')}
              aria-label="Rol Productora"
            >
              <IconoPlantaMaceta size={19} color={activeRole === 'productora' ? '#FFFFFF' : '#94A3B8'} />
              <span>Productora</span>
            </button>
          </div>

          <p className="role-description-text">
            {activeRole === 'compradora'
              ? 'Comprá productos y haz trueques con las productoras'
              : 'Publicá cosechas, gestioná trueques y conectá con compradoras'}
          </p>
        </div>

        {/* Contenido Condicional Según el Rol */}
        {activeRole === 'compradora' && (
          /* Apartado Compradora: Edición de Datos, Teléfono, Correo y Contraseña */
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
          onClick={() => showToast('Sesión cerrada correctamente')}
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

      {}
      {toast && <div className="toast-notification">{toast}</div>}
    </div>
  );
};

export default PerfilUsuario;
