import { NavLink } from "react-router-dom";
import { FaLeaf, FaPlus, FaUser } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "72px",
      backgroundColor: "var(--color-surface)",
      borderTop: "1px solid var(--color-border)",
      boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.04)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      maxWidth: "480px",
      margin: "0 auto",
      padding: "0 8px",
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px"
    }}>
      {/* 1. Productos (Ícono de Hoja) */}
      <NavLink
        to="/productos"
        style={({ isActive }) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          textDecoration: "none",
          color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
          backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
          padding: "8px 20px",
          borderRadius: "var(--radius-full)",
          fontWeight: isActive ? "700" : "600",
          fontSize: "0.78rem",
          transition: "all 0.2s ease"
        })}
      >
        <FaLeaf style={{ fontSize: "20px" }} />
        <span>Productos</span>
      </NavLink>

      {/* 2. Publicar (Botón central flotante) */}
      <NavLink
        to="/publicar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          textDecoration: "none",
          color: "var(--color-primary)",
          transform: "translateY(-18px)"
        }}
      >
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-primary)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 6px 16px rgba(225, 45, 134, 0.35)",
          border: "4px solid var(--color-surface)",
          transition: "transform 0.2s ease"
        }}>
          <FaPlus />
        </div>
        <span style={{
          color: "var(--color-primary)",
          fontWeight: "700",
          fontSize: "0.78rem"
        }}>
          Publicar
        </span>
      </NavLink>

      {/* 3. Usuario */}
      <NavLink
        to="/perfil"
        style={({ isActive }) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          textDecoration: "none",
          color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
          backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
          padding: "8px 24px",
          borderRadius: "var(--radius-full)",
          fontWeight: isActive ? "700" : "600",
          fontSize: "0.78rem",
          transition: "all 0.2s ease"
        })}
      >
        <FaUser style={{ fontSize: "20px" }} />
        <span>Usuario</span>
      </NavLink>
    </nav>
  );
}