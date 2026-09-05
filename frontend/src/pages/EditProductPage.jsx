import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import { obtenerProductos } from "../data/mockData";
import { productoService } from "../services/productoService";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(() => {
    const p = obtenerProductos().find(x => x.idProducto === Number(id));
    return p || null;
  });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    async function cargarProducto() {
      try {
        const prod = await productoService.getProductoById(id);
        if (prod) {
          setProducto(prod);
        }
      } catch (err) {
        console.error("Error al cargar producto:", err);
      } finally {
        setCargando(false);
      }
    }
    cargarProducto();
  }, [id]);

  const handleActualizarProducto = async (datosActualizados) => {
    setGuardando(true);
    try {
      await productoService.updateProducto(id, datosActualizados);
      navigate("/productos", { state: { mensajeToast: "¡Producto actualizado con éxito!" } });
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      alert("No se pudo actualizar el producto. Por favor intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  // Si está cargando
  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--color-text-muted)" }}>
        Cargando información del producto...
      </div>
    );
  }

  // Si no se encuentra el producto
  if (!producto) {
    return (
      <div style={{
        backgroundColor: "var(--color-surface)",
        padding: "32px 20px",
        borderRadius: "var(--radius-lg)",
        border: "none", boxShadow: "var(--shadow-md)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px"
      }}>
        <FaExclamationCircle style={{ fontSize: "36px", color: "var(--color-danger)" }} />
        <h3 style={{ fontSize: "1.2rem", margin: 0, color: "var(--color-text-main)" }}>
          Producto no encontrado
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", margin: 0 }}>
          El producto que intentas editar no existe o fue eliminado previamente.
        </p>
        <Link
          to="/productos"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#ffffff",
            padding: "10px 18px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9rem",
            fontWeight: "700",
            textDecoration: "none",
            marginTop: "6px"
          }}
        >
          Volver a Mis Productos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Cabecera con botón de retroceso */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link
          to="/productos"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-surface)",
            border: "none", boxShadow: "var(--shadow-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-text-main)",
            textDecoration: "none"
          }}
          title="Volver al catálogo"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", margin: 0 }}>
            Editar Producto
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: 0 }}>
            Modifica los detalles, precio, fotos o estado de tu producto.
          </p>
        </div>
      </div>

      {/* Formulario con los datos cargados */}
      <ProductForm
        productoInicial={producto}
        onGuardar={handleActualizarProducto}
        textoBoton="Guardar Cambios"
        cargando={guardando}
      />
    </div>
  );
}
