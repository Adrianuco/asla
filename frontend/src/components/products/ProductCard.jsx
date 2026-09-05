import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import { UNIDADES_MEDIDA } from "../../data/mockData";
import { FaTrashAlt, FaPencilAlt, FaRegCalendarAlt, FaExchangeAlt } from "react-icons/fa";

export default function ProductCard({ producto, onEliminar }) {
  const unidad = producto.unidadMedidaNombre || UNIDADES_MEDIDA.find(u => u.idUnidadMedida === (producto.idUnidadMedida ?? producto.unidadMedidaId))?.nombre || "";
  const esSoloTrueque = producto.permiteTrueque && (!producto.permiteVenta || producto.precio === 0);

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "15 may 2024";
    try {
      const fecha = new Date(fechaStr);
      const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      const dia = fecha.getDate();
      const mes = meses[fecha.getMonth()];
      const anio = fecha.getFullYear();
      return `${dia} ${mes} ${anio}`;
    } catch {
      return "15 may 2024";
    }
  };

  return (
    <article style={{
      backgroundColor: "var(--color-surface)",
      borderRadius: "16px",
      boxShadow: "var(--shadow-sm)",
      padding: "12px",
      display: "flex",
      gap: "12px",
      alignItems: "center",
      transition: "all 0.2s ease"
    }}>
      {/* 1. Imagen del Producto (Izquierda) */}
      <div style={{
        width: "90px",
        height: "90px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#E2E8F0",
        flexShrink: 0
      }}>
        <img
          src={producto.imagenUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80"}
          alt={producto.nombre}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80";
          }}
        />
      </div>

      {/* 2. Información del Producto (Derecha) */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        overflow: "hidden"
      }}>
        {/* Fila Superior: Nombre y Acciones */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <h3 style={{
            fontSize: "0.98rem",
            fontWeight: "800",
            color: "var(--color-text-main)",
            margin: 0,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {producto.nombre}
          </h3>

          {/* Íconos de Acciones: Editar (izquierda), Eliminar (derecha) */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <Link
              to={`/productos/editar/${producto.idProducto}`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "#F1F5F9",
                color: "#64748B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                textDecoration: "none",
                transition: "background 0.2s ease"
              }}
              title="Editar producto"
            >
              <FaPencilAlt />
            </Link>

            <button
              type="button"
              onClick={() => onEliminar(producto)}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "#FEF2F2",
                color: "#EF4444",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                cursor: "pointer",
                transition: "background 0.2s ease"
              }}
              title="Eliminar producto"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>

        {/* Precio */}
        <div style={{ fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
          {producto.permiteVenta && producto.precio > 0 ? (
            <>
              <span>C$ {Number(producto.precio).toFixed(2)}</span>
              {unidad && <span style={{ color: "#64748B", fontWeight: "500", fontSize: "0.8rem" }}> / {unidad}</span>}
            </>
          ) : (
            <span style={{ color: "#C2410C", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <FaExchangeAlt /> Solo Trueque
            </span>
          )}
        </div>

        {/* Badge de Estado */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
          <StatusBadge estado={producto.estado} soloTrueque={esSoloTrueque} />
        </div>

        {/* Fecha de Publicación */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "0.74rem",
          color: "#94A3B8",
          marginTop: "2px"
        }}>
          <FaRegCalendarAlt style={{ fontSize: "11px" }} />
          <span>Publicado el {formatearFecha(producto.fechaPublicacion)}</span>
        </div>
      </div>
    </article>
  );
}