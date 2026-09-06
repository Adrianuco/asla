import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistroUsuario from "../components/RegistroUsuario";
import { FaStore, FaUserCheck } from "react-icons/fa";
import aslaLogo from "../assets/asla-logo.svg";
import "../animaciones/animaciones.css";
import "../Style.css";

export default function RegisterUserPage() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);

  // Manejador del éxito de registro desde el componente de la compañera
  const handleRegisterSuccess = (nuevoUsuario) => {
    setUsuarioRegistrado(nuevoUsuario);

    try {
      localStorage.setItem("asla_usuario_comprador", JSON.stringify(nuevoUsuario));
    } catch (e) {
      console.error(e);
    }

    // Validación de género: si es mujer (femenino), se le ofrece ser productora
    const esMujer = nuevoUsuario?.gender?.toLowerCase() === "femenino" || nuevoUsuario?.genero?.toLowerCase() === "femenino";

    if (esMujer) {
      setMostrarModal(true);
    } else {
      // Si NO es mujer, continúa el flujo de comprador directamente a home
      navigate("/home", {
        state: {
          usuario: nuevoUsuario,
          mensajeBienvenida: `¡Bienvenido a ASLA, ${nuevoUsuario?.name || ""}!`
        }
      });
    }
  };

  // La usuaria decide ser productora
  const handleAceptarProductora = () => {
    setMostrarModal(false);
    navigate("/registro-productora", {
      state: {
        datosUsuario: {
          idUsuario: usuarioRegistrado?.idUsuario || usuarioRegistrado?.usuarioId,
          nombre: usuarioRegistrado?.nombre || usuarioRegistrado?.name || "",
          apellido: usuarioRegistrado?.apellido || "",
          correo: usuarioRegistrado?.correo || usuarioRegistrado?.email || "",
          cedula: usuarioRegistrado?.cedula || "",
          telefono: usuarioRegistrado?.telefono || "",
          genero: "Femenino",
          fotoUrl: usuarioRegistrado?.fotoUrl || usuarioRegistrado?.imagenUrl || ""
        }
      }
    });
  };

  // La usuaria decide NO ser productora (solo compradora) -> va a /home
  const handleRechazarProductora = () => {
    setMostrarModal(false);
    try {
      localStorage.setItem("asla_usuario_comprador", JSON.stringify(usuarioRegistrado));
    } catch (e) {
      console.error(e);
    }
    navigate("/home", {
      state: {
        usuario: usuarioRegistrado,
        mensajeBienvenida: `¡Bienvenida a ASLA, ${usuarioRegistrado?.name || ""}!`
      }
    });
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Pantalla de Registro de la compañera */}
      <RegistroUsuario
        onBack={() => navigate("/login")}
        onNavigateLogin={() => navigate("/login")}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Modal de Validación Condicional: "¿Deseas ser productora?" */}
      {mostrarModal && (
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
              Hola <strong style={{ color: "var(--color-primary, #E12D86)" }}>{usuarioRegistrado?.name}</strong>, como mujer rural o emprendedora puedes publicar y vender tus cosechas y productos directamente en ASLA.
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
              {/* Opción SÍ: Conducir a Registro de Productora */}
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
                onClick={handleRechazarProductora}
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
    </div>
  );
}
