import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CATEGORIAS, UNIDADES_MEDIDA } from "../../data/mockData";
import { categoriaService } from "../../services/categoriaService";
import { unidadMedidaService } from "../../services/unidadMedidaService";
import { FaCamera, FaQuestionCircle, FaExchangeAlt, FaCheck, FaTrashAlt } from "react-icons/fa";

export default function ProductForm({
  productoInicial = null,
  onGuardar,
  textoBoton = "Publicar Producto",
  cargando = false
}) {
  const esEdicion = Boolean(productoInicial);

  const [categorias, setCategorias] = useState(CATEGORIAS);
  const [unidadesMedida, setUnidadesMedida] = useState(UNIDADES_MEDIDA);

  useEffect(() => {
    categoriaService.getCategorias().then((data) => {
      if (Array.isArray(data) && data.length > 0) setCategorias(data);
    });
    unidadMedidaService.getUnidadesMedida().then((data) => {
      if (Array.isArray(data) && data.length > 0) setUnidadesMedida(data);
    });
  }, []);

  const [formData, setFormData] = useState({
    nombre: productoInicial?.nombre || "",
    descripcion: productoInicial?.descripcion || "",
    idCategoria: productoInicial?.idCategoria || 1,
    idUnidadMedida: productoInicial?.idUnidadMedida || 1,
    precio: productoInicial?.precio !== undefined ? productoInicial.precio : 100,
    permiteVenta: productoInicial?.permiteVenta !== undefined ? productoInicial.permiteVenta : true,
    permiteTrueque: productoInicial?.permiteTrueque !== undefined ? productoInicial.permiteTrueque : false,
    estado: productoInicial?.estado !== undefined ? Number(productoInicial.estado) : 1, // Registrar => 1 (Activo)
    imagenUrl: productoInicial?.imagenUrl || ""
  });

  const [errores, setErrores] = useState({});
  const [tooltipActivo, setTooltipActivo] = useState(null);

  // Referencia para activar la cámara del celular mediante el input de archivo
  const fileInputRef = useRef(null);

  const toggleTooltip = (campo) => {
    setTooltipActivo(prev => prev === campo ? null : campo);
  };

  const handleAbrirCamara = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCapturarFoto = (e) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagenUrl: lector.result
        }));
      };
      lector.readAsDataURL(archivo);
    }
  };

  const handleEliminarFoto = () => {
    setFormData(prev => ({
      ...prev,
      imagenUrl: ""
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTruequeToggle = (acepta) => {
    setFormData((prev) => ({
      ...prev,
      permiteTrueque: acepta
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "Por favor ingresa el nombre del producto.";
    }

    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = "Ingresa una breve descripción de tu producto.";
    }

    if (formData.permiteVenta && (isNaN(formData.precio) || Number(formData.precio) <= 0)) {
      nuevosErrores.precio = "Ingresa un precio válido en córdobas (mayor a 0).";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const datosLimpios = {
      ...formData,
      idCategoria: Number(formData.idCategoria),
      idUnidadMedida: Number(formData.idUnidadMedida),
      precio: formData.permiteVenta ? Number(formData.precio) : 0,
      estado: esEdicion ? Number(formData.estado) : 1 // Si es Registrar => Estado inicial es 1 (Activo)
    };

    onGuardar(datosLimpios);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      
      {/* Input Oculto de Cámara Nativa (HTML5 Capture) */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleCapturarFoto}
        style={{ display: "none" }}
      />

      {/* 1. SECCIÓN: FOTO DEL PRODUCTO / CÁMARA */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        padding: "18px 16px",
        borderRadius: "20px",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--color-text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaCamera style={{ color: "var(--color-primary)" }} /> Fotografía del Producto
          </label>
          <button
            type="button"
            onClick={() => toggleTooltip("foto")}
            style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "16px", padding: "2px" }}
            title="Ayuda sobre la foto"
          >
            <FaQuestionCircle />
          </button>
        </div>

        {/* Tooltip de Foto */}
        {tooltipActivo === "foto" && (
          <div style={{
            backgroundColor: "#FCE7F3",
            color: "#9D174D",
            padding: "10px 14px",
            borderRadius: "12px",
            fontSize: "0.82rem",
            lineHeight: 1.4,
            border: "1px solid #FBCFE8"
          }}>
            💡 Puedes tomar una foto directamente con la cámara de tu celular. Una buena foto ayuda a que los compradores conozcan la calidad de tu cosecha.
          </div>
        )}

        {/* Espacio para tomar o previsualizar foto */}
        {formData.imagenUrl ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{
              width: "100%",
              height: "200px",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#F8FAFC",
              boxShadow: "var(--shadow-sm)",
              position: "relative"
            }}>
              <img
                src={formData.imagenUrl}
                alt="Vista previa del producto"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            {/* Botones de Acción sobre la Foto (Tomar otra / Eliminar) */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={handleAbrirCamara}
                style={{
                  flex: 1,
                  height: "42px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-primary-light)",
                  color: "var(--color-primary-dark)",
                  border: "1.5px solid var(--color-primary)",
                  fontSize: "0.86rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer"
                }}
              >
                <FaCamera /> Tomar otra foto
              </button>

              <button
                type="button"
                onClick={handleEliminarFoto}
                style={{
                  flex: 1,
                  height: "42px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "#FEF2F2",
                  color: "#EF4444",
                  border: "1.5px solid #FECACA",
                  fontSize: "0.86rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer"
                }}
              >
                <FaTrashAlt /> Eliminar foto
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={handleAbrirCamara}
            style={{
              width: "100%",
              height: "190px",
              borderRadius: "16px",
              backgroundColor: "#F8FAFC",
              border: "2px dashed var(--color-primary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "20px",
              textAlign: "center"
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px"
            }}>
              <FaCamera />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: "800", fontSize: "0.98rem", color: "var(--color-text-main)" }}>
                Agrega una foto del producto
              </p>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: "600" }}>
                Toca aquí para abrir la cámara de tu celular
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. SECCIÓN: DATOS PRINCIPALES (Nombre, Categoría, Unidad, Precio, Descripción) */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        padding: "18px 16px",
        borderRadius: "20px",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>

        {/* NOMBRE DEL PRODUCTO */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-text-main)" }}>
              Nombre *
            </label>
            <button
              type="button"
              onClick={() => toggleTooltip("nombre")}
              style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "15px" }}
              title="Ayuda sobre Nombre"
            >
              <FaQuestionCircle />
            </button>
          </div>

          {tooltipActivo === "nombre" && (
            <div style={{
              backgroundColor: "#FCE7F3",
              color: "#9D174D",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "0.8rem",
              lineHeight: 1.35
            }}>
              Escribe un nombre claro y sencillo del producto (ej. Aguacate Hass, Café de Altura, Miel Virgen).
            </div>
          )}

          <input
            type="text"
            name="nombre"
            placeholder="Ej. Aguacate Hass"
            value={formData.nombre}
            onChange={handleChange}
            style={{
              paddingLeft: "14px",
              height: "46px",
              borderRadius: "var(--radius-full)",
              borderColor: errores.nombre ? "var(--color-danger)" : "var(--color-border)",
              fontSize: "0.95rem"
            }}
          />
          {errores.nombre && (
            <span style={{ fontSize: "0.8rem", color: "var(--color-danger)" }}>{errores.nombre}</span>
          )}
        </div>

        {/* CATEGORÍA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-text-main)" }}>
              Categoría *
            </label>
            <button
              type="button"
              onClick={() => toggleTooltip("categoria")}
              style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "15px" }}
              title="Ayuda sobre Categoría"
            >
              <FaQuestionCircle />
            </button>
          </div>

          {tooltipActivo === "categoria" && (
            <div style={{
              backgroundColor: "#FCE7F3",
              color: "#9D174D",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "0.8rem",
              lineHeight: 1.35
            }}>
              Selecciona el grupo al que pertenece tu producto para que los compradores puedan encontrarlo fácilmente.
            </div>
          )}

          <select
            name="idCategoria"
            value={formData.idCategoria}
            onChange={handleChange}
            style={{
              height: "46px",
              borderRadius: "var(--radius-full)",
              borderColor: "var(--color-border)",
              fontSize: "0.95rem",
              paddingLeft: "14px",
              paddingRight: "14px"
            }}
          >
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* UNIDAD DE MEDIDA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-text-main)" }}>
              Unidad de medida *
            </label>
            <button
              type="button"
              onClick={() => toggleTooltip("unidad")}
              style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "15px" }}
              title="Ayuda sobre Unidad de medida"
            >
              <FaQuestionCircle />
            </button>
          </div>

          {tooltipActivo === "unidad" && (
            <div style={{
              backgroundColor: "#FCE7F3",
              color: "#9D174D",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "0.8rem",
              lineHeight: 1.35
            }}>
              Indica cómo mides o vendes la cantidad de tu cosecha (ej. por Docena, por Libra, por Kilogramo o por Unidad).
            </div>
          )}

          <select
            name="idUnidadMedida"
            value={formData.idUnidadMedida}
            onChange={handleChange}
            style={{
              height: "46px",
              borderRadius: "var(--radius-full)",
              borderColor: "var(--color-border)",
              fontSize: "0.95rem",
              paddingLeft: "14px",
              paddingRight: "14px"
            }}
          >
            {unidadesMedida.map((und) => (
              <option key={und.idUnidadMedida} value={und.idUnidadMedida}>
                {und.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* PRECIO EN CÓRDOBAS (C$) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-text-main)" }}>
            Precio en Córdobas (C$) *
          </label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "16px", fontWeight: "800", color: "var(--color-primary)" }}>
              C$
            </span>
            <input
              type="number"
              name="precio"
              step="0.50"
              min="0"
              placeholder="0.00"
              value={formData.precio}
              onChange={handleChange}
              style={{
                width: "100%",
                paddingLeft: "48px",
                height: "46px",
                borderRadius: "var(--radius-full)",
                borderColor: errores.precio ? "var(--color-danger)" : "var(--color-border)",
                fontSize: "0.95rem"
              }}
            />
          </div>
          {errores.precio && (
            <span style={{ fontSize: "0.8rem", color: "var(--color-danger)" }}>{errores.precio}</span>
          )}
        </div>

        {/* DESCRIPCIÓN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-text-main)" }}>
              Descripción *
            </label>
            <button
              type="button"
              onClick={() => toggleTooltip("descripcion")}
              style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "15px" }}
              title="Ayuda sobre Descripción"
            >
              <FaQuestionCircle />
            </button>
          </div>

          {tooltipActivo === "descripcion" && (
            <div style={{
              backgroundColor: "#FCE7F3",
              color: "#9D174D",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "0.8rem",
              lineHeight: 1.35
            }}>
              Escribe los detalles de tu producto: si es orgánico, artesanal, de temporada o características de su cosecha.
            </div>
          )}

          <textarea
            name="descripcion"
            rows="4"
            placeholder="Describe las características, calidad o información importante del producto..."
            value={formData.descripcion}
            onChange={handleChange}
            style={{
              padding: "12px 14px",
              borderRadius: "16px",
              borderColor: errores.descripcion ? "var(--color-danger)" : "var(--color-border)",
              resize: "vertical",
              fontSize: "0.92rem",
              lineHeight: 1.4
            }}
          />
          {errores.descripcion && (
            <span style={{ fontSize: "0.8rem", color: "var(--color-danger)" }}>{errores.descripcion}</span>
          )}
        </div>
      </div>

      {/* 3. SECCIÓN: OPCIÓN DE TRUEQUE */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        padding: "18px 16px",
        borderRadius: "20px",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--color-text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
            <FaExchangeAlt style={{ color: "var(--color-barter)" }} /> ¿Permitir trueque?
          </label>
          <button
            type="button"
            onClick={() => toggleTooltip("trueque")}
            style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "15px" }}
            title="Ayuda sobre Trueque"
          >
            <FaQuestionCircle />
          </button>
        </div>

        {tooltipActivo === "trueque" && (
          <div style={{
            backgroundColor: "#FEF3C7",
            color: "#92400E",
            padding: "10px 14px",
            borderRadius: "12px",
            fontSize: "0.82rem",
            lineHeight: 1.4,
            border: "1px solid #FDE68A"
          }}>
            Indica si permites intercambiar tu producto por otros productos o semillas con otras productoras.
          </div>
        )}

        {/* Selector de Sí / No para Trueque */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            onClick={() => handleTruequeToggle(false)}
            style={{
              flex: 1,
              height: "44px",
              borderRadius: "var(--radius-full)",
              border: `2px solid ${!formData.permiteTrueque ? "var(--color-primary)" : "var(--color-border)"}`,
              backgroundColor: !formData.permiteTrueque ? "var(--color-primary-light)" : "#F8FAFC",
              color: !formData.permiteTrueque ? "" : "var(--color-text-muted)",
              fontSize: "0.95rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer"
            }}
          >
            {formData.permiteTrueque && <FaCheck />} Sí
          </button>

          <button
            type="button"
            onClick={() => handleTruequeToggle(true)}
            style={{
              flex: 1,
              height: "44px",
              borderRadius: "var(--radius-full)",
              border: `2px solid ${formData.permiteTrueque ? "var(--color-barter)" : "var(--color-border)"}`,
              backgroundColor: formData.permiteTrueque ? "#FEF3C7" : "#F8FAFC",
              color: formData.permiteTrueque ? "#92400E" : "var(--color-text-muted)",
              fontSize: "0.95rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              cursor: "pointer"
            }}
          >
            {!formData.permiteTrueque && <FaCheck />} No
          </button>
        </div>
      </div>

      {/* 4. SECCIÓN: ESTADO DEL PRODUCTO (ÚNICAMENTE VISIBLE AL EDITAR PRODUCTO) */}
      {esEdicion && (
        <div style={{
          backgroundColor: "var(--color-surface)",
          padding: "18px 16px",
          borderRadius: "20px",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--color-text-main)" }}>
              Estado del Producto
            </label>
            <button
              type="button"
              onClick={() => toggleTooltip("estado")}
              style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: "15px" }}
              title="Ayuda sobre Estado"
            >
              <FaQuestionCircle />
            </button>
          </div>

          {tooltipActivo === "estado" && (
            <div style={{
              backgroundColor: "#FCE7F3",
              color: "#9D174D",
              padding: "10px 14px",
              borderRadius: "12px",
              fontSize: "0.82rem",
              lineHeight: 1.4,
              border: "1px solid #FBCFE8"
            }}>
              Cambia el estado de la publicación según la disponibilidad de tu cosecha.
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            {/* Opción 1: Activo (1) */}
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, estado: 1 }))}
              style={{
                flex: 1,
                height: "44px",
                borderRadius: "var(--radius-full)",
                border: `2px solid ${Number(formData.estado) === 1 ? "#166534" : "var(--color-border)"}`,
                backgroundColor: Number(formData.estado) === 1 ? "#DCFCE7" : "#F8FAFC",
                color: Number(formData.estado) === 1 ? "#166534" : "var(--color-text-muted)",
                fontSize: "0.85rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              🟢 Activo
            </button>

            {/* Opción 2: Inactivo (2) */}
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, estado: 2 }))}
              style={{
                flex: 1, 
                height: "44px",
                borderRadius: "var(--radius-full)",
                border: `2px solid ${Number(formData.estado) === 2 ? "#6B21A8" : "var(--color-border)"}`,
                backgroundColor: Number(formData.estado) === 2 ? "#F3E8FF" : "#F8FAFC",
                color: Number(formData.estado) === 2 ? "#6B21A8" : "var(--color-text-muted)",
                fontSize: "0.85rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              🟣 Inactivo
            </button>
          </div>
        </div>
      )}

      {/* BOTONES DE ACCIÓN (Cancelar / Publicar / Guardar) */}
      <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
        <Link
          to="/productos"
          style={{
            flex: 1,
            backgroundColor: "#F1F5F9",
            color: "var(--color-text-main)",
            border: "1px solid var(--color-border)",
            height: "48px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.95rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none"
          }}
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={cargando}
          style={{
            flex: 2,
            backgroundColor: "var(--color-secondary)",
            color: "#ffffff",
            height: "48px",
            borderRadius: "var(--radius-full)",
            fontSize: "1rem",
            fontWeight: "700",
            border: "none",
            boxShadow: "0 6px 18px rgba(39, 192, 100, 0.3)",
            cursor: "pointer",
            opacity: cargando ? 0.7 : 1
          }}
        >
          {cargando ? "Guardando..." : textoBoton}
        </button>
      </div>
    </form>
  );
}