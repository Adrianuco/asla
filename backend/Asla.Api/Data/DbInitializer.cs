using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // 1. ROLES
        if (!await context.Roles.AnyAsync())
        {
            context.Roles.AddRange(
                new Rol { Nombre = "Productora", Descripcion = "Mujer productora rural y artesana" },
                new Rol { Nombre = "Compradora", Descripcion = "Usuaria compradora o aliada comercial" },
                new Rol { Nombre = "Administrador", Descripcion = "Administrador general de la plataforma" }
            );
            await context.SaveChangesAsync();
        }

        var rolProductora = await context.Roles.FirstOrDefaultAsync(r => r.Nombre == "Productora") ?? await context.Roles.FirstAsync();
        var rolCompradora = await context.Roles.FirstOrDefaultAsync(r => r.Nombre == "Compradora") ?? rolProductora;

        // 2. CATEGORÍAS
        var categoriasDeseadas = new List<Categoria>
        {
            new Categoria { Nombre = "Café y Cacao", Descripcion = "Café de altura y cacao criollo artesanal", Estado = true },
            new Categoria { Nombre = "Miel y Apicultura", Descripcion = "Miel pura y derivados apícolas", Estado = true },
            new Categoria { Nombre = "Granos y Hortalizas", Descripcion = "Frijoles, maíz, verduras y hortalizas frescas", Estado = true },
            new Categoria { Nombre = "Lácteos y Derivados", Descripcion = "Queso artesanal, cuajada y crema", Estado = true },
            new Categoria { Nombre = "Artesanías y Textiles", Descripcion = "Tejidos en pita, barro y madera", Estado = true },
            new Categoria { Nombre = "Dulces y Tradición", Descripcion = "Rosquillas, cajetas y panes tradicionales", Estado = true },
            new Categoria { Nombre = "Frutas y Cítricos", Descripcion = "Aguacates, piñas, mangos, papayas y cítricos", Estado = true }
        };

        foreach (var cat in categoriasDeseadas)
        {
            if (!await context.Categorias.AnyAsync(c => c.Nombre == cat.Nombre))
            {
                context.Categorias.Add(cat);
            }
        }
        await context.SaveChangesAsync();

        // 3. UNIDADES DE MEDIDA
        var unidadesDeseadas = new List<UnidadMedida>
        {
            new UnidadMedida { Nombre = "Libra (lb)", Estado = true },
            new UnidadMedida { Nombre = "Litro (L)", Estado = true },
            new UnidadMedida { Nombre = "Frasco", Estado = true },
            new UnidadMedida { Nombre = "Docena", Estado = true },
            new UnidadMedida { Nombre = "Unidad / Pieza", Estado = true },
            new UnidadMedida { Nombre = "Mano (5 unidades)", Estado = true },
            new UnidadMedida { Nombre = "Quintal (qq)", Estado = true },
            new UnidadMedida { Nombre = "Bolsa", Estado = true },
            new UnidadMedida { Nombre = "Botella 500ml", Estado = true },
            new UnidadMedida { Nombre = "Cabeza", Estado = true }
        };

        foreach (var und in unidadesDeseadas)
        {
            if (!await context.UnidadesMedida.AnyAsync(u => u.Nombre == und.Nombre))
            {
                context.UnidadesMedida.Add(und);
            }
        }
        await context.SaveChangesAsync();

        // 4. UBICACIONES
        var ubicacionesDeseadas = new List<Ubicacion>
        {
            new Ubicacion { Departamento = "Matagalpa", Municipio = "San Ramón", Comunidad = "La Reyna", Direccion = "Km 142 Carretera a San Ramón" },
            new Ubicacion { Departamento = "Carazo", Municipio = "Jinotepe", Comunidad = "Centro", Direccion = "Barrio San Antonio" },
            new Ubicacion { Departamento = "Rivas", Municipio = "Rivas", Comunidad = "La Virgen", Direccion = "Km 110 Carretera Panamericana Sur" },
            new Ubicacion { Departamento = "Carazo", Municipio = "Diriamba", Comunidad = "San José", Direccion = "Del reloj 3c al sur" },
            new Ubicacion { Departamento = "Carazo", Municipio = "San Marcos", Comunidad = "Finca San Pedro", Direccion = "Carretera Las Esquinas" },
            new Ubicacion { Departamento = "Granada", Municipio = "Granada", Comunidad = "Faldas del Mombacho", Direccion = "Reserva Volcán Mombacho" },
            new Ubicacion { Departamento = "Granada", Municipio = "Nandaime", Comunidad = "El Jabillo", Direccion = "Entrada a Nandaime" },
            new Ubicacion { Departamento = "Masaya", Municipio = "Masaya", Comunidad = "Monimbó", Direccion = "Costado este de la iglesia" }
        };

        foreach (var ubi in ubicacionesDeseadas)
        {
            if (!await context.Ubicaciones.AnyAsync(u => u.Municipio == ubi.Municipio && u.Departamento == ubi.Departamento))
            {
                context.Ubicaciones.Add(ubi);
            }
        }
        await context.SaveChangesAsync();

        // 5. ETIQUETAS
        var etiquetasDeseadas = new List<string> { "Orgánico", "Artesanal", "Comercio Justo", "Aguacates", "Piñas", "Mangos", "Elotes", "Lechuga", "Cacao", "Frijoles", "Plátanos", "Papaya", "Maíz", "Miel", "Cítricos", "Pitahaya" };
        foreach (var nombreEtiqueta in etiquetasDeseadas)
        {
            if (!await context.Etiquetas.AnyAsync(e => e.Nombre == nombreEtiqueta))
            {
                context.Etiquetas.Add(new Etiqueta { Nombre = nombreEtiqueta });
            }
        }
        await context.SaveChangesAsync();

        // Helper para resolver referencias
        var ubiSanRamon = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "San Ramón") ?? await context.Ubicaciones.FirstAsync();
        var ubiJinotepe = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "Jinotepe") ?? ubiSanRamon;
        var ubiRivas = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "Rivas") ?? ubiSanRamon;
        var ubiDiriamba = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "Diriamba") ?? ubiSanRamon;
        var ubiSanMarcos = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "San Marcos") ?? ubiSanRamon;
        var ubiGranada = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "Granada") ?? ubiSanRamon;
        var ubiNandaime = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "Nandaime") ?? ubiGranada;
        var ubiMasaya = await context.Ubicaciones.FirstOrDefaultAsync(u => u.Municipio == "Masaya") ?? ubiSanRamon;

        var catCafe = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Café")) ?? await context.Categorias.FirstAsync();
        var catMiel = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Miel")) ?? catCafe;
        var catGranos = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Granos")) ?? catCafe;
        var catLacteos = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Lácteos")) ?? catCafe;
        var catArtesanias = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Artesanías")) ?? catCafe;
        var catDulces = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Dulces")) ?? catCafe;
        var catFrutas = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Frutas")) ?? catGranos;

        var uLibra = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Libra")) ?? await context.UnidadesMedida.FirstAsync();
        var uDocena = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Docena")) ?? uLibra;
        var uPieza = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Unidad")) ?? uLibra;
        var uFrasco = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Frasco")) ?? uLibra;
        var uBolsa = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Bolsa")) ?? uLibra;
        var uBotella = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Botella")) ?? uFrasco;
        var uCabeza = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Cabeza")) ?? uPieza;

        // 6. PRODUCTORAS Y SUS PRODUCTOS

        // --- Productora 1: Santos Jarquín Blandón ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "santos.jarquin@asla.ni"))
        {
            var uSantos = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Santos",
                Apellido = "Jarquín Blandón",
                Cedula = "441-150875-0002K",
                Correo = "santos.jarquin@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8823 4567",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow,
                Estado = true
            };
            context.Usuarios.Add(uSantos);
            await context.SaveChangesAsync();

            var pSantos = new Productora
            {
                UsuarioId = uSantos.UsuarioId,
                UbicacionId = ubiSanRamon.UbicacionId,
                NombreEmprendimiento = "Finca El Renacer & Café de Altura",
                Descripcion = "Mujer productora rural de Matagalpa. Cultivamos café orgánico de sombra y producimos miel silvestre, conservando saberes ancestrales y promoviendo el trueque comunitario.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-6),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-5),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
            };
            context.Productoras.Add(pSantos);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pSantos.ProductoraId,
                    CategoriaId = catCafe.CategoriaId,
                    UnidadMedidaId = uLibra.UnidadMedidaId,
                    Nombre = "Café Orgánico de Altura (Molido)",
                    Descripcion = "Café 100% arábica cultivado bajo sombra en las montañas de San Ramón. Tueste medio con aroma floral y notas achocolatadas.",
                    Precio = 160.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-25),
                    ImagenUrl = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80"
                },
                new Producto
                {
                    ProductoraId = pSantos.ProductoraId,
                    CategoriaId = catMiel.CategoriaId,
                    UnidadMedidaId = uFrasco.UnidadMedidaId,
                    Nombre = "Miel Pura de Abeja Silvestre",
                    Descripcion = "Miel cruda de floración de montaña, cosechada sin pesticidas ni aditivos. Frasco de vidrio sellado.",
                    Precio = 220.00m,
                    PermiteVenta = true,
                    PermiteTrueque = false,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-23),
                    ImagenUrl = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80"
                },
                new Producto
                {
                    ProductoraId = pSantos.ProductoraId,
                    CategoriaId = catDulces.CategoriaId,
                    UnidadMedidaId = uDocena.UnidadMedidaId,
                    Nombre = "Rosquillas Somoteñas Tradicionales",
                    Descripcion = "Elaboradas a mano en horno de barro con maíz criollo y queso chontaleño. Bolsita de 12 unidades crujientes.",
                    Precio = 90.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-20),
                    ImagenUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80"
                },
                new Producto
                {
                    ProductoraId = pSantos.ProductoraId,
                    CategoriaId = catCafe.CategoriaId,
                    UnidadMedidaId = uLibra.UnidadMedidaId,
                    Nombre = "Cacao Criollo en Grano Fermentado",
                    Descripcion = "Grano de cacao seleccionado listo para tostar. Ideal para elaborar chocolate artesanal o pinolillo.",
                    Precio = 0m,
                    PermiteVenta = false,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-18),
                    ImagenUrl = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80"
                },
                new Producto
                {
                    ProductoraId = pSantos.ProductoraId,
                    CategoriaId = catLacteos.CategoriaId,
                    UnidadMedidaId = uLibra.UnidadMedidaId,
                    Nombre = "Cuajada Fresca de Campo",
                    Descripcion = "Elaborada con leche fresca de ordeño matutino con bajo contenido de sal.",
                    Precio = 95.00m,
                    PermiteVenta = true,
                    PermiteTrueque = false,
                    Estado = false,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-15),
                    ImagenUrl = "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80"
                },
                new Producto
                {
                    ProductoraId = pSantos.ProductoraId,
                    CategoriaId = catArtesanias.CategoriaId,
                    UnidadMedidaId = uPieza.UnidadMedidaId,
                    Nombre = "Canasto de Fibra de Pita Tejido a Mano",
                    Descripcion = "Canasto tradicional multiusos tejido con fibras naturales por artesanas comunitarias.",
                    Precio = 180.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-10),
                    ImagenUrl = "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&auto=format&fit=crop&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 2: Carla Sanchez Lopez (Jinotepe) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "carla.sanchez@asla.ni"))
        {
            var uCarla = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Carla",
                Apellido = "Sanchez Lopez",
                Cedula = "041-200384-0001B",
                Correo = "carla.sanchez@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8899 1122",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-9),
                Estado = true
            };
            context.Usuarios.Add(uCarla);
            await context.SaveChangesAsync();

            var pCarla = new Productora
            {
                UsuarioId = uCarla.UsuarioId,
                UbicacionId = ubiJinotepe.UbicacionId,
                NombreEmprendimiento = "Frutales y Aguacates Don Luis",
                Descripcion = "Soy originaria de Jinotepe, Carazo. Me dedico a producir frutas agroecológicas como la Piña, el Mango, el Aguacate, Mandarinas y Bananos madurados al sol.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-8),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-7),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pCarla);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pCarla.ProductoraId,
                    CategoriaId = catFrutas.CategoriaId,
                    UnidadMedidaId = uDocena.UnidadMedidaId,
                    Nombre = "Mangos de rosa",
                    Descripcion = "Mangos dulces cultivados de forma orgánica y madurados al sol en Jinotepe.",
                    Precio = 25.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-12),
                    ImagenUrl = "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80"
                },
                new Producto
                {
                    ProductoraId = pCarla.ProductoraId,
                    CategoriaId = catFrutas.CategoriaId,
                    UnidadMedidaId = uPieza.UnidadMedidaId,
                    Nombre = "Aguacates mantequilla",
                    Descripcion = "Aguacates mantequilla de gran tamaño, cremosos y recién cortados del huerto sin químicos ni pesticidas.",
                    Precio = 25.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-14),
                    ImagenUrl = "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80"
                },
                new Producto
                {
                    ProductoraId = pCarla.ProductoraId,
                    CategoriaId = catFrutas.CategoriaId,
                    UnidadMedidaId = uPieza.UnidadMedidaId,
                    Nombre = "Piñas dulces",
                    Descripcion = "Piña de monte jugosa y dulce, cosechada en suelo volcánico fértil de Carazo.",
                    Precio = 35.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-9),
                    ImagenUrl = "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80"
                },
                new Producto
                {
                    ProductoraId = pCarla.ProductoraId,
                    CategoriaId = catFrutas.CategoriaId,
                    UnidadMedidaId = uDocena.UnidadMedidaId,
                    Nombre = "Bananos de seda",
                    Descripcion = "Bananos dulces madurados naturalmente en racimo.",
                    Precio = 20.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-7),
                    ImagenUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 3: Martha Ruíz Moraga (Rivas) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "martha.ruiz@asla.ni"))
        {
            var uMartha = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Martha",
                Apellido = "Ruíz Moraga",
                Cedula = "561-120979-0004C",
                Correo = "martha.ruiz@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8765 4321",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-11),
                Estado = true
            };
            context.Usuarios.Add(uMartha);
            await context.SaveChangesAsync();

            var pMartha = new Productora
            {
                UsuarioId = uMartha.UsuarioId,
                UbicacionId = ubiRivas.UbicacionId,
                NombreEmprendimiento = "Hortalizas y Cacao La Tradición",
                Descripcion = "Soy agricultora y artesana del cacao en Rivas. Produzco elotes tiernos, lechuga hidropónica y cacao criollo para trueque y venta comunitaria.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-10),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-9),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pMartha);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pMartha.ProductoraId,
                    CategoriaId = catGranos.CategoriaId,
                    UnidadMedidaId = uDocena.UnidadMedidaId,
                    Nombre = "Elotes tiernos",
                    Descripcion = "Elotes frescos de maíz blanco cosechados en luna llena, perfectos para güirilas, tamales o atol.",
                    Precio = 70.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-5),
                    ImagenUrl = "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=500&q=80"
                },
                new Producto
                {
                    ProductoraId = pMartha.ProductoraId,
                    CategoriaId = catGranos.CategoriaId,
                    UnidadMedidaId = uCabeza.UnidadMedidaId,
                    Nombre = "Lechuga fresca",
                    Descripcion = "Lechuga crujiente regada con agua limpia de pozo, cultivada sin pesticidas.",
                    Precio = 20.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-6),
                    ImagenUrl = "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=500&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 4: María Rojas Pérez (Diriamba) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "maria.rojas@asla.ni"))
        {
            var uMariaRojas = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "María",
                Apellido = "Rojas Pérez",
                Cedula = "042-180482-0005D",
                Correo = "maria.rojas@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8456 7890",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-7),
                Estado = true
            };
            context.Usuarios.Add(uMariaRojas);
            await context.SaveChangesAsync();

            var pMariaRojas = new Productora
            {
                UsuarioId = uMariaRojas.UsuarioId,
                UbicacionId = ubiDiriamba.UbicacionId,
                NombreEmprendimiento = "Huerto Agroecológico Las Tres Marías",
                Descripcion = "Emprendedora rural en Diriamba. Cosecho frijol rojo de seda, plátano gigante y papaya hawaiana con fertilizantes 100% orgánicos.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-6),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-5),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pMariaRojas);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pMariaRojas.ProductoraId,
                    CategoriaId = catGranos.CategoriaId,
                    UnidadMedidaId = uLibra.UnidadMedidaId,
                    Nombre = "Frijol Rojo Seda",
                    Descripcion = "Frijol rojo suave y de rápido cocimiento, cosecha nueva seleccionada a mano.",
                    Precio = 32.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-8),
                    ImagenUrl = "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=500&q=80"
                },
                new Producto
                {
                    ProductoraId = pMariaRojas.ProductoraId,
                    CategoriaId = catFrutas.CategoriaId,
                    UnidadMedidaId = uPieza.UnidadMedidaId,
                    Nombre = "Papaya Criolla Dulce",
                    Descripcion = "Papaya criolla jugosa y nutritiva, cultivada en huerto familiar sin químicos.",
                    Precio = 30.00m,
                    PermiteVenta = true,
                    PermiteTrueque = false,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-4),
                    ImagenUrl = "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=500&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 5: Estela Rivas (San Marcos) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "estela.rivas@asla.ni"))
        {
            var uEstela = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Estela",
                Apellido = "Rivas",
                Cedula = "043-050678-0003K",
                Correo = "estela.rivas@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8888 1234",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-12),
                Estado = true
            };
            context.Usuarios.Add(uEstela);
            await context.SaveChangesAsync();

            var pEstela = new Productora
            {
                UsuarioId = uEstela.UsuarioId,
                UbicacionId = ubiSanMarcos.UbicacionId,
                NombreEmprendimiento = "Semillas Criollas y Apicultura Rivas",
                Descripcion = "Lideresa defensora de las semillas criollas y la apicultura comunitaria en San Marcos. Producimos maíz blanco, frijoles y miel pura.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-11),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-10),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pEstela);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pEstela.ProductoraId,
                    CategoriaId = catGranos.CategoriaId,
                    UnidadMedidaId = uDocena.UnidadMedidaId,
                    Nombre = "12cena de Elotes Tiernos",
                    Descripcion = "Elotes tiernos cosechados de forma agroecológica, sin químicos. Ideales para güirilas, atol o elotes cocidos.",
                    Precio = 70.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-2),
                    ImagenUrl = "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
                },
                new Producto
                {
                    ProductoraId = pEstela.ProductoraId,
                    CategoriaId = catGranos.CategoriaId,
                    UnidadMedidaId = uBolsa.UnidadMedidaId,
                    Nombre = "Frijol Rojo Criollo (5 lbs)",
                    Descripcion = "Frijol nuevo de seda, suave y de rápida cocción. Semilla criolla preservada por generaciones.",
                    Precio = 130.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-3),
                    ImagenUrl = "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=500&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 6: Lucia Ruíz (Granada / Mombacho) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "lucia.ruiz@asla.ni"))
        {
            var uLucia = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Lucia",
                Apellido = "Ruíz",
                Cedula = "201-140785-0002M",
                Correo = "lucia.ruiz@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8234 5678",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-8),
                Estado = true
            };
            context.Usuarios.Add(uLucia);
            await context.SaveChangesAsync();

            var pLucia = new Productora
            {
                UsuarioId = uLucia.UsuarioId,
                UbicacionId = ubiGranada.UbicacionId,
                NombreEmprendimiento = "Cafetal y Cítricos El Mombacho",
                Descripcion = "Productora en las faldas del Volcán Mombacho con plantaciones de café, cítricos y pitahaya cultivadas en armonía con la reserva natural.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-7),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-6),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pLucia);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pLucia.ProductoraId,
                    CategoriaId = catFrutas.CategoriaId,
                    UnidadMedidaId = uPieza.UnidadMedidaId,
                    Nombre = "Pitahaya Roja Nacional",
                    Descripcion = "Pitahaya fresca con alto contenido de antioxidantes, dulce y recién cortada en las faldas del Mombacho.",
                    Precio = 45.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-1),
                    ImagenUrl = "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=500&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 7: Carmen Ortiz (Masaya) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "carmen.ortiz@asla.ni"))
        {
            var uCarmen = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Carmen",
                Apellido = "Ortiz",
                Cedula = "401-220180-0001P",
                Correo = "carmen.ortiz@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8345 6789",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-10),
                Estado = true
            };
            context.Usuarios.Add(uCarmen);
            await context.SaveChangesAsync();

            var pCarmen = new Productora
            {
                UsuarioId = uCarmen.UsuarioId,
                UbicacionId = ubiMasaya.UbicacionId,
                NombreEmprendimiento = "Cooperativa Apícola La Reina",
                Descripcion = "Cooperativa de mujeres apicultoras en Masaya dedicadas a la producción de miel cruda, polen y derivados medicinales apícolas.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-9),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-8),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pCarmen);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pCarmen.ProductoraId,
                    CategoriaId = catMiel.CategoriaId,
                    UnidadMedidaId = uBotella.UnidadMedidaId,
                    Nombre = "Miel de Abeja Pura (Botella 500ml)",
                    Descripcion = "Miel de floración silvestre 100% pura y natural, extraída artesanalmente por cooperativa de mujeres.",
                    Precio = 120.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-3),
                    ImagenUrl = "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- Productora 8: Rosa Morales (Rivas) ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "rosa.morales@asla.ni"))
        {
            var uRosa = new Usuario
            {
                RolId = rolProductora.RolId,
                Nombre = "Rosa",
                Apellido = "Morales",
                Cedula = "561-300883-0002L",
                Correo = "rosa.morales@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8456 1234",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow.AddMonths(-5),
                Estado = true
            };
            context.Usuarios.Add(uRosa);
            await context.SaveChangesAsync();

            var pRosa = new Productora
            {
                UsuarioId = uRosa.UsuarioId,
                UbicacionId = ubiRivas.UbicacionId,
                NombreEmprendimiento = "Platanales y Frutales El Paraíso",
                Descripcion = "Cultivadora de plátanos gigantes y frutas tropicales en el fértil departamento de Rivas.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-4),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-3),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
            };
            context.Productoras.Add(pRosa);
            await context.SaveChangesAsync();

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = pRosa.ProductoraId,
                    CategoriaId = catGranos.CategoriaId,
                    UnidadMedidaId = uDocena.UnidadMedidaId,
                    Nombre = "Plátanos Verdes Gigantes",
                    Descripcion = "Plátanos gigantes de primera calidad para tostones o tajadas, cultivados en Rivas.",
                    Precio = 40.00m,
                    PermiteVenta = true,
                    PermiteTrueque = true,
                    Estado = true,
                    FechaPublicacion = DateTime.UtcNow.AddDays(-2),
                    ImagenUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
                }
            );
            await context.SaveChangesAsync();
        }

        // --- 7. USUARIOS COMPRADORES ---
        if (!await context.Usuarios.AnyAsync(u => u.Correo == "maria.lopez@asla.ni"))
        {
            var uMaria = new Usuario
            {
                RolId = rolCompradora.RolId,
                Nombre = "María",
                Apellido = "López Pérez",
                Cedula = "001-010190-0001A",
                Correo = "maria.lopez@asla.ni",
                Contrasena = "123456",
                Telefono = "+505 8765 4321",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow,
                Estado = true
            };
            context.Usuarios.Add(uMaria);
            await context.SaveChangesAsync();

            context.Carritos.Add(new Carrito { UsuarioId = uMaria.UsuarioId, FechaCreacion = DateTime.UtcNow, EstadoActivo = true });
            await context.SaveChangesAsync();
        }

        if (!await context.Usuarios.AnyAsync(u => u.Correo == "camila.navarro@gmail.com"))
        {
            var uCamila = new Usuario
            {
                RolId = rolCompradora.RolId,
                Nombre = "Camila",
                Apellido = "Navarro",
                Cedula = "001-120598-0003F",
                Correo = "camila.navarro@gmail.com",
                Contrasena = "password123",
                Telefono = "+505 8456 7890",
                Genero = "Femenino",
                EstadoVerificacion = "Usuaria Verificada",
                FechaRegistro = DateTime.UtcNow,
                Estado = true
            };
            context.Usuarios.Add(uCamila);
            await context.SaveChangesAsync();

            context.Carritos.Add(new Carrito { UsuarioId = uCamila.UsuarioId, FechaCreacion = DateTime.UtcNow, EstadoActivo = true });
            await context.SaveChangesAsync();
        }
    }
}
