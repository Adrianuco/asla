import { createContext, useContext, useState } from "react";
import { login as loginService } from "../services/usuarioService";

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
    try {
      const sesion = await loginService(identificador, contrasena);
      setUsuario(sesion);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sesion));
      setCargando(false);
      return { exito: true, usuario: sesion };
    } catch (err) {
      setCargando(false);
      throw err;
    }
  };

  const iniciarSesionRegistro = (datos) => {
    const sesion = {
      idUsuario: datos?.idUsuario || datos?.usuarioId || 1,
      idProductora: datos?.idProductora || datos?.productoraId || null,
      nombre: datos?.nombre || "Usuario",
      apellido: datos?.apellido || "",
      nombreEmprendimiento: datos?.nombreEmprendimiento || "",
      correo: datos?.correo || "",
      cedula: datos?.cedula || "",
      fotoUrl: datos?.fotoUrl || datos?.imagenUrl || "",
      esProductora: datos?.esProductora !== undefined ? datos.esProductora : true,
    };
    setUsuario(sesion);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sesion));
    return sesion;
  };

  const actualizarUsuarioSesion = (datosNuevos) => {
    setUsuario((prev) => {
      const actualizado = {
        ...prev,
        ...datosNuevos,
      };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(actualizado));
      } catch (err) {
        console.error(err);
      }
      return actualizado;
    });
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
        actualizarUsuarioSesion,
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