using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Asegurar que la base de datos esté creada y actualizada
        await context.Database.MigrateAsync();

        // 1. Roles
        if (!await context.Roles.AnyAsync())
        {
            context.Roles.AddRange(
                new Rol { Nombre = "Productora", Descripcion = "Mujer productora rural emprendedora" },
                new Rol { Nombre = "Compradora", Descripcion = "Cliente o aliada comunitaria" },
                new Rol { Nombre = "Administrador", Descripcion = "Administrador del sistema" }
            );
            await context.SaveChangesAsync();
        }

        var rolProductora = await context.Roles.FirstOrDefaultAsync(r => r.Nombre == "Productora");
        int rolProductoraId = rolProductora?.RolId ?? 1;

        // 2. Categorías
        if (!await context.Categorias.AnyAsync())
        {
            context.Categorias.AddRange(
                new Categoria { Nombre = "Café y Cacao", Descripcion = "Café de altura y cacao criollo artesanal", Estado = true },
                new Categoria { Nombre = "Miel y Apicultura", Descripcion = "Miel pura y derivados apícolas", Estado = true },
                new Categoria { Nombre = "Granos y Hortalizas", Descripcion = "Frijoles, maíz, verduras y frutas de temporada", Estado = true },
                new Categoria { Nombre = "Lácteos y Derivados", Descripcion = "Queso artesanal, cuajada y crema", Estado = true },
                new Categoria { Nombre = "Artesanías y Textiles", Descripcion = "Tejidos en pita, barro y madera", Estado = true },
                new Categoria { Nombre = "Dulces y Tradición", Descripcion = "Rosquillas, cajetas y panes tradicionales", Estado = true }
            );
            await context.SaveChangesAsync();
        }

        // 3. Unidades de Medida
        if (!await context.UnidadesMedida.AnyAsync())
        {
            context.UnidadesMedida.AddRange(
                new UnidadMedida { Nombre = "Libra (lb)", Estado = true },
                new UnidadMedida { Nombre = "Litro (L)", Estado = true },
                new UnidadMedida { Nombre = "Frasco", Estado = true },
                new UnidadMedida { Nombre = "Docena", Estado = true },
                new UnidadMedida { Nombre = "Unidad / Pieza", Estado = true },
                new UnidadMedida { Nombre = "Quintal (qq)", Estado = true },
                new UnidadMedida { Nombre = "Canasto / Bolsa", Estado = true }
            );
            await context.SaveChangesAsync();
        }

        // 4. Ubicación por defecto
        if (!await context.Ubicaciones.AnyAsync())
        {
            context.Ubicaciones.Add(new Ubicacion
            {
                Departamento = "Matagalpa",
                Municipio = "San Ramón",
                Comunidad = "La Reyna",
                Direccion = "Del empalme La Reyna, 2 km al norte, Finca El Renacer"
            });
            await context.SaveChangesAsync();
        }

        var ubicacionDefault = await context.Ubicaciones.FirstAsync();

        // 5. Usuario y Productora de Prueba (Santos Jarquín)
        if (!await context.Usuarios.AnyAsync())
        {
            var usuarioSantos = new Usuario
            {
                RolId = rolProductoraId,
                Nombre = "Santos",
                Apellido = "Jarquín Blandón",
                Cedula = "441-150875-0002K",
                Correo = "santos.jarquin@asla.ni",
                Contrasena = "asla2026",
                Telefono = "+505 8823 4567",
                Genero = "Femenino",
                EstadoVerificacion = "Verificada",
                FechaRegistro = DateTime.UtcNow,
                Estado = true
            };
            context.Usuarios.Add(usuarioSantos);
            await context.SaveChangesAsync();

            var productoraSantos = new Productora
            {
                UsuarioId = usuarioSantos.UsuarioId,
                UbicacionId = ubicacionDefault.UbicacionId,
                NombreEmprendimiento = "Finca El Renacer & Café de Altura",
                Descripcion = "Mujer productora rural de Matagalpa. Cultivamos café orgánico de sombra y producimos miel silvestre, conservando saberes ancestrales y promoviendo el trueque comunitario.",
                EstadoVerificacion = "Verificada",
                FechaSolicitud = DateTime.UtcNow.AddMonths(-6),
                FechaVerificacion = DateTime.UtcNow.AddMonths(-5),
                Estado = true,
                ImagenUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
            };
            context.Productoras.Add(productoraSantos);
            await context.SaveChangesAsync();

            // 6. Etiquetas
            if (!await context.Etiquetas.AnyAsync())
            {
                var etiquetaOrganico = new Etiqueta { Nombre = "Orgánico" };
                var etiquetaArtesanal = new Etiqueta { Nombre = "Artesanal" };
                var etiquetaComercioJusto = new Etiqueta { Nombre = "Comercio Justo" };
                context.Etiquetas.AddRange(etiquetaOrganico, etiquetaArtesanal, etiquetaComercioJusto);
                await context.SaveChangesAsync();

                context.ProductoraEtiquetas.AddRange(
                    new ProductoraEtiqueta { ProductoraId = productoraSantos.ProductoraId, EtiquetaId = etiquetaOrganico.EtiquetaId },
                    new ProductoraEtiqueta { ProductoraId = productoraSantos.ProductoraId, EtiquetaId = etiquetaArtesanal.EtiquetaId }
                );
                await context.SaveChangesAsync();
            }

            // 7. Productos Iniciales
            var catCafe = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Café")) ?? await context.Categorias.FirstAsync();
            var catMiel = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Miel")) ?? catCafe;
            var catDulces = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Dulces")) ?? catCafe;
            var catLacteos = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Lácteos")) ?? catCafe;
            var catArtesanias = await context.Categorias.FirstOrDefaultAsync(c => c.Nombre.Contains("Artesanías")) ?? catCafe;

            var uLibra = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Libra")) ?? await context.UnidadesMedida.FirstAsync();
            var uFrasco = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Frasco")) ?? uLibra;
            var uDocena = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Docena")) ?? uLibra;
            var uPieza = await context.UnidadesMedida.FirstOrDefaultAsync(u => u.Nombre.Contains("Unidad")) ?? uLibra;

            context.Productos.AddRange(
                new Producto
                {
                    ProductoraId = productoraSantos.ProductoraId,
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
                    ProductoraId = productoraSantos.ProductoraId,
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
                    ProductoraId = productoraSantos.ProductoraId,
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
                    ProductoraId = productoraSantos.ProductoraId,
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
                    ProductoraId = productoraSantos.ProductoraId,
                    CategoriaId = catLacteos.CategoriaId,
                    UnidadMedidaId = uLibra.UnidadMedidaId,
                    Nombre = "Cuajada Fresca de Campo",
                    Descripcion = "Elaborada con leche fresca de ordeño matutino con bajo contenido de sal.",
                    Precio = 95.00m,
                    PermiteVenta = true,
                    PermiteTrueque = false,
                    Estado = false, // Inactivo para probar filtro
                    FechaPublicacion = DateTime.UtcNow.AddDays(-15),
                    ImagenUrl = "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80"
                },
                new Producto
                {
                    ProductoraId = productoraSantos.ProductoraId,
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
    }
}
