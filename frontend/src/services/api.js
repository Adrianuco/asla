// Cliente API centralizado para la plataforma ASLA
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5083/api";

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMsg = (isJson && data?.message) || response.statusText || "Error en la petición";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || "GET"} ${url}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: "PUT", body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" })
};

export default api;
