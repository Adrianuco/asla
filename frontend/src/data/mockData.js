

// 1. CATEGORIAS (según tabla CATEGORIA)
export const CATEGORIAS = [
  { idCategoria: 1, nombre: "Café y Cacao", descripcion: "Café de altura y cacao criollo artesanal", estado: true },
  { idCategoria: 2, nombre: "Miel y Apicultura", descripcion: "Miel pura y derivados apícolas", estado: true },
  { idCategoria: 3, nombre: "Granos y Hortalizas", descripcion: "Frijoles, maíz, verduras y frutas de temporada", estado: true },
  { idCategoria: 4, nombre: "Lácteos y Derivados", descripcion: "Queso artesanal, cuajada y crema", estado: true },
  { idCategoria: 5, nombre: "Artesanías y Textiles", descripcion: "Tejidos en pita, barro y madera", estado: true },
  { idCategoria: 6, nombre: "Dulces y Tradición", descripcion: "Rosquillas, cajetas y panes tradicionales", estado: true }
];

// 2. UNIDADES DE MEDIDA (según tabla UnidadMedida)
export const UNIDADES_MEDIDA = [
  { idUnidadMedida: 1, nombre: "Libra (lb)", estado: true },
  { idUnidadMedida: 2, nombre: "Litro (L)", estado: true },
  { idUnidadMedida: 3, nombre: "Frasco", estado: true },
  { idUnidadMedida: 4, nombre: "Docena", estado: true },
  { idUnidadMedida: 5, nombre: "Unidad / Pieza", estado: true },
  { idUnidadMedida: 6, nombre: "Quintal (qq)", estado: true },
  { idUnidadMedida: 7, nombre: "Canasto / Bolsa", estado: true }
];

// 3. DATOS DE LA PRODUCTORA (según tablas USUARIO + PRODUCTORA + UBICACION)
export const PRODUCTORA_DEFECTO = {
  idUsuario: 1,
  idProductora: 1,
  idUbicacion: 1,
  nombre: "Santos",
  apellido: "Jarquín Blandón",
  cedula: "441-150875-0002K",
  correo: "santos.jarquin@asla.ni",
  telefono: "+505 8823 4567",
  genero: "Femenino",
  nombreEmprendimiento: "Finca El Renacer & Café de Altura",
  descripcion: "Mujer productora rural de Matagalpa. Cultivamos café orgánico de sombra y producimos miel silvestre, conservando saberes ancestrales y promoviendo el trueque comunitario.",
  estadoVerificacion: "Verificada",
  fechaRegistro: "2026-01-15T08:30:00",
  // Ubicación
  departamento: "Matagalpa",
  municipio: "San Ramón",
  comunidad: "La Reyna",
  direccion: "Del empalme La Reyna, 2 km al norte, Finca El Renacer",
  fotoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
};

// 4. PRODUCTOS INICIALES DE PRUEBA (según tabla PRODUCTO)
export const PRODUCTOS_INICIALES = [
  {
    idProducto: 1,
    idProductora: 1,
    idCategoria: 1,
    idUnidadMedida: 1,
    nombre: "Café Orgánico de Altura (Molido)",
    descripcion: "Café 100% arábica cultivado bajo sombra en las montañas de San Ramón. Tueste medio con aroma floral y notas achocolatadas.",
    precio: 160.00,
    permiteVenta: true,
    permiteTrueque: true,
    estado: 1, // 1: Activo, 0: Inactivo
    fechaPublicacion: "2026-08-10T10:00:00",
    imagenUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80"
  },
  {
    idProducto: 2,
    idProductora: 1,
    idCategoria: 2,
    idUnidadMedida: 3,
    nombre: "Miel Pura de Abeja Silvestre",
    descripcion: "Miel cruda de floración de montaña, cosechada sin pesticidas ni aditivos. Frasco de vidrio sellado.",
    precio: 220.00,
    permiteVenta: true,
    permiteTrueque: false,
    estado: 1,
    fechaPublicacion: "2026-08-12T14:30:00",
    imagenUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80"
  },
  {
    idProducto: 3,
    idProductora: 1,
    idCategoria: 6,
    idUnidadMedida: 4,
    nombre: "Rosquillas Somoteñas Tradicionales",
    descripcion: "Elaboradas a mano en horno de barro con maíz criollo y queso chontaleño. Bolsita de 12 unidades crujientes.",
    precio: 90.00,
    permiteVenta: true,
    permiteTrueque: true,
    estado: 1,
    fechaPublicacion: "2026-08-15T09:15:00",
    imagenUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80"
  },
  {
    idProducto: 4,
    idProductora: 1,
    idCategoria: 1,
    idUnidadMedida: 1,
    nombre: "Cacao Criollo en Grano Fermentado",
    descripcion: "Grano de cacao seleccionado listo para tostar. Ideal para elaborar chocolate artesanal o pinolillo.",
    precio: 0,
    permiteVenta: false,
    permiteTrueque: true, // Modalidad Trueque puro
    estado: 1,
    fechaPublicacion: "2026-08-18T16:00:00",
    imagenUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80"
  },
  {
    idProducto: 5,
    idProductora: 1,
    idCategoria: 4,
    idUnidadMedida: 1,
    nombre: "Cuajada Fresca de Campo",
    descripcion: "Elaborada con leche fresca de ordeño matutino con bajo contenido de sal.",
    precio: 95.00,
    permiteVenta: true,
    permiteTrueque: false,
    estado: 0, // Inactivo (pausado temporalmente)
    fechaPublicacion: "2026-08-19T08:00:00",
    imagenUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80"
  },
  {
    idProducto: 6,
    idProductora: 1,
    idCategoria: 5,
    idUnidadMedida: 5,
    nombre: "Canasto de Fibra de Pita Tejido a Mano",
    descripcion: "Canasto tradicional multiusos tejido con fibras naturales por artesanas comunitarias.",
    precio: 180.00,
    permiteVenta: true,
    permiteTrueque: true,
    estado: 1,
    fechaPublicacion: "2026-08-20T11:45:00",
    imagenUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&auto=format&fit=crop&q=80"
  }
];

