import api from "./api";
import { UNIDADES_MEDIDA } from "../data/mockData";

export const unidadMedidaService = {
  async getUnidadesMedida() {
    try {
      const data = await api.get("/unidadmedida");
      if (Array.isArray(data) && data.length > 0) {
        return data.map(u => ({
          ...u,
          idUnidadMedida: u.unidadMedidaId ?? u.idUnidadMedida,
          unidadMedidaId: u.unidadMedidaId ?? u.idUnidadMedida
        }));
      }
      return UNIDADES_MEDIDA;
    } catch (error) {
      console.warn("No se pudo conectar con el backend para unidades de medida, usando datos locales:", error.message);
      return UNIDADES_MEDIDA;
    }
  }
};

export default unidadMedidaService;
