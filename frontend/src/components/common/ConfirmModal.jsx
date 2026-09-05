import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({ titulo, mensaje, nombreElemento, onConfirmar, onCancelar }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(2px)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "380px",
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        animation: "fadeIn 0.2s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-danger-bg)",
            color: "var(--color-danger)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0
          }}>
          <FaExclamationTriangle />
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", margin: 0, color: "var(--color-text-main)" }}>
              {titulo || "Confirmar eliminación"}
            </h3>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.4 }}>
          {mensaje || "¿Estás segura de que deseas eliminar este producto? Esta acción no se puede deshacer."}
        </p>

        {nombreElemento && (
          <div style={{
            padding: "10px 14px",
            backgroundColor: "var(--color-bg)",
            borderRadius: "var(--radius-sm)",
            fontWeight: "600",
            fontSize: "0.9rem",
            color: "var(--color-text-main)"
          }}>
            "{nombreElemento}"
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button
            type="button"
            onClick={onCancelar}
            style={{
              flex: 1,
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text-main)",
              border: "1px solid var(--color-border)",
              padding: "12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.9rem",
              fontWeight: "600"
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            style={{
              flex: 1,
              backgroundColor: "var(--color-danger)",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.9rem",
              fontWeight: "700",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}