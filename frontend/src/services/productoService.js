import api from "./api";

export function normalizarProductoDesdeBackend(p) {
  if (!p) return null;
  return {
    idProducto: p.productoId ?? p.idProducto,
    productoId: p.productoId ?? p.idProducto,
    idProductora: p.productoraId ?? p.idProductora ?? 1,
    idCategoria: p.categoriaId ?? p.idCategoria ?? 1,
    idUnidadMedida: p.unidadMedidaId ?? p.idUnidadMedida ?? 1,
    nombre: p.nombre || "",
    descripcion: p.descripcion || "",
    precio: Number(p.precio) || 0,
    permiteVenta: p.permiteVenta !== undefined ? Boolean(p.permiteVenta) : true,
    permiteTrueque: p.permiteTrueque !== undefined ? Boolean(p.permiteTrueque) : false,
    estado: p.estado === true || p.estado === 1 ? 1 : 0,
    imagenUrl: p.imagenUrl || "",
    fechaPublicacion: p.fechaPublicacion || new Date().toISOString(),
    // Campos legibles
    categoriaNombre: p.categoriaNombre || "",
    unidadMedidaNombre: p.unidadMedidaNombre || "",
    productoraNombre: p.productoraNombre || "",
    productoraUbicacion: p.productoraUbicacion || "",
  };
}

export async function getProductos(filtros = {}) {
  try {
    const params = new URLSearchParams();
    if (filtros.busqueda) params.append("busqueda", filtros.busqueda);
    if (filtros.productoraId) params.append("productoraId", filtros.productoraId);
    if (filtros.categoriaId) params.append("categoriaId", filtros.categoriaId);
    if (filtros.soloActivos !== undefined && filtros.soloActivos !== null) {
      params.append("soloActivos", filtros.soloActivos);
    }

    const qs = params.toString() ? `?${params.toString()}` : "";
    const data = await api.get(`/producto${qs}`);

    if (Array.isArray(data)) {
      return data.map(normalizarProductoDesdeBackend);
    }
  } catch (err) {
    console.error("Error al obtener productos del backend:", err.message);
  }
  return [];
}

export async function getProductoById(id) {
  try {
    const data = await api.get(`/producto/${id}`);
    if (data) {
      return normalizarProductoDesdeBackend(data);
    }
  } catch (err) {
    console.error(`Error al obtener producto ${id} del backend:`, err.message);
  }
  return null;
}

export async function createProducto(datos) {
  const payload = {
    productoraId: datos.idProductora ?? datos.productoraId ?? 1,
    categoriaId: Number(datos.idCategoria ?? datos.categoriaId ?? 1),
    unidadMedidaId: Number(datos.idUnidadMedida ?? datos.unidadMedidaId ?? 1),
    nombre: datos.nombre,
    descripcion: datos.descripcion || "",
    precio: Number(datos.precio) || 0,
    permiteVenta: datos.permiteVenta !== undefined ? Boolean(datos.permiteVenta) : true,
    permiteTrueque: datos.permiteTrueque !== undefined ? Boolean(datos.permiteTrueque) : false,
    imagenUrl: datos.imagenUrl || "",
  };

  try {
    const res = await api.post("/producto", payload);
    return normalizarProductoDesdeBackend(res);
  } catch (err) {
    console.error("Error al crear producto en backend:", err.message);
    throw err;
  }
}

export async function updateProducto(id, datos) {
  const payload = {
    categoriaId: Number(datos.idCategoria ?? datos.categoriaId ?? 1),
    unidadMedidaId: Number(datos.idUnidadMedida ?? datos.unidadMedidaId ?? 1),
    nombre: datos.nombre,
    descripcion: datos.descripcion || "",
    precio: Number(datos.precio) || 0,
    permiteVenta: datos.permiteVenta !== undefined ? Boolean(datos.permiteVenta) : true,
    permiteTrueque: datos.permiteTrueque !== undefined ? Boolean(datos.permiteTrueque) : false,
    estado: datos.estado === 1 || datos.estado === true,
    imagenUrl: datos.imagenUrl || "",
  };

  try {
    await api.put(`/producto/${id}`, payload);
    return { ...datos, idProducto: Number(id) };
  } catch (err) {
    console.error(`Error al actualizar producto ${id} en backend:`, err.message);
    throw err;
  }
}

export async function deleteProducto(id) {
  try {
    await api.delete(`/producto/${id}`);
    return true;
  } catch (err) {
    console.error(`Error al eliminar producto ${id} en backend:`, err.message);
    throw err;
  }
}

export default {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  normalizarProductoDesdeBackend,
};
