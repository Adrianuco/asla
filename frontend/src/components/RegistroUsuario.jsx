import React, { useState } from 'react';
import {
  IconoRegresar,
  IconoPerfil,
  IconoCorreo,
  IconoCedula,
  IconoCandado,
  IconoOjo,
  IconoOjoCerrado,
  IconoVerificado,
} from '../iconos';

const RegistroUsuario = ({
  onBack = () => {},
  onRegisterSuccess = () => {},
  onNavigateLogin = () => {},
}) => {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [genero, setGenero] = useState('femenino');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibilidad de contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de feedback / error
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formateador de cédula
  const handleCedulaChange = (e) => {
    const val = e.target.value.toUpperCase();
    if (val.length <= 16) {
      setCedula(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!nombre.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!correo.trim() || !correo.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!cedula.trim()) {
      setError('Por favor ingresa tu número de cédula.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    setIsSubmitting(true);

   
    setTimeout(() => {
      setIsSubmitting(false);
      const nuevoUsuario = {
        name: nombre.trim(),
        email: correo.trim().toLowerCase(),
        cedula: cedula.trim(),
        gender: genero,
        role: 'compradora',
      };
      onRegisterSuccess(nuevoUsuario);
    }, 800);
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="register-standalone-page animate-fade-in">
      <div className="register-body-container">
        <div className="register-card-white">
        
          {onBack && (
            <button
              type="button"
              className="register-clean-back-btn"
              onClick={onBack}
              aria-label="Regresar"
              title="Regresar"
            >
              <IconoRegresar size={20} color="#15803D" strokeWidth={2.6} />
            </button>
          )}

        
          {/* 1. Logo Asla */}
          <div className="asla-official-logo-box" aria-label="Logo Asla">
            <svg
              className="asla-official-emblem-svg"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="8" y="8" width="144" height="144" rx="36" fill="#F4EEDC" />

      
              <path d="M 24,18 L 24,52 C 44,66 66,88 80,108 C 76,72 54,40 24,18 Z" fill="#8DC63F" />
              <path d="M 136,18 L 136,52 C 116,66 94,88 80,108 C 84,72 106,40 136,18 Z" fill="#8DC63F" />

         
              <path d="M 24,60 L 24,80 C 44,88 64,100 80,108 C 68,96 46,76 24,60 Z" fill="#8DC63F" />
              <path d="M 136,60 L 136,80 C 116,88 96,100 80,108 C 92,96 114,76 136,60 Z" fill="#8DC63F" />

            
              <path d="M 24,88 L 24,104 C 44,106 64,107 80,108 C 66,105 46,98 24,88 Z" fill="#8DC63F" />
              <path d="M 136,88 L 136,104 C 116,106 96,107 80,108 C 94,105 114,98 136,88 Z" fill="#8DC63F" />

              <circle cx="80" cy="108" r="13" fill="#E8227E" />
            </svg>
          </div>

         
          <div className="register-brand-tag">
            <span className="brand-logo-text">Asla</span>
          </div>

          
          <div className="register-title-section">
            <h1 className="register-main-title">¡Regístrate ya!</h1>
          </div>

        
          {error && (
            <div className="register-error-alert animate-shake">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

         
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            
            {/* Campo 1: Nombre Completo */}
            <div className="register-field-group">
              <label htmlFor="reg-nombre" className="register-field-label">
                Nombre Completo <span className="required-star">*</span>
              </label>
              <div className="pastel-input-container">
                <div className="input-prefix-icon">
                  <IconoPerfil size={19} color="#15803D" />
                </div>
                <input
                  id="reg-nombre"
                  type="text"
                  className="pastel-input"
                  placeholder="Ej. Ana María López"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Campo 2: Correo Electrónico*/}
            <div className="register-field-group">
              <label htmlFor="reg-correo" className="register-field-label">
                Correo Electrónico (E-mail) <span className="required-star">*</span>
              </label>
              <div className="pastel-input-container">
                <div className="input-prefix-icon">
                  <IconoCorreo size={19} color="#15803D" />
                </div>
                <input
                  id="reg-correo"
                  type="email"
                  className="pastel-input"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campo 3: Cédula de Identidad */}
            <div className="register-field-group">
              <label htmlFor="reg-cedula" className="register-field-label">
                Cédula de Identidad <span className="required-star">*</span>
              </label>
              <div className="pastel-input-container">
                <div className="input-prefix-icon">
                  <IconoCedula size={19} color="#15803D" />
                </div>
                <input
                  id="reg-cedula"
                  type="text"
                  className="pastel-input"
                  placeholder="001-000000-0000A"
                  value={cedula}
                  onChange={handleCedulaChange}
                  required
                />
              </div>
            </div>

            {/* Campo 4: Género */}
            <div className="register-field-group">
              <label className="register-field-label">
                Género <span className="required-star">*</span>
              </label>
              <div className="gender-chips-grid gender-two-columns">
                <button
                  type="button"
                  className={`gender-chip-btn ${genero === 'femenino' ? 'active' : ''}`}
                  onClick={() => setGenero('femenino')}
                >
                  <span>Femenino</span>
                  {genero === 'femenino' && <IconoVerificado size={14} color="#FFFFFF" />}
                </button>

                <button
                  type="button"
                  className={`gender-chip-btn ${genero === 'masculino' ? 'active' : ''}`}
                  onClick={() => setGenero('masculino')}
                >
                  <span>Masculino</span>
                  {genero === 'masculino' && <IconoVerificado size={14} color="#FFFFFF" />}
                </button>
              </div>
            </div>

            {/* Campo 5: Contraseña */}
            <div className="register-field-group">
              <label htmlFor="reg-password" className="register-field-label">
                Contraseña <span className="required-star">*</span>
              </label>
              <div className="pastel-input-container">
                <div className="input-prefix-icon">
                  <IconoCandado size={19} color="#15803D" />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="pastel-input"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? (
                    <IconoOjoCerrado size={18} color="#64748B" />
                  ) : (
                    <IconoOjo size={18} color="#64748B" />
                  )}
                </button>
              </div>
            </div>

            {/* Campo 6: Confirmar Contraseña */}
            <div className="register-field-group">
              <div className="label-with-badge">
                <label htmlFor="reg-confirm-password" className="register-field-label">
                  Confirmar Contraseña <span className="required-star">*</span>
                </label>
                {passwordsMatch && (
                  <span className="match-badge">✓ Coinciden</span>
                )}
              </div>
              <div className={`pastel-input-container ${passwordsMatch ? 'input-success' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoCandado size={19} color={passwordsMatch ? '#16A34A' : '#15803D'} />
                </div>
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="pastel-input"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showConfirmPassword ? (
                    <IconoOjoCerrado size={18} color="#64748B" />
                  ) : (
                    <IconoOjo size={18} color="#64748B" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón Registrarse */}
            <button
              type="submit"
              className="register-submit-btn-strong-green"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading-content">
                  <span className="spinner-dots" /> Registrando...
                </span>
              ) : (
                <span>Registrarse</span>
              )}
            </button>
          </form>

          <div className="register-footer-links">
            <p className="login-prompt-text">
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                className="link-login-green"
                onClick={onNavigateLogin}
              >
                Inicia sesión
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
