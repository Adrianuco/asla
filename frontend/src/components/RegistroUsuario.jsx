import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import {
  IconoRegresar,
  IconoPerfil,
  IconoTelefono,
  IconoCedula,
  IconoCorreo,
  IconoCandado,
  IconoOjo,
  IconoVerificado,
} from '../iconos';
import aslaLogo from '../assets/asla-logo.svg';
import { registro } from '../services/usuarioService';

const RegistroUsuario = ({
  onBack = () => {},
  onRegisterSuccess = () => {},
  onNavigateLogin = () => {},
}) => {
  // Estados del formulario con Nombre y Apellido separados, y Número de Teléfono
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [genero, setGenero] = useState('femenino');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fotoUrl, setFotoUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Visibilidad de contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de errores (individuales por campo y general)
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
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
    setErrorGeneral('');
    const newErrors = {};

    // Validaciones detalladas por campo
    if (!nombre.trim()) {
      newErrors.nombre = 'Por favor ingresa tu nombre.';
    }
    if (!apellido.trim()) {
      newErrors.apellido = 'Por favor ingresa tu apellido.';
    }
    if (!telefono.trim()) {
      newErrors.telefono = 'Por favor ingresa tu número de teléfono.';
    }
    if (!cedula.trim()) {
      newErrors.cedula = 'Por favor ingresa tu cédula de identidad.';
    }
    if (!correo.trim() || !correo.includes('@')) {
      newErrors.correo = 'Por favor ingresa un correo electrónico válido.';
    }
    if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden. Por favor verifícalas.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrores(newErrors);
      setErrorGeneral('Por favor revisa y completa los campos señalados.');
      return;
    }

    setErrores({});
    setIsSubmitting(true);

    const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`.trim();
    const datosUsuario = {
      name: nombreCompleto,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
      cedula: cedula.trim(),
      email: correo.trim().toLowerCase(),
      correo: correo.trim().toLowerCase(),
      contrasena: password,
      password: password,
      gender: genero,
      genero: genero,
      role: 'compradora',
      fotoUrl: fotoUrl || undefined,
      imagenUrl: fotoUrl || undefined,
    };

    registro(datosUsuario)
      .then((res) => {
        setIsSubmitting(false);
        onRegisterSuccess({ ...datosUsuario, ...res });
      })
      .catch(() => {
        setIsSubmitting(false);
        onRegisterSuccess(datosUsuario);
      });
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

          {/* 1. Logo Oficial ASLA */}
          <div className="asla-official-logo-box" aria-label="Logo Asla">
            <img
              src={aslaLogo}
              alt="Logo Oficial ASLA"
              className="asla-official-emblem-svg"
              style={{
                width: "84px",
                height: "84px",
                objectFit: "contain",
                borderRadius: "14px",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)"
              }}
            />
          </div>

          <div className="register-brand-tag">
            <span className="brand-logo-text">Asla</span>
          </div>

          <div className="register-title-section">
            <h1 className="register-main-title">¡Regístrate ya!</h1>
          </div>

          {/* Subida de Foto de Perfil Opcional */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0 16px 0', gap: '6px' }}>
            <div
              style={{
                position: 'relative',
                width: '82px',
                height: '82px',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(21, 128, 61, 0.2)'
              }}
              onClick={() => fileInputRef.current?.click()}
              title="Haz clic para subir tu foto"
            >
              <img
                src={fotoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"}
                alt="Foto de perfil"
                style={{
                  width: '82px',
                  height: '82px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #15803D'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: '#15803D',
                color: '#ffffff',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
              }}>
                <FaCamera size={12} />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFotoChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: 'none',
                border: 'none',
                color: '#15803D',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '2px 8px'
              }}
            >
              {fotoUrl ? 'Cambiar foto de perfil' : 'Subir tu foto de perfil'}
            </button>
          </div>

          {/* Aviso general de error estilizado según el diseño ASLA */}
          {errorGeneral && (
            <div className="register-error-alert animate-shake">
              <span style={{ fontSize: "16px" }}>⚠️</span>
              <span>{errorGeneral}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            
            {/* Campo 1: Nombre */}
            <div className="register-field-group">
              <label htmlFor="reg-nombre" className="register-field-label">
                Nombre <span className="required-star">*</span>
              </label>
              <div className={`pastel-input-container ${errores.nombre ? 'input-error' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoPerfil size={19} color={errores.nombre ? '#DC2626' : '#15803D'} />
                </div>
                <input
                  id="reg-nombre"
                  type="text"
                  className="pastel-input"
                  placeholder="Ej. Ana María"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    if (errores.nombre) setErrores((prev) => ({ ...prev, nombre: '' }));
                  }}
                  autoFocus
                />
              </div>
              {errores.nombre && <span className="field-error-text">{errores.nombre}</span>}
            </div>

            {/* Campo 2: Apellido */}
            <div className="register-field-group">
              <label htmlFor="reg-apellido" className="register-field-label">
                Apellido <span className="required-star">*</span>
              </label>
              <div className={`pastel-input-container ${errores.apellido ? 'input-error' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoPerfil size={19} color={errores.apellido ? '#DC2626' : '#15803D'} />
                </div>
                <input
                  id="reg-apellido"
                  type="text"
                  className="pastel-input"
                  placeholder="Ej. López Jarquín"
                  value={apellido}
                  onChange={(e) => {
                    setApellido(e.target.value);
                    if (errores.apellido) setErrores((prev) => ({ ...prev, apellido: '' }));
                  }}
                />
              </div>
              {errores.apellido && <span className="field-error-text">{errores.apellido}</span>}
            </div>

            {/* Campo 3: Número de Teléfono */}
            <div className="register-field-group">
              <label htmlFor="reg-telefono" className="register-field-label">
                Número de Teléfono <span className="required-star">*</span>
              </label>
              <div className={`pastel-input-container ${errores.telefono ? 'input-error' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoTelefono size={19} color={errores.telefono ? '#DC2626' : '#15803D'} />
                </div>
                <input
                  id="reg-telefono"
                  type="tel"
                  className="pastel-input"
                  placeholder="+505 8823 4567"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    if (errores.telefono) setErrores((prev) => ({ ...prev, telefono: '' }));
                  }}
                />
              </div>
              {errores.telefono && <span className="field-error-text">{errores.telefono}</span>}
            </div>

            {/* Campo 4: Cédula de Identidad */}
            <div className="register-field-group">
              <label htmlFor="reg-cedula" className="register-field-label">
                Cédula de Identidad <span className="required-star">*</span>
              </label>
              <div className={`pastel-input-container ${errores.cedula ? 'input-error' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoCedula size={19} color={errores.cedula ? '#DC2626' : '#15803D'} />
                </div>
                <input
                  id="reg-cedula"
                  type="text"
                  className="pastel-input"
                  placeholder="001-000000-0000A"
                  value={cedula}
                  onChange={(e) => {
                    handleCedulaChange(e);
                    if (errores.cedula) setErrores((prev) => ({ ...prev, cedula: '' }));
                  }}
                />
              </div>
              {errores.cedula && <span className="field-error-text">{errores.cedula}</span>}
            </div>

            {/* Campo 5: Correo Electrónico */}
            <div className="register-field-group">
              <label htmlFor="reg-correo" className="register-field-label">
                Correo Electrónico (E-mail) <span className="required-star">*</span>
              </label>
              <div className={`pastel-input-container ${errores.correo ? 'input-error' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoCorreo size={19} color={errores.correo ? '#DC2626' : '#15803D'} />
                </div>
                <input
                  id="reg-correo"
                  type="email"
                  className="pastel-input"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    if (errores.correo) setErrores((prev) => ({ ...prev, correo: '' }));
                  }}
                />
              </div>
              {errores.correo && <span className="field-error-text">{errores.correo}</span>}
            </div>

            {/* Campo 6: Género */}
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

            {/* Campo 7: Contraseña */}
            <div className="register-field-group">
              <label htmlFor="reg-password" className="register-field-label">
                Contraseña <span className="required-star">*</span>
              </label>
              <div className={`pastel-input-container ${errores.password ? 'input-error' : ''}`}>
                <div className="input-prefix-icon">
                  <IconoCandado size={19} color={errores.password ? '#DC2626' : '#15803D'} />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  className="pastel-input"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errores.password) setErrores((prev) => ({ ...prev, password: '' }));
                  }}
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
              {errores.password && <span className="field-error-text">{errores.password}</span>}
            </div>

            {/* Campo 8: Confirmar Contraseña */}
            <div className="register-field-group">
              <div className="label-with-badge">
                <label htmlFor="reg-confirm-password" className="register-field-label">
                  Confirmar Contraseña <span className="required-star">*</span>
                </label>
                {passwordsMatch && (
                  <span className="match-badge">✓ Coinciden</span>
                )}
              </div>
              <div className={`pastel-input-container ${errores.confirmPassword ? 'input-error' : (passwordsMatch ? 'input-success' : '')}`}>
                <div className="input-prefix-icon">
                  <IconoCandado size={19} color={errores.confirmPassword ? '#DC2626' : (passwordsMatch ? '#16A34A' : '#15803D')} />
                </div>
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="pastel-input"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errores.confirmPassword) setErrores((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
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
              {errores.confirmPassword && <span className="field-error-text">{errores.confirmPassword}</span>}
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
