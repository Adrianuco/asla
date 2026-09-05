import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import { crearProducto } from "../data/mockData";
import { FaArrowLeft } from "react-icons/fa";

export default function PublishProductPage() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  const handleGuardarProducto = (datosNuevoProducto) => {
    setCargando(true);
    setTimeout(() => {
      crearProducto(datosNuevoProducto);
      setCargando(false);
      // Redirigir al catálogo para ver el producto recién publicado
      navigate("/productos", { state: { mensajeToast: "¡Producto publicado con éxito!" } });
    }, 300);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Cabecera con botÓn de retroceso */}
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
            Publicar Producto
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", margin: 0 }}>
            Muestra tu producto para que posibles compradores puedan conocerlo.
          </p>
        </div>
      </div>

      {/* Formulario Reutilizable */}
      <ProductForm
        onGuardar={handleGuardarProducto}
        textoBoton="Publicar Producto"
        cargando={cargando}
      />
    </div>
  );
}