const STORAGE_KEY_PRODUCTOS = "asla_productora_productos";
const STORAGE_KEY_PERFIL = "asla_productora_perfil";

// Obtener la lista actual de productos
export function obtenerProductos() {
  const guardados = localStorage.getItem(STORAGE_KEY_PRODUCTOS);
  if (!guardados) {
    localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
    return PRODUCTOS_INICIALES;
  }
  try {
    return JSON.parse(guardados);
  } catch (error) {
    console.error("Error al leer productos de localStorage:", error);
    return PRODUCTOS_INICIALES;
  }
}

// Guardar un nuevo producto
export function crearProducto(nuevoProducto) {
  const productos = obtenerProductos();
  const productoConId = {
    ...nuevoProducto,
    idProducto: Date.now(), // ID único basado en milisegundos
    idProductora: 1,
    fechaPublicacion: new Date().toISOString()
  };
  const listaActualizada = [productoConId, ...productos];
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(listaActualizada));
  return productoConId;
}

// Actualizar un producto existente
export function actualizarProducto(idProducto, datosActualizados) {
  const productos = obtenerProductos();
  const listaActualizada = productos.map(p => {
    if (p.idProducto === Number(idProducto)) {
      return { ...p, ...datosActualizados };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(listaActualizada));
  return listaActualizada.find(p => p.idProducto === Number(idProducto));
}

// Cambiar estado de un producto (Activo <-> Inactivo)
export function cambiarEstadoProducto(idProducto) {
  const productos = obtenerProductos();
  const listaActualizada = productos.map(p => {
    if (p.idProducto === Number(idProducto)) {
      return { ...p, estado: p.estado === 1 ? 0 : 1 };
    }
    return p;
  });
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(listaActualizada));
  return listaActualizada;
}

// Eliminar un producto
export function eliminarProducto(idProducto) {
  const productos = obtenerProductos();
  const listaActualizada = productos.filter(p => p.idProducto !== Number(idProducto));
  localStorage.setItem(STORAGE_KEY_PRODUCTOS, JSON.stringify(listaActualizada));
  return listaActualizada;
}

// Obtener perfil de la productora
export function obtenerPerfil() {
  const guardado = localStorage.getItem(STORAGE_KEY_PERFIL);
  if (!guardado) {
    localStorage.setItem(STORAGE_KEY_PERFIL, JSON.stringify(PRODUCTORA_DEFECTO));
    return PRODUCTORA_DEFECTO;
  }
  try {
    return JSON.parse(guardado);
  } catch (error) {
    console.error("Error al leer perfil de localStorage:", error);
    return PRODUCTORA_DEFECTO;
  }
}

// Guardar cambios en el perfil
export function actualizarPerfil(nuevosDatos) {
  const perfilActual = obtenerPerfil();
  const perfilActualizado = { ...perfilActual, ...nuevosDatos };
  localStorage.setItem(STORAGE_KEY_PERFIL, JSON.stringify(perfilActualizado));
  return perfilActualizado;
}
