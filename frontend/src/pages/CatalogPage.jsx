import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import ConfirmModal from "../components/common/ConfirmModal";
import { useAuth } from "../context/AuthContext";
import { obtenerProductos } from "../data/mockData";
import { productoService } from "../services/productoService";
import { FaSearch, FaTimes, FaPlus, FaBoxes, FaCheck } from "react-icons/fa";

export default function CatalogPage() {
  const { usuario } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [productos, setProductos] = useState(() => obtenerProductos());
  const [cargando, setCargando] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mensajeToast, setMensajeToast] = useState("");

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setTimeout(() => {
      setMensajeToast("");
    }, 3000);
  };

  const cargarProductos = async () => {
    try {
      const data = await productoService.getProductos({
        productoraId: usuario?.idProductora || 1
      });
      if (Array.isArray(data) && data.length > 0) {
        setProductos(data);
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [usuario?.idProductora]);

  useEffect(() => {
    if (location.state && location.state.mensajeToast) {
      mostrarToast(location.state.mensajeToast);
      cargarProductos();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleConfirmarEliminar = async () => {
    if (!productoAEliminar) return;
    const id = productoAEliminar.idProducto;
    await productoService.deleteProducto(id);
    setProductos(prev => prev.filter(p => p.idProducto !== id && p.productoId !== id));
    mostrarToast(`"${productoAEliminar.nombre}" eliminado correctamente.`);
    setProductoAEliminar(null);
  };

  const totalTodos = productos.length;
  const totalActivos = productos.filter(p => p.estado === 1).length;
  const totalInactivos = productos.filter(p => p.estado === 0).length;
  const totalTrueque = productos.filter(p => p.permiteTrueque).length;

  const productosFiltrados = productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          p.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    let coincideEstado = true;
    if (filtroEstado === "activos") coincideEstado = p.estado === 1;
    if (filtroEstado === "inactivos") coincideEstado = p.estado === 0;
    if (filtroEstado === "trueque") coincideEstado = p.permiteTrueque === true;

    return coincideTexto && coincideEstado;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Toast de Notificación */}
      {mensajeToast && (
        <div style={{
          position: "fixed",
          top: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#1F2937",
          color: "#FFFFFF",
          padding: "10px 18px",
          borderRadius: "var(--radius-full)",
          fontSize: "0.85rem",
          fontWeight: "600",
          boxShadow: "var(--shadow-lg)",
          zIndex: 90,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          maxWidth: "90%",
          textAlign: "center"
        }}>
          <FaCheck style={{ color: "var(--color-active)" }} />
          <span>{mensajeToast}</span>
        </div>
      )}

      {/* Tarjeta de Bienvenida */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        padding: "16px",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        alignItems: "center",
        gap: "14px"
      }}>
        <div style={{
          position: "relative",
          width: "56px",
          height: "56px",
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
          border: "2.5px solid var(--color-primary)",
          boxShadow: "var(--shadow-sm)",
          flexShrink: 0
        }}>
          <img
            src={usuario?.fotoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"}
            alt={usuario?.nombre || "Productora"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <h2 style={{
            fontSize: "1.15rem",
            fontWeight: "800",
            color: "var(--color-text-main)",
            margin: 0,
            lineHeight: 1.2
          }}>
            ¡Bienvenida, {usuario?.nombre ? `${usuario.nombre}!` : "Santos!"}
          </h2>
          <p style={{
            fontSize: "0.82rem",
            color: "var(--color-text-muted)",
            margin: 0,
            fontWeight: "500"
          }}>
            {usuario?.nombreEmprendimiento || "Finca El Renacer & Café de Altura"}
          </p>
        </div>
      </div>

      {/* Encabezado Mis Productos + Botón Publicar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: "1.2rem", color: "var(--color-text-main)", margin: 0, fontWeight: "800" }}>
            Mis Productos
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: 0 }}>
            {totalTodos} {totalTodos === 1 ? "producto registrado" : "productos registrados"}
          </p>
        </div>

        <Link
          to="/publicar"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.88rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(225, 45, 134, 0.3)"
          }}
        >
          <FaPlus /> Publicar
        </Link>
      </div>

      {/* Buscador de Productos */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{ position: "absolute", left: "14px", color: "var(--color-text-muted)", fontSize: "14px" }}>
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            paddingLeft: "40px",
            paddingRight: busqueda ? "40px" : "14px",
            fontSize: "0.95rem",
            borderRadius: "var(--radius-full)",
            border: "none",
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-sm)"
          }}
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => setBusqueda("")}
            style={{
              position: "absolute",
              right: "12px",
              background: "transparent",
              color: "var(--color-text-muted)",
              padding: "6px"
            }}
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Pestañas de Filtro por Estado */}
      <div style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "8px",
        scrollbarWidth: "none"
      }}>
        <button
          type="button"
          onClick={() => setFiltroEstado("todos")}
          style={{
            backgroundColor: filtroEstado === "todos" ? "var(--color-primary)" : "var(--color-surface)",
            color: filtroEstado === "todos" ? "#ffffff" : "var(--color-text-muted)",
            border: "none",
            boxShadow: filtroEstado === "todos" ? "0 4px 12px rgba(225, 45, 134, 0.3)" : "var(--shadow-sm)",
            padding: "8px 16px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.85rem",
            fontWeight: "700",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
        >
          Todos ({totalTodos})
        </button>

        <button
          type="button"
          onClick={() => setFiltroEstado("activos")}
          style={{
            backgroundColor: filtroEstado === "activos" ? "#DCFCE7" : "var(--color-surface)",
            color: filtroEstado === "activos" ? "#166534" : "var(--color-text-muted)",
            border: "none",
            boxShadow: filtroEstado === "activos" ? "0 4px 12px rgba(22, 163, 74, 0.25)" : "var(--shadow-sm)",
            padding: "8px 16px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.85rem",
            fontWeight: "700",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
        >
          🟢 Activos ({totalActivos})
        </button>

        <button
          type="button"
          onClick={() => setFiltroEstado("inactivos")}
          style={{
            backgroundColor: filtroEstado === "inactivos" ? "#F3E8FF" : "var(--color-surface)",
            color: filtroEstado === "inactivos" ? "#6B21A8" : "var(--color-text-muted)",
            border: "none",
            boxShadow: filtroEstado === "inactivos" ? "0 4px 12px rgba(107, 33, 168, 0.25)" : "var(--shadow-sm)",
            padding: "8px 16px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.85rem",
            fontWeight: "700",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
        >
          🟣 Inactivos ({totalInactivos})
        </button>

        <button
          type="button"
          onClick={() => setFiltroEstado("trueque")}
          style={{
            backgroundColor: filtroEstado === "trueque" ? "#FFEDD5" : "var(--color-surface)",
            color: filtroEstado === "trueque" ? "#C2410C" : "var(--color-text-muted)",
            border: "none",
            boxShadow: filtroEstado === "trueque" ? "0 4px 12px rgba(194, 65, 12, 0.25)" : "var(--shadow-sm)",
            padding: "8px 16px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.85rem",
            fontWeight: "700",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease"
          }}
        >
          🟠 Trueques ({totalTrueque})
        </button>
      </div>

      {/* Lista de Productos en Cards */}
      {cargando ? (
        <div style={{
          textAlign: "center",
          padding: "40px 20px",
          color: "var(--color-text-muted)",
          fontSize: "0.95rem"
        }}>
          🌱 Cargando tus productos...
        </div>
      ) : productosFiltrados.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.idProducto}
              producto={producto}
              onEliminar={setProductoAEliminar}
            />
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: "var(--color-surface)",
          border: "2px dashed var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "36px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-primary-light)",
            color: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px"
          }}>
            <FaBoxes />
          </div>
          <h3 style={{ fontSize: "1.1rem", margin: 0, color: "var(--color-text-main)" }}>
            {busqueda ? "No se encontraron coincidencias" : "No tienes productos en esta sección"}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: 0, maxWidth: "280px" }}>
            {busqueda
              ? "Prueba buscando con otra palabra o limpia el filtro de búsqueda."
              : "Comienza a mostrar tus productos a posibles compradores publicando el primero."}
          </p>

          {!busqueda && (
            <Link
              to="/publicar"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
                padding: "10px 18px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.9rem",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                marginTop: "6px"
              }}
            >
              <FaPlus /> Publicar Producto
            </Link>
          )}
        </div>
      )}

      {/* Modal de Confirmación */}
      {productoAEliminar && (
        <ConfirmModal
          titulo="¿Eliminar producto?"
          mensaje="Este producto ya no estará visible para posibles compradores."
          nombreElemento={productoAEliminar.nombre}
          onConfirmar={handleConfirmarEliminar}
          onCancelar={() => setProductoAEliminar(null)}
        />
      )}
    </div>
  );
}