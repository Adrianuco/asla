import { createContext, useContext, useState } from "react";
import { obtenerPerfil } from "../data/mockData";
import { productoraService } from "../services/productoraService";

const AuthContext = createContext();

const AUTH_STORAGE_KEY = "asla_auth_productora";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem(AUTH_STORAGE_KEY);
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [cargando, setCargando] = useState(false);

  const login = async (identificador, contrasena) => {
    setCargando(true);
    let perfilActual = obtenerPerfil();
    try {
      const perfilRemoto = await productoraService.getPerfilCompleto(1);
      if (perfilRemoto) perfilActual = perfilRemoto;
    } catch {
      // Fallback local
    }

    const identLimpio = identificador.trim().toLowerCase();
    const coincideCorreo = perfilActual.correo?.toLowerCase() === identLimpio;
    const coincideCedula = perfilActual.cedula?.toLowerCase() === identLimpio;

    if ((coincideCorreo || coincideCedula || identLimpio === "productora" || identLimpio.includes("santos")) && contrasena) {
      const sesion = {
        idUsuario: perfilActual.idUsuario,
        idProductora: perfilActual.idProductora,
        nombre: perfilActual.nombre,
        apellido: perfilActual.apellido,
        nombreEmprendimiento: perfilActual.nombreEmprendimiento,
        correo: perfilActual.correo,
        cedula: perfilActual.cedula,
        fotoUrl: perfilActual.fotoUrl
      };
      setUsuario(sesion);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sesion));
      setCargando(false);
      return { exito: true, usuario: sesion };
    } else {
      setCargando(false);
      throw new Error("Cédula/Correo o contraseña incorrectos. Verifica tus datos o usa el acceso Demo.");
    }
  };

  const loginDemo = async () => {
    let perfilActual = obtenerPerfil();
    try {
      const perfilRemoto = await productoraService.getPerfilCompleto(1);
      if (perfilRemoto) perfilActual = perfilRemoto;
    } catch {
      // Fallback local
    }

    const sesion = {
      idUsuario: perfilActual.idUsuario,
      idProductora: perfilActual.idProductora,
      nombre: perfilActual.nombre,
      apellido: perfilActual.apellido,
      nombreEmprendimiento: perfilActual.nombreEmprendimiento,
      correo: perfilActual.correo,
      cedula: perfilActual.cedula,
      fotoUrl: perfilActual.fotoUrl
    };
    setUsuario(sesion);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sesion));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario,
        cargando,
        login,
        loginDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
}