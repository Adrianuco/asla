import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

export default function AdminHeader() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: "12px 12px 0 12px" }}>
      <header style={{
        backgroundColor: "var(--color-primary)",
        boxShadow: "0 6px 18px rgba(225, 45, 134, 0.25)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "20px"
      }}>
        <Link
          to="/productos"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#ffffff"
          }}
        >
          <span style={{
            fontSize: "1.45rem",
            fontWeight: "800",
            letterSpacing: "-0.5px",
            color: "#ffffff"
          }}>
            Asla
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            to="/home"
            style={{
              backgroundColor: "#27C064",
              color: "#ffffff",
              padding: "6px 12px",
              fontSize: "0.8rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "var(--radius-full)",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(39, 192, 100, 0.3)"
            }}
            title="Ir al Marketplace de Compradoras"
          >
            🛒 Modo Compradora
          </Link>

          <button
            onClick={logout}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              padding: "6px 14px",
              fontSize: "0.82rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "var(--radius-full)",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              cursor: "pointer",
              backdropFilter: "blur(4px)"
            }}
            title="Cerrar sesión"
          >
            <FaSignOutAlt style={{ transform: "rotate(180deg)" }} /> Salir
          </button>
        </div>
      </header>
    </div>
  );
}