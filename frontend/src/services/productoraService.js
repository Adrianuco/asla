import api from "./api";
import { obtenerPerfil as obtenerPerfilLocal, actualizarPerfil as actualizarPerfilLocal } from "../data/mockData";

export const productoraService = {
  async getProductora(id = 1) {
    try {
      const data = await api.get(`/productora/${id}`);
      return data;
    } catch (error) {
      console.warn(`Error al consultar productora ${id} en backend:`, error.message);
      return null;
    }
  },

  async getPerfilCompleto(id = 1) {
    try {
      // Primero intentamos consultar los detalles de la productora
      const productora = await api.get(`/productora/${id}`);
      if (productora) {
        const perfilActual = obtenerPerfilLocal();
        return {
          ...perfilActual,
          idProductora: productora.productoraId,
          idUsuario: productora.usuarioId || perfilActual.idUsuario,
          nombre: productora.nombre ? productora.nombre.split(" ")[0] : perfilActual.nombre,
          apellido: productora.nombre && productora.nombre.split(" ").length > 1
            ? productora.nombre.split(" ").slice(1).join(" ")
            : perfilActual.apellido,
          nombreEmprendimiento: productora.nombreEmprendimiento || perfilActual.nombreEmprendimiento,
          descripcion: productora.descripcion || perfilActual.descripcion,
          departamento: productora.departamento || perfilActual.departamento,
          municipio: productora.municipio || perfilActual.municipio,
          direccion: productora.ubicacion || perfilActual.direccion,
          fotoUrl: productora.imagenUrl || perfilActual.fotoUrl,
          telefono: productora.telefonoWhatsapp || perfilActual.telefono,
          estadoVerificacion: productora.estadoVerificacion || perfilActual.estadoVerificacion
        };
      }
    } catch (err) {
      console.warn("Backend no disponible para perfil, usando almacenamiento local:", err.message);
    }
    return obtenerPerfilLocal();
  },

  async actualizarPerfil(idProductora = 1, nuevosDatos) {
    try {
      // 1. Si tenemos datos de usuario, actualizamos perfil de usuario
      if (nuevosDatos.idUsuario) {
        await api.put(`/usuario/${nuevosDatos.idUsuario}/perfil`, {
          nombre: nuevosDatos.nombre || "",
          apellido: nuevosDatos.apellido || "",
          telefono: nuevosDatos.telefono || "",
          genero: nuevosDatos.genero || "Femenino",
          imagenUrl: nuevosDatos.fotoUrl || null
        }).catch(() => {});
      }

      // 2. Actualizamos datos de la productora
      await api.put(`/productora/${idProductora}`, {
        ubicacionId: nuevosDatos.idUbicacion || 1,
        nombreEmprendimiento: nuevosDatos.nombreEmprendimiento || "",
        descripcion: nuevosDatos.descripcion || "",
        imagenUrl: nuevosDatos.fotoUrl || null,
        estado: true,
        etiquetaIds: [1, 2]
      }).catch(() => {});

    } catch (err) {
      console.warn("Error enviando actualización de perfil a backend:", err.message);
    }

    // Siempre sincronizamos con almacenamiento local para garantizar persistencia inmediata
    return actualizarPerfilLocal(nuevosDatos);
  }
};

export default productoraService;
