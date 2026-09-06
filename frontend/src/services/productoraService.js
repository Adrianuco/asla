import api from "./api";

export function normalizarProductoraDesdeBackend(p) {
  if (!p) return null;

  const productsList = Array.isArray(p.productos) && p.productos.length > 0
    ? p.productos.map((prod) => ({
        id: prod.productoId,
        title: prod.nombre,
        price: prod.precio,
        unit: prod.unidadMedidaNombre || "Unidad",
        location: p.municipio || "San Ramón",
        producer: p.nombre,
        image: prod.imagenUrl,
        allowsTrueque: Boolean(prod.permiteTrueque),
        description: prod.descripcion,
      }))
    : Array.isArray(p.productosPreview) && p.productosPreview.length > 0
    ? p.productosPreview.map((prod) => ({
        id: prod.productoId,
        title: prod.nombre,
        price: 25,
        unit: "Unidad",
        location: p.municipio || "San Ramón",
        producer: p.nombre,
        image: prod.imagenUrl,
        allowsTrueque: true,
        description: prod.nombre,
      }))
    : [];

  const nombreLimpio = p.nombre || p.nombreEmprendimiento || "Productora ASLA";
  const nombrePartes = (p.nombre || "").trim().split(" ");
  const nombre = nombrePartes[0] || p.nombreEmprendimiento || "Productora";
  const apellido = nombrePartes.slice(1).join(" ") || "";
  const ubicacion = p.ubicacion || (p.municipio && p.departamento ? `${p.municipio}, ${p.departamento}` : p.municipio || p.departamento || "Nicaragua");

  return {
    id: p.productoraId ?? p.id,
    productoraId: p.productoraId ?? p.id,
    usuarioId: p.usuarioId,
    name: nombreLimpio,
    nombre: nombre,
    apellido: apellido,
    nombreEmprendimiento: p.nombreEmprendimiento || nombreLimpio,
    location: p.municipio || ubicacion,
    department: p.departamento ? `${p.departamento}, Nicaragua` : "Nicaragua",
    departamento: p.departamento || "",
    municipio: p.municipio || "",
    rating: (p.valoracion || 5.0).toFixed(1),
    tags: Array.isArray(p.etiquetas) && p.etiquetas.length > 0 ? p.etiquetas : ["Orgánico", "Artesanal"],
    specialty: p.nombreEmprendimiento || p.descripcion || "Cultivo agroecológico y artesanal",
    experience: "Productora Comunitaria",
    avatar: p.imagenUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    coverImage: p.coverImage || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    bio: p.descripcion || `Finca y emprendimiento agroecológico de ${nombreLimpio}.`,
    phone: p.telefonoWhatsapp || p.telefono || "",
    productsCount: p.totalProductos || productsList.length || 0,
    truequesCount: p.totalTrueques ? `+${p.totalTrueques}` : "0",
    productsList,
  };
}

export async function getProductoras(filtros = {}) {
  try {
    const params = new URLSearchParams();
    if (filtros.municipio) params.append("municipio", filtros.municipio);
    if (filtros.busqueda) params.append("busqueda", filtros.busqueda);

    const qs = params.toString() ? `?${params.toString()}` : "";
    const data = await api.get(`/productora${qs}`);

    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizarProductoraDesdeBackend);
    }
  } catch (err) {
    console.error("Error al obtener productoras del backend:", err.message);
  }
  return [];
}

export async function getProductoraById(id) {
  try {
    const data = await api.get(`/productora/${id}`);
    if (data) {
      return normalizarProductoraDesdeBackend(data);
    }
  } catch (err) {
    console.error(`Error al obtener productora ${id} de backend:`, err.message);
  }
  return null;
}

export async function createProductora(datos) {
  const payload = {
    usuarioId: Number(datos.usuarioId || 1),
    ubicacionId: Number(datos.ubicacionId || 1),
    nombreEmprendimiento: datos.nombreEmprendimiento || "Mi Emprendimiento",
    descripcion: datos.descripcion || "",
    imagenUrl: datos.imagenUrl || "",
    etiquetaIds: datos.etiquetaIds || [1],
  };

  try {
    const res = await api.post("/productora", payload);
    return normalizarProductoraDesdeBackend(res);
  } catch (err) {
    console.error("Error al crear productora en backend:", err.message);
    throw err;
  }
}

export async function updateProductora(id, datos) {
  const payload = {
    ubicacionId: Number(datos.ubicacionId || datos.idUbicacion || 1),
    nombreEmprendimiento: datos.nombreEmprendimiento || "",
    descripcion: datos.descripcion || "",
    imagenUrl: datos.imagenUrl || datos.fotoUrl || "",
    estado: true,
    etiquetaIds: datos.etiquetaIds || [1],
  };

  try {
    await api.put(`/productora/${id}`, payload);
    return true;
  } catch (err) {
    console.error(`Error al actualizar productora ${id}:`, err.message);
    throw err;
  }
}

export default {
  getProductoras,
  getProductoraById,
  createProductora,
  updateProductora,
  normalizarProductoraDesdeBackend,
};
