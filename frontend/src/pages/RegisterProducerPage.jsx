import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaLeaf,
  FaChevronLeft,
  FaCheckCircle,
  FaStoreAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaIdCard,
  FaPhoneAlt,
  FaSeedling
} from "react-icons/fa";
import aslaLogo from "../assets/asla-logo.svg";

// Departamentos de Nicaragua según base de datos / ubicación
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

export default function RegisterProducerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { iniciarSesionRegistro } = useAuth();

  // Reutilizar los datos provenientes del Registro General (o valores por defecto limpios)
  const datosPrevios = location.state?.datosUsuario || {
    nombre: "Santos",
    apellido: "Jarquín",
    correo: "santos.jarquin@asla.ni",
    cedula: "441-150875-0002K",
    telefono: "+505 8823 4567",
    genero: "Femenino"
  };

  // Estado del formulario combinando datos reutilizados + campos específicos de Productora (BD)
  const [formData, setFormData] = useState({
    // 1. Datos reutilizados del Registro General
    correo: datosPrevios.correo || datosPrevios.email || "",
    cedula: datosPrevios.cedula || "",
    telefono: datosPrevios.telefono || "",

    // 2. Datos específicos de Productora
    nombreEmprendimiento: "",
    departamento: "Matagalpa",
    descripcion: ""
  });

  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formData.correo.trim()) nuevosErrores.correo = "El correo es obligatorio.";
    if (!formData.cedula.trim()) nuevosErrores.cedula = "La cédula es obligatoria.";
    if (!formData.telefono.trim()) nuevosErrores.telefono = "El número telefónico es obligatorio.";
    if (!formData.nombreEmprendimiento.trim()) {
      nuevosErrores.nombreEmprendimiento = "Indica el nombre de tu emprendimiento o finca.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setExito(true);
      if (iniciarSesionRegistro) {
        iniciarSesionRegistro({
          nombre: datosPrevios.nombre,
          apellido: datosPrevios.apellido,
          nombreEmprendimiento: formData.nombreEmprendimiento,
          correo: formData.correo,
          cedula: formData.cedula,
        });
      }
      setTimeout(() => {
        navigate("/productos");
      }, 1500);
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        backgroundColor: "#FDF6F9" // Fondo muy suave en tono rosado cálido
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--color-surface)",
          borderRadius: "28px",
          boxShadow: "0 10px 30px rgba(225, 45, 134, 0.08)",
          padding: "28px 24px 32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          position: "relative"
        }}
      >
        {/* BOTÓN DE REGRESO SUPERIOR IZQUIERDO */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            position: "absolute",
            top: "22px",
            left: "22px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "#FDF2F7",
            border: "1px solid rgba(225, 45, 134, 0.15)",
            color: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          title="Volver"
        >
          <FaChevronLeft style={{ transform: "translateX(-1px)" }} />
        </button>

        {/* ENCABEZADO: Logo ASLA, Marca y Título */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            marginTop: "6px"
          }}
        >
          {/* Logo Oficial ASLA */}
          <img
            src={aslaLogo}
            alt="Logo ASLA"
            style={{
              width: "74px",
              height: "74px",
              objectFit: "contain",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)"
            }}
          />

          {/* Marca Asla en Rosa */}
          <span
            style={{
              fontSize: "1.9rem",
              fontWeight: "900",
              color: "var(--color-primary)",
              letterSpacing: "-0.5px"
            }}
          >
            Asla
          </span>

          {/* Título destacado */}
          <h1
            style={{
              fontSize: "1.55rem",
              fontWeight: "800",
              color: "var(--color-text-main)",
              margin: 0,
              letterSpacing: "-0.3px"
            }}
          >
            ¡Regístrate ya!
          </h1>
        </div>

        {/* Notificación de éxito */}
        {exito && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "var(--color-active-bg)",
              color: "var(--color-active)",
              borderRadius: "14px",
              fontSize: "0.86rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaCheckCircle /> ¡Registro de Productora completado con éxito!
          </div>
        )}

        {/* FORMULARIO DE CAMPOS CON ESTILO IDÉNTICO A LA REFERENCIA */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          
          {/* 1. CORREO ELECTRÓNICO (E-mail) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="correo"
              style={{
                fontSize: "0.84rem",
                fontWeight: "700",
                color: "var(--color-text-main)",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}
            >
              Correo Electrónico (E-mail) <span style={{ color: "var(--color-primary)" }}>*</span>
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  color: "var(--color-primary)",
                  fontSize: "15px",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FaEnvelope />
              </div>
              <input
                id="correo"
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 38px 0 42px",
                  backgroundColor: "#FDF2F7", // Fondo rosa muy claro
                  border: errores.correo
                    ? "1.5px solid var(--color-danger)"
                    : "1.5px solid rgba(225, 45, 134, 0.22)",
                  borderRadius: "14px",
                  fontSize: "0.92rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
              />
              {/* Check verde de dato ya validado en el Registro General */}
              <div
                style={{
                  position: "absolute",
                  right: "14px",
                  color: "var(--color-secondary)",
                  fontSize: "15px",
                  pointerEvents: "none"
                }}
                title="Dato verificado de tu cuenta"
              >
                <FaCheckCircle />
              </div>
            </div>
            {errores.correo && (
              <span style={{ color: "var(--color-danger)", fontSize: "0.75rem", fontWeight: "600" }}>
                {errores.correo}
              </span>
            )}
          </div>

          {/* 2. CÉDULA DE IDENTIDAD */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="cedula"
              style={{
                fontSize: "0.84rem",
                fontWeight: "700",
                color: "var(--color-text-main)",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}
            >
              Cédula de Identidad <span style={{ color: "var(--color-primary)" }}>*</span>
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  color: "var(--color-primary)",
                  fontSize: "15px",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FaIdCard />
              </div>
              <input
                id="cedula"
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="001-000000-0000A"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 38px 0 42px",
                  backgroundColor: "#FDF2F7",
                  border: errores.cedula
                    ? "1.5px solid var(--color-danger)"
                    : "1.5px solid rgba(225, 45, 134, 0.22)",
                  borderRadius: "14px",
                  fontSize: "0.92rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "14px",
                  color: "var(--color-secondary)",
                  fontSize: "15px",
                  pointerEvents: "none"
                }}
                title="Dato verificado de tu cuenta"
              >
                <FaCheckCircle />
              </div>
            </div>
            {errores.cedula && (
              <span style={{ color: "var(--color-danger)", fontSize: "0.75rem", fontWeight: "600" }}>
                {errores.cedula}
              </span>
            )}
          </div>

          {/* 3. NÚMERO DE TELÉFONO */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="telefono"
              style={{
                fontSize: "0.84rem",
                fontWeight: "700",
                color: "var(--color-text-main)",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}
            >
              Número de Teléfono <span style={{ color: "var(--color-primary)" }}>*</span>
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  color: "var(--color-primary)",
                  fontSize: "14px",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FaPhoneAlt />
              </div>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+505 8888 8888"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 38px 0 42px",
                  backgroundColor: "#FDF2F7",
                  border: errores.telefono
                    ? "1.5px solid var(--color-danger)"
                    : "1.5px solid rgba(225, 45, 134, 0.22)",
                  borderRadius: "14px",
                  fontSize: "0.92rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "14px",
                  color: "var(--color-secondary)",
                  fontSize: "15px",
                  pointerEvents: "none"
                }}
                title="Dato verificado de tu cuenta"
              >
                <FaCheckCircle />
              </div>
            </div>
            {errores.telefono && (
              <span style={{ color: "var(--color-danger)", fontSize: "0.75rem", fontWeight: "600" }}>
                {errores.telefono}
              </span>
            )}
          </div>

          {/* 4. NOMBRE DE LA FINCA O EMPRENDIMIENTO (Dato específico de Productora en BD) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="nombreEmprendimiento"
              style={{
                fontSize: "0.84rem",
                fontWeight: "700",
                color: "var(--color-text-main)",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}
            >
              Nombre de la Finca o Emprendimiento <span style={{ color: "var(--color-primary)" }}>*</span>
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  color: "var(--color-primary)",
                  fontSize: "15px",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FaStoreAlt />
              </div>
              <input
                id="nombreEmprendimiento"
                type="text"
                name="nombreEmprendimiento"
                value={formData.nombreEmprendimiento}
                onChange={handleChange}
                placeholder="Ej. Finca El Renacer / Café de Altura"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px 0 42px",
                  backgroundColor: "#FDF2F7",
                  border: errores.nombreEmprendimiento
                    ? "1.5px solid var(--color-danger)"
                    : "1.5px solid rgba(225, 45, 134, 0.22)",
                  borderRadius: "14px",
                  fontSize: "0.92rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  transition: "all 0.2s ease"
                }}
              />
            </div>
            {errores.nombreEmprendimiento && (
              <span style={{ color: "var(--color-danger)", fontSize: "0.75rem", fontWeight: "600" }}>
                {errores.nombreEmprendimiento}
              </span>
            )}
          </div>

          {/* 5. DEPARTAMENTO DE ORIGEN (Dato específico de Ubicación en BD) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="departamento"
              style={{
                fontSize: "0.84rem",
                fontWeight: "700",
                color: "var(--color-text-main)",
                display: "flex",
                alignItems: "center",
                gap: "3px"
              }}
            >
              Departamento de Origen <span style={{ color: "var(--color-primary)" }}>*</span>
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  color: "var(--color-primary)",
                  fontSize: "15px",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FaMapMarkerAlt />
              </div>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 14px 0 42px",
                  backgroundColor: "#FDF2F7",
                  border: "1.5px solid rgba(225, 45, 134, 0.22)",
                  borderRadius: "14px",
                  fontSize: "0.92rem",
                  color: "var(--color-text-main)",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {DEPARTAMENTOS_NICARAGUA.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BOTÓN PRINCIPAL: REGISTRARSE (Grande, Redondeado, Rosa ASLA) */}
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              fontSize: "1.05rem",
              fontWeight: "700",
              borderRadius: "var(--radius-full)",
              border: "none",
              marginTop: "8px",
              boxShadow: "0 6px 20px rgba(225, 45, 134, 0.32)",
              cursor: "pointer",
              opacity: cargando ? 0.75 : 1,
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
          >
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* PIE DE PÁGINA: ¿Ya tienes una cuenta? Inicia sesión */}
        <div
          style={{
            textAlign: "center",
            marginTop: "2px",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)"
          }}
        >
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--color-primary)",
              fontWeight: "700",
              textDecoration: "underline"
            }}
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
