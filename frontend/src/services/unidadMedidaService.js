import api from "./api";

export async function getUnidadesMedida() {
  try {
    const data = await api.get("/unidadmedida");
    if (Array.isArray(data) && data.length > 0) {
      return data.map((u) => ({
        idUnidadMedida: u.unidadMedidaId ?? u.idUnidadMedida,
        nombre: u.nombre,
        estado: u.estado ?? true,
      }));
    }
  } catch (err) {
    console.warn("Error al obtener unidades de medida de la API:", err.message);
  }
  return [];
}

export default {
  getUnidadesMedida,
};
