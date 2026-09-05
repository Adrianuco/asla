import api from "./api";
import { CATEGORIAS } from "../data/mockData";

export const categoriaService = {
  async getCategorias() {
    try {
      const data = await api.get("/categoria");
      if (Array.isArray(data) && data.length > 0) {
        return data.map(c => ({
          ...c,
          idCategoria: c.categoriaId ?? c.idCategoria,
          categoriaId: c.categoriaId ?? c.idCategoria
        }));
      }
      return CATEGORIAS;
    } catch (error) {
      console.warn("No se pudo conectar con el backend para categorías, usando datos locales:", error.message);
      return CATEGORIAS;
    }
  }
};

export default categoriaService;
