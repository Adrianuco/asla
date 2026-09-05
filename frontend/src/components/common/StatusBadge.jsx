export default function StatusBadge({ estado, soloTrueque = false }) {
  if (soloTrueque || estado === 3 || estado === "trueque") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#FFEDD5",
        color: "#C2410C",
        padding: "3px 10px",
        borderRadius: "var(--radius-full)",
        fontSize: "0.75rem",
        fontWeight: "700"
      }}>
        Trueque
      </span>
    );
  }

  if (estado === 1 || estado === "activo") {
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        color: "#166534",
        padding: "3px 10px",
        borderRadius: "var(--radius-full)",
        fontSize: "0.75rem",
        fontWeight: "700"
      }}>
        Activo
      </span>
    );
  }

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "#F3E8FF",
      color: "#6B21A8",
      padding: "3px 10px",
      borderRadius: "var(--radius-full)",
      fontSize: "0.75rem",
      fontWeight: "700"
    }}>
      Inactivo
    </span>
  );
}