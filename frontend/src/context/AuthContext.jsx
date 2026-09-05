import { createContext, useContext, useState } from "react";
import { obtenerPerfil } from "../data/mockData";

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

  const login = (identificador, contrasena) => {
    setCargando(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const perfilActual = obtenerPerfil();
        const identLimpio = identificador.trim().toLowerCase();

        const coincideCorreo = perfilActual.correo.toLowerCase() === identLimpio;
        const coincideCedula = perfilActual.cedula.toLowerCase() === identLimpio;

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
          resolve({ exito: true, usuario: sesion });
        } else {
          setCargando(false);
          reject(new Error("Cédula/Correo o contraseña incorrectos. Verifica tus datos."));
        }
      }, 400);
    });
  };

  const iniciarSesionRegistro = (datos) => {
    const perfilActual = obtenerPerfil();
    const sesion = {
      idUsuario: perfilActual.idUsuario,
      idProductora: perfilActual.idProductora,
      nombre: datos?.nombre || perfilActual.nombre,
      apellido: datos?.apellido || perfilActual.apellido,
      nombreEmprendimiento: datos?.nombreEmprendimiento || perfilActual.nombreEmprendimiento,
      correo: datos?.correo || perfilActual.correo,
      cedula: datos?.cedula || perfilActual.cedula,
      fotoUrl: perfilActual.fotoUrl
    };
    setUsuario(sesion);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sesion));
    return sesion;
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
        iniciarSesionRegistro,
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