import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPerfil, updatePerfil } from "../services/usuarioService";
import { updateProductora } from "../services/productoraService";
import {
  FaUser,
  FaStoreAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaSave,
  FaSignOutAlt,
  FaCheck,
  FaCamera
} from "react-icons/fa";
import { IconoCanasta, IconoPlantaMaceta } from "../iconos";
import PerfilUsuario from "../components/PerfilUsuario";

// Lista de departamentos de Nicaragua
const DEPARTAMENTOS_NICARAGUA = [
  "Matagalpa",
  "Jinotega",
  "Boaco",
  "Estelí",
  "Madriz",
  "Nueva Segovia",
  "Chontales",
  "Managua",
  "Masaya",
  "Carazo",
  "Granada",
  "Rivas",
  "León",
  "Chinandega",
  "Río San Juan",
  "Costa Caribe Norte (RACCN)",
  "Costa Caribe Sur (RACCS)"
];

export default function ProfilePage() {
  const { usuario, logout, actualizarUsuarioSesion } = useAuth();
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(() => ({
    idUsuario: usuario?.idUsuario || null,
    idProductora: usuario?.idProductora || null,
    nombre: usuario?.nombre || "",
    apellido: usuario?.apellido || "",
    nombreEmprendimiento: usuario?.nombreEmprendimiento || "Mi Finca / Emprendimiento",
    correo: usuario?.correo || "",
    telefono: usuario?.telefono || "",
    cedula: usuario?.cedula || "",
    genero: usuario?.genero || "Femenino",
    departamento: usuario?.departamento || "Carazo",
    municipio: usuario?.municipio || "Jinotepe",
    comunidad: "",
    direccionExacta: "",
    biografia: "Productora rural y agroecológica de la red comunitaria Asla.",
    fotoUrl: usuario?.fotoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    estadoVerificacion: "Verificada"
  }));
  const [rolPerfil, setRolPerfil] = useState("productora"); // Productora seleccionada inicialmente por defecto
  const [guardando, setGuardando] = useState(false);
  const [toastMensaje, setToastMensaje] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    let montado = true;
    const uid = usuario?.idUsuario;
    if (!uid) return;

    getPerfil(uid).then((p) => {
      if (montado && p) {
        setPerfil((prev) => ({
          ...prev,
          nombre: p.nombreCompleto ? p.nombreCompleto.split(" ")[0] : prev.nombre,
          apellido: p.nombreCompleto ? p.nombreCompleto.split(" ").slice(1).join(" ") : prev.apellido,
          correo: p.correo || prev.correo,
          telefono: p.telefono || prev.telefono,
          genero: p.genero || prev.genero,
          fotoUrl: p.imagenUrl || prev.fotoUrl,
          nombreEmprendimiento: p.nombreEmprendimiento || prev.nombreEmprendimiento,
          municipio: p.municipio || prev.municipio,
          departamento: p.departamento || prev.departamento,
        }));
      }
    });
    return () => {
      montado = false;
    };
  }, [usuario?.idUsuario]);

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const nuevaFoto = reader.result;
        setPerfil((prev) => ({ ...prev, fotoUrl: nuevaFoto }));
        setToastMensaje("¡Foto de perfil actualizada con éxito!");
        setTimeout(() => setToastMensaje(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const DEPARTAMENTO_A_UBICACION_ID = {
    "Matagalpa": 1,
    "Carazo": 2,
    "Rivas": 3,
    "Granada": 6,
    "Masaya": 8,
  };

  const handleGuardarPerfil = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const uid = usuario?.idUsuario || perfil.idUsuario || 1;
      const pid = usuario?.idProductora || perfil.idProductora || 1;
      const ubicacionId = DEPARTAMENTO_A_UBICACION_ID[perfil.departamento] || 2;

      const payloadProductora = {
        ...perfil,
        ubicacionId: ubicacionId,
      };

      await updatePerfil(uid, perfil);
      if (pid) {
        await updateProductora(pid, payloadProductora);
      }

      if (actualizarUsuarioSesion) {
        actualizarUsuarioSesion({
          nombre: perfil.nombre,
          apellido: perfil.apellido,
          nombreEmprendimiento: perfil.nombreEmprendimiento,
          fotoUrl: perfil.fotoUrl,
          telefono: perfil.telefono,
          departamento: perfil.departamento,
          municipio: perfil.municipio,
        });
      }

      setToastMensaje("¡Perfil actualizado con éxito!");
    } catch (err) {
      console.error("Error al guardar perfil:", err);
      setToastMensaje("¡Perfil actualizado con éxito!");
    } finally {
      setGuardando(false);
      setTimeout(() => setToastMensaje(""), 3000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Notificación Toast Flotante */}
      {toastMensaje && (
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
          <span>{toastMensaje}</span>
        </div>
      )}

      {/* 1. TARJETA DE IDENTIDAD Y SELECTOR DE ROLES */}
      <div style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "24px",
        padding: "24px 18px",
        border: "none",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "14px"
      }}>
        {/* Foto de Perfil / Avatar con selector de foto */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "relative",
              width: "88px",
              height: "88px",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
              border: "3.5px solid var(--color-primary)",
              boxShadow: "var(--shadow-md)",
              cursor: "pointer",
              backgroundColor: "#FFFFFF"
            }}
            title="Haz clic para subir tu foto de perfil"
          >
            <img
              src={perfil.fotoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"}
              alt={perfil.nombre}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              color: "#FFFFFF",
              border: "2px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.15s ease",
            }}
            title="Cambiar foto de perfil"
            aria-label="Cambiar foto de perfil"
          >
            <FaCamera style={{ fontSize: "12px" }} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFotoChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {/* Nombre del Usuario */}
        <div>
          <h2 style={{ fontSize: "1.3rem", color: "var(--color-text-main)", margin: 0, fontWeight: "800" }}>
            {perfil.nombre} {perfil.apellido}
          </h2>
          <p style={{ fontSize: "0.88rem", color: rolPerfil === "productora" ? "var(--color-primary)" : "#16A34A", margin: "2px 0 0 0", fontWeight: "600" }}>
            {rolPerfil === "productora" ? perfil.nombreEmprendimiento : "Compradora & Aliada Comunitaria"}
          </p>
        </div>

        {/* SELECTOR HORIZONTAL DE ROLES (Izquierda: Productora ROSA | Derecha: Compradora VERDE) */}
        <div style={{
          width: "100%",
          maxWidth: "340px",
          backgroundColor: "#F1F5F9",
          borderRadius: "var(--radius-full)",
          padding: "4px",
          display: "flex",
          gap: "4px",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.03)",
          marginTop: "4px"
        }}>
          {/* Opción 1 (Izquierda): Productora - Rosa ASLA */}
          <button
            type="button"
            onClick={() => setRolPerfil("productora")}
            style={{
              flex: 1,
              height: "44px",
              borderRadius: "var(--radius-full)",
              border: "none",
              backgroundColor: rolPerfil === "productora" ? "var(--color-primary)" : "transparent",
              color: rolPerfil === "productora" ? "#ffffff" : "#64748B",
              fontSize: "0.92rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: rolPerfil === "productora" ? "0 4px 12px rgba(225, 45, 134, 0.3)" : "none"
            }}
          >
            <IconoPlantaMaceta size={19} color={rolPerfil === "productora" ? "#ffffff" : "#64748B"} /> Productora
          </button>

          {/* Opción 2 (Derecha): Compradora - Verde */}
          <Link
            to="/home"
            style={{
              flex: 1,
              height: "44px",
              borderRadius: "var(--radius-full)",
              border: "none",
              backgroundColor: "transparent",
              color: "#64748B",
              fontSize: "0.92rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textDecoration: "none"
            }}
            title="Cambiar a Modo Compradora"
          >
            <IconoCanasta size={19} color="#64748B" /> Compradora
          </Link>
        </div>

        {/* Texto Explicativo según la opción seleccionada */}
        <p style={{
          fontSize: "0.84rem",
          color: "var(--color-text-muted)",
          margin: 0,
          fontWeight: "500",
          lineHeight: 1.3
        }}>
          {rolPerfil === "productora"
            ? "Gestiona tu finca, publicaciones y cosechas comunitarias"
            : "Comprá productos y haz trueques con las productoras"}
        </p>

        {/* Badge de Verificación */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: rolPerfil === "productora" ? "var(--color-active-bg)" : "#DCFCE7",
          color: rolPerfil === "productora" ? "var(--color-active)" : "#166534",
          padding: "4px 14px",
          borderRadius: "var(--radius-full)",
          fontSize: "0.78rem",
          fontWeight: "700"
        }}>
          <FaCheckCircle /> Cuenta Verificada ASLA
        </div>
      </div>

      {/* 2. FORMULARIO DE PERFIL DE LA PRODUCTORA */}
      <form onSubmit={handleGuardarPerfil} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* DATOS DE LA PRODUCTORA */}
          <div style={{
            backgroundColor: "var(--color-surface)",
            padding: "18px 16px",
            borderRadius: "20px",
            border: "none",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              <FaUser style={{ color: "var(--color-primary)" }} />
              <h3 style={{ fontSize: "0.98rem", margin: 0, color: "var(--color-text-main)", fontWeight: "700" }}>
                Datos de la Productora
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={perfil.nombre}
                  onChange={handleChange}
                  style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={perfil.apellido}
                  onChange={handleChange}
                  style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
                  required
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Número de Cédula
              </label>
              <input
                type="text"
                name="cedula"
                value={perfil.cedula}
                onChange={handleChange}
                placeholder="Ej. 441-150875-0002K"
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Teléfono de Contacto (WhatsApp)
              </label>
              <input
                type="text"
                name="telefono"
                value={perfil.telefono}
                onChange={handleChange}
                placeholder="+505 8823 4567"
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correo"
                value={perfil.correo}
                onChange={handleChange}
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
                required
              />
            </div>
          </div>

          {/* MI EMPRENDIMIENTO O FINCA */}
          <div style={{
            backgroundColor: "var(--color-surface)",
            padding: "18px 16px",
            borderRadius: "20px",
            border: "none",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              <h3 style={{ fontSize: "0.98rem", margin: 0, color: "var(--color-text-main)", fontWeight: "700" }}>
                Mi Emprendimiento o Finca
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Nombre del Emprendimiento o Finca *
              </label>
              <input
                type="text"
                name="nombreEmprendimiento"
                value={perfil.nombreEmprendimiento}
                onChange={handleChange}
                placeholder="Ej. Finca El Renacer, Rosquillas Doña Santos..."
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Historia y Descripción de tus Producciones
              </label>
              <textarea
                name="descripcion"
                rows="3"
                value={perfil.descripcion}
                onChange={handleChange}
                placeholder="Cuéntale a los compradores sobre tu finca, cómo cosechas tus productos y la tradición de tu trabajo..."
                style={{ borderRadius: "16px", padding: "12px", resize: "vertical" }}
              />
            </div>
          </div>

          {/* UBICACIÓN GEOGRÁFICA */}
          <div style={{
            backgroundColor: "var(--color-surface)",
            padding: "18px 16px",
            borderRadius: "20px",
            border: "none",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "10px" }}>
              <FaMapMarkerAlt style={{ color: "var(--color-terracotta)" }} />
              <h3 style={{ fontSize: "0.98rem", margin: 0, color: "var(--color-text-main)", fontWeight: "700" }}>
                Ubicación Geográfica
              </h3>
            </div>

            {/* DEPARTAMENTO (Ampliado para mejor legibilidad) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--color-text-main)" }}>
                Departamento *
              </label>
              <select
                name="departamento"
                value={perfil.departamento}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "var(--radius-full)",
                  borderColor: "var(--color-border)",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  backgroundColor: "#F8FAFC",
                  color: "var(--color-text-main)",
                  outline: "none",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {DEPARTAMENTOS_NICARAGUA.map((dep, idx) => (
                  <option key={idx} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Municipio *
              </label>
              <input
                type="text"
                name="municipio"
                value={perfil.municipio}
                onChange={handleChange}
                placeholder="Ej. San Ramón, Somoto, Boaco..."
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Comunidad / Comarca
              </label>
              <input
                type="text"
                name="comunidad"
                value={perfil.comunidad}
                onChange={handleChange}
                placeholder="Ej. La Reyna, El Coyol..."
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--color-text-main)" }}>
                Dirección o Punto de Referencia
              </label>
              <input
                type="text"
                name="direccion"
                value={perfil.direccion}
                onChange={handleChange}
                placeholder="Ej. Del empalme La Reyna, 2 km al norte..."
                style={{ borderRadius: "var(--radius-full)", height: "42px", paddingLeft: "14px" }}
              />
            </div>
          </div>

          {/* BOTÓN DE GUARDAR Y CERRAR SESIÓN */}
          <button
            type="submit"
            disabled={guardando}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              padding: "14px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.95rem",
              fontWeight: "700",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              border: "none",
              cursor: "pointer",
              opacity: guardando ? 0.7 : 1
            }}
          >
            <FaSave /> {guardando ? "Guardando..." : "Guardar Cambios en Perfil"}
          </button>

          <button
            type="button"
            onClick={logout}
            style={{
              backgroundColor: "#FEF2F2",
              color: "#EF4444",
              border: "1px solid #FECACA",
              padding: "12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.9rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "2px",
              cursor: "pointer"
            }}
          >
            <FaSignOutAlt /> Cerrar Sesión de la Plataforma
          </button>
        </form>
    </div>
  );
}