import api from "./api";

export async function getCategorias() {
  try {
    const data = await api.get("/categoria");
    if (Array.isArray(data) && data.length > 0) {
      return data.map((c) => ({
        idCategoria: c.categoriaId ?? c.idCategoria,
        nombre: c.nombre,
        descripcion: c.descripcion,
        estado: c.estado ?? true,
      }));
    }
  } catch (err) {
    console.warn("Error al obtener categorías de la API:", err.message);
  }
  return [];
}

export default {
  getCategorias,
};
