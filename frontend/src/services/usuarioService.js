import api from "./api";

export async function login(identificador, contrasena) {
  try {
    const data = await api.post("/usuario/login", {
      identificador: identificador.trim(),
      contrasena: contrasena.trim(),
    });

    if (data && data.usuarioId) {
      return {
        idUsuario: data.usuarioId,
        idProductora: data.productoraId || (data.esProductora ? 1 : null),
        nombre: data.nombreCompleto?.split(" ")[0] || "Santos",
        apellido: data.nombreCompleto?.split(" ").slice(1).join(" ") || "Jarquín",
        nombreEmprendimiento: data.nombreEmprendimiento || "Finca El Renacer & Café de Altura",
        correo: data.correo,
        cedula: data.cedula || "441-150875-0002K",
        telefono: data.telefono || "+505 8823 4567",
        fotoUrl: data.imagenUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
        ubicacion: data.ubicacion || "San Ramón, Matagalpa",
        esProductora: Boolean(data.esProductora),
        estadoVerificacion: data.estadoVerificacion || "Verificada",
      };
    }
  } catch (err) {
    console.error("Error en login API:", err.message);
    throw new Error(err.message || "Cédula/Correo o contraseña incorrectos. Verifica tus datos.");
  }

  throw new Error("Cédula/Correo o contraseña incorrectos. Verifica tus datos.");
}

export async function registro(datos) {
  try {
    const res = await api.post("/usuario/registro", {
      nombre: datos.nombre,
      apellido: datos.apellido,
      cedula: datos.cedula,
      correo: datos.correo || datos.email,
      contrasena: datos.contrasena || datos.password || "123456",
      telefono: datos.telefono,
      genero: datos.genero || datos.gender || "Femenino",
      rolId: datos.rolId || (datos.role === "productora" ? 1 : 2),
    });

    if (res && res.usuarioId) {
      return {
        idUsuario: res.usuarioId,
        idProductora: res.productoraId,
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo || datos.email,
        cedula: datos.cedula,
        telefono: datos.telefono,
        genero: datos.genero || "Femenino",
        ubicacion: res.ubicacion,
        esProductora: Boolean(res.esProductora),
      };
    }
  } catch (err) {
    console.error("Error en registro backend:", err.message);
    throw err;
  }
}

export async function getPerfil(usuarioId) {
  try {
    const data = await api.get(`/usuario/${usuarioId}/perfil`);
    if (data) {
      return data;
    }
  } catch (err) {
    console.warn(`Error al consultar perfil ${usuarioId}:`, err.message);
  }
  return null;
}

export async function updatePerfil(usuarioId, datos) {
  try {
    await api.put(`/usuario/${usuarioId}/perfil`, {
      nombre: datos.nombre,
      apellido: datos.apellido,
      telefono: datos.telefono,
      genero: datos.genero || "Femenino",
      imagenUrl: datos.fotoUrl || datos.imagenUrl,
    });
    return true;
  } catch (err) {
    console.error(`Error al actualizar perfil ${usuarioId}:`, err.message);
    throw err;
  }
}

export default {
  login,
  registro,
  getPerfil,
  updatePerfil,
};
