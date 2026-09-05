import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSeedling, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import aslaLogo from "../assets/asla-logo.svg";

export default function LoginPage() {
  const { login, cargando } = useAuth();
  const location = useLocation();

  const [identificador, setIdentificador] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identificador.trim() || !contrasena.trim()) {
      setError("Por favor ingresa tu nombre/correo/cédula y contraseña.");
      return;
    }

    try {
      await login(identificador, contrasena);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      backgroundColor: "var(--color-bg)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "var(--color-surface)",
        borderRadius: "24px",
        boxShadow: "var(--shadow-md)",
        padding: "36px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {/* Encabezado: Logo Asla, Nombre y Slogan */}
        <div style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px"
        }}>
          {/* Logo Oficial ASLA */}
          <img
            src={aslaLogo}
            alt="Logo ASLA"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "contain",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)"
            }}
          />

          {/* Nombre de la Aplicación */}
          <h1 style={{
            fontSize: "2.1rem",
            fontWeight: "800",
            color: "var(--color-primary)",
            margin: "2px 0 0 0",
            letterSpacing: "-0.5px"
          }}>
            Asla
          </h1>

          {/* Frase / Slogan*/}
          <p style={{
            fontSize: "0.92rem",
            color: "var(--color-text-muted)",
            margin: 0,
            lineHeight: 1.4,
            fontWeight: "500",
            maxWidth: "280px"
          }}>
            "Impulsando sus manos cosechando oportunidades"
          </p>
        </div>

        {/* Mensaje de Éxito (si proviene de registro exitoso) */}
        {location.state?.mensajeExito && !error && (
          <div style={{
            backgroundColor: "var(--color-active-bg)",
            color: "var(--color-active)",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.88rem",
            fontWeight: "600",
            border: "1px solid #BBF7D0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            <FaCheckCircle />
            <span>{location.state.mensajeExito}</span>
          </div>
        )}

        {/* Mensaje de Error (si existe) */}
        {error && (
          <div style={{
            backgroundColor: "var(--color-danger-bg)",
            color: "var(--color-danger)",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.88rem",
            fontWeight: "600",
            border: "1px solid #FECACA",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Campo 1: Nombre / Cédula / Correo */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{
              fontSize: "0.92rem",
              fontWeight: "700",
              color: "var(--color-text-main)",
              paddingLeft: "4px"
            }}>
              Nombre
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{
                position: "absolute",
                left: "16px",
                color: "var(--color-secondary)",
                fontSize: "15px",
                display: "flex",
                alignItems: "center"
              }}>
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Ingresa tu nombre o correo"
                value={identificador}
                onChange={(e) => setIdentificador(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "44px",
                  paddingRight: "16px",
                  height: "48px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid rgba(39, 192, 100, 0.35)",
                  backgroundColor: "var(--color-secondary-light)",
                  fontSize: "0.95rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
                disabled={cargando}
              />
            </div>
          </div>

          {/* Campo 2: Contraseña */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{
              fontSize: "0.92rem",
              fontWeight: "700",
              color: "var(--color-text-main)",
              paddingLeft: "4px"
            }}>
              Contraseña
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{
                position: "absolute",
                left: "16px",
                color: "var(--color-secondary)",
                fontSize: "15px",
                display: "flex",
                alignItems: "center"
              }}>
                <FaLock />
              </span>
              <input
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "44px",
                  paddingRight: "46px",
                  height: "48px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid rgba(39, 192, 100, 0.35)",
                  backgroundColor: "var(--color-secondary-light)",
                  fontSize: "0.95rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
                disabled={cargando}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  background: "transparent",
                  border: "none",
                  color: "var(--color-secondary)",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
                title={mostrarPassword ? "Ocultar" : "Mostrar"}
              >
                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Enlace al Registro */}
          <div style={{
            textAlign: "center",
            fontSize: "0.88rem",
            color: "var(--color-text-muted)",
            marginTop: "4px"
          }}>
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registro"
              style={{
                color: "var(--color-primary)",
                fontWeight: "700",
                textDecoration: "none"
              }}
            >
              Regístrate
            </Link>
          </div>

          {/* Botón Principal: INGRESAR */}
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: "700",
              borderRadius: "var(--radius-full)",
              border: "none",
              marginTop: "8px",
              boxShadow: "0 6px 18px rgba(225, 45, 134, 0.3)",
              cursor: "pointer",
              opacity: cargando ? 0.7 : 1,
              transition: "transform 0.2s ease, opacity 0.2s ease"
            }}
          >
            {cargando ? "Iniciando sesión..." : "INGRESAR"}
          </button>
        </form>

        {/* Pie Informativo de Seguridad */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          fontSize: "0.78rem",
          color: "var(--color-text-muted)",
          textAlign: "center"
        }}>
          <FaShieldAlt style={{ color: "var(--color-primary)" }} />
          <span>Espacio seguro para compradores y productoras rurales</span>
        </div>
      </div>
    </div>
  );
}