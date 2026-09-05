import api from "./api";
import {
  obtenerProductos,
  crearProducto as crearProductoLocal,
  actualizarProducto as actualizarProductoLocal,
  eliminarProducto as eliminarProductoLocal
} from "../data/mockData";

function normalizarProducto(p) {
  if (!p) return null;
  const id = p.productoId ?? p.idProducto;
  const estadoNum = (p.estado === true || p.estado === 1) ? 1 : 0;

  return {
    ...p,
    idProducto: id,
    productoId: id,
    idCategoria: p.categoriaId ?? p.idCategoria ?? 1,
    categoriaId: p.categoriaId ?? p.idCategoria ?? 1,
    idUnidadMedida: p.unidadMedidaId ?? p.idUnidadMedida ?? 1,
    unidadMedidaId: p.unidadMedidaId ?? p.idUnidadMedida ?? 1,
    idProductora: p.productoraId ?? p.idProductora ?? 1,
    productoraId: p.productoraId ?? p.idProductora ?? 1,
    estado: estadoNum,
    estadoBool: estadoNum === 1,
    precio: Number(p.precio ?? 0),
    permiteVenta: Boolean(p.permiteVenta),
    permiteTrueque: Boolean(p.permiteTrueque),
    nombre: p.nombre || "",
    descripcion: p.descripcion || "",
    imagenUrl: p.imagenUrl || "",
    fechaPublicacion: p.fechaPublicacion || new Date().toISOString()
  };
}

export const productoService = {
  async getProductos({ busqueda = "", productoraId = null, categoriaId = null, soloActivos = null } = {}) {
    const params = new URLSearchParams();
    if (busqueda) params.append("busqueda", busqueda);
    if (productoraId) params.append("productoraId", productoraId);
    if (categoriaId) params.append("categoriaId", categoriaId);
    if (soloActivos !== null && soloActivos !== undefined) params.append("soloActivos", soloActivos);

    const queryString = params.toString() ? `?${params.toString()}` : "";

    try {
      const data = await api.get(`/producto${queryString}`);
      if (Array.isArray(data)) {
        return data.map(normalizarProducto);
      }
      return obtenerProductos().map(normalizarProducto);
    } catch (error) {
      console.warn("Error obteniendo productos del backend, usando almacenamiento local:", error.message);
      return obtenerProductos().map(normalizarProducto);
    }
  },

  async getProductoById(id) {
    try {
      const data = await api.get(`/producto/${id}`);
      return normalizarProducto(data);
    } catch (error) {
      console.warn(`Error al obtener producto ${id} del backend:`, error.message);
      const local = obtenerProductos().find(p => p.idProducto === Number(id));
      return normalizarProducto(local);
    }
  },

  async createProducto(datosProducto) {
    const payload = {
      nombre: datosProducto.nombre,
      descripcion: datosProducto.descripcion,
      precio: Number(datosProducto.precio || 0),
      permiteVenta: Boolean(datosProducto.permiteVenta),
      permiteTrueque: Boolean(datosProducto.permiteTrueque),
      categoriaId: Number(datosProducto.idCategoria ?? datosProducto.categoriaId ?? 1),
      unidadMedidaId: Number(datosProducto.idUnidadMedida ?? datosProducto.unidadMedidaId ?? 1),
      productoraId: Number(datosProducto.idProductora ?? datosProducto.productoraId ?? 1),
      imagenUrl: datosProducto.imagenUrl || ""
    };

    try {
      const nuevo = await api.post("/producto", payload);
      const normalizado = normalizarProducto(nuevo);
      // Guardar también copia local de respaldo
      crearProductoLocal(normalizado);
      return normalizado;
    } catch (error) {
      console.warn("Error creando producto en backend, guardando localmente:", error.message);
      const localCreado = crearProductoLocal(datosProducto);
      return normalizarProducto(localCreado);
    }
  },

  async updateProducto(id, datosActualizados) {
    const estadoBool = datosActualizados.estado === 1 || datosActualizados.estado === true;
    const payload = {
      nombre: datosActualizados.nombre,
      descripcion: datosActualizados.descripcion,
      precio: Number(datosActualizados.precio || 0),
      permiteVenta: Boolean(datosActualizados.permiteVenta),
      permiteTrueque: Boolean(datosActualizados.permiteTrueque),
      categoriaId: Number(datosActualizados.idCategoria ?? datosActualizados.categoriaId ?? 1),
      unidadMedidaId: Number(datosActualizados.idUnidadMedida ?? datosActualizados.unidadMedidaId ?? 1),
      estado: estadoBool,
      imagenUrl: datosActualizados.imagenUrl || ""
    };

    try {
      await api.put(`/producto/${id}`, payload);
      actualizarProductoLocal(id, { ...datosActualizados, estado: estadoBool ? 1 : 0 });
      return { ...datosActualizados, idProducto: Number(id), estado: estadoBool ? 1 : 0 };
    } catch (error) {
      console.warn(`Error actualizando producto ${id} en backend:`, error.message);
      return actualizarProductoLocal(id, datosActualizados);
    }
  },

  async deleteProducto(id) {
    try {
      await api.delete(`/producto/${id}`);
      eliminarProductoLocal(id);
      return true;
    } catch (error) {
      console.warn(`Error eliminando producto ${id} en backend:`, error.message);
      eliminarProductoLocal(id);
      return true;
    }
  }
};

export default productoService;
