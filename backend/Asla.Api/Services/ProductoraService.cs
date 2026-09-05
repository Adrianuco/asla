using Asla.Api.Data;
using Asla.Api.DTOs.Producto;
using Asla.Api.DTOs.Productora;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class ProductoraService
{
    private readonly AppDbContext _context;

    public ProductoraService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductoraListDto>> GetProductorasAsync(string? municipio = null, string? busqueda = null)
    {
        var query = _context.Productoras
            .AsNoTracking()
            .Where(p => p.Estado);

        if (!string.IsNullOrWhiteSpace(municipio))
        {
            query = query.Where(p => p.Ubicacion.Municipio.Contains(municipio));
        }

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            query = query.Where(p =>
                p.NombreEmprendimiento.Contains(busqueda) ||
                (p.Usuario.Nombre + " " + p.Usuario.Apellido).Contains(busqueda));
        }

        var productoras = await query
            .Select(p => new
            {
                p.ProductoraId,
                NombreUsuario = p.Usuario.Nombre + " " + p.Usuario.Apellido,
                p.NombreEmprendimiento,
                p.ImagenUrl,
                Municipio = p.Ubicacion.Municipio,
                Departamento = p.Ubicacion.Departamento,
                Etiquetas = p.ProductoraEtiquetas.Select(pe => pe.Etiqueta.Nombre).ToList(),
                ProductosPreview = p.Productos
                    .Where(prod => prod.Estado)
                    .Take(3)
                    .Select(prod => new ProductoPreviewDto
                    {
                        ProductoId = prod.ProductoId,
                        Nombre = prod.Nombre,
                        ImagenUrl = prod.ImagenUrl
                    })
                    .ToList()
            })
            .ToListAsync();

        return productoras.Select(p => new ProductoraListDto
        {
            ProductoraId = p.ProductoraId,
            Nombre = string.IsNullOrWhiteSpace(p.NombreEmprendimiento) ? p.NombreUsuario : p.NombreUsuario,
            NombreEmprendimiento = p.NombreEmprendimiento,
            ImagenUrl = p.ImagenUrl,
            Municipio = p.Municipio,
            Departamento = p.Departamento,
            Ubicacion = $"{p.Municipio}, {p.Departamento}",
            Valoracion = 5.0m,
            Etiquetas = p.Etiquetas,
            ProductosPreview = p.ProductosPreview
        }).ToList();
    }

    public async Task<ProductoraDetalleDto?> GetProductoraByIdAsync(int id)
    {
        var productora = await _context.Productoras
            .AsNoTracking()
            .Where(p => p.ProductoraId == id)
            .Select(p => new
            {
                p.ProductoraId,
                p.UsuarioId,
                NombreUsuario = p.Usuario.Nombre + " " + p.Usuario.Apellido,
                p.NombreEmprendimiento,
                p.Descripcion,
                p.ImagenUrl,
                Municipio = p.Ubicacion.Municipio,
                Departamento = p.Ubicacion.Departamento,
                p.EstadoVerificacion,
                TelefonoWhatsapp = p.Usuario.Telefono,
                TotalProductos = p.Productos.Count(prod => prod.Estado),
                TotalTrueques = p.Trueques.Count(),
                Etiquetas = p.ProductoraEtiquetas.Select(pe => pe.Etiqueta.Nombre).ToList(),
                Productos = p.Productos
                    .Where(prod => prod.Estado)
                    .Select(prod => new ProductoDetalleDto
                    {
                        ProductoId = prod.ProductoId,
                        Nombre = prod.Nombre,
                        Descripcion = prod.Descripcion,
                        Precio = prod.Precio,
                        PermiteVenta = prod.PermiteVenta,
                        PermiteTrueque = prod.PermiteTrueque,
                        FechaPublicacion = prod.FechaPublicacion,
                        Estado = prod.Estado,
                        ImagenUrl = prod.ImagenUrl,
                        CategoriaId = prod.CategoriaId,
                        CategoriaNombre = prod.Categoria.Nombre,
                        UnidadMedidaId = prod.UnidadMedidaId,
                        UnidadMedidaNombre = prod.UnidadMedida.Nombre,
                        ProductoraId = prod.ProductoraId,
                        ProductoraNombre = string.IsNullOrWhiteSpace(p.NombreEmprendimiento)
                            ? p.Usuario.Nombre + " " + p.Usuario.Apellido
                            : p.NombreEmprendimiento,
                        ProductoraUbicacion = p.Ubicacion.Municipio + ", " + p.Ubicacion.Departamento
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (productora == null)
        {
            return null;
        }

        return new ProductoraDetalleDto
        {
            ProductoraId = productora.ProductoraId,
            UsuarioId = productora.UsuarioId,
            Nombre = productora.NombreUsuario,
            NombreEmprendimiento = productora.NombreEmprendimiento,
            Descripcion = productora.Descripcion,
            ImagenUrl = productora.ImagenUrl,
            Municipio = productora.Municipio,
            Departamento = productora.Departamento,
            Ubicacion = $"{productora.Municipio}, {productora.Departamento}",
            EstadoVerificacion = productora.EstadoVerificacion,
            TelefonoWhatsapp = productora.TelefonoWhatsapp,
            Valoracion = 5.0m,
            TotalProductos = productora.TotalProductos,
            TotalTrueques = productora.TotalTrueques,
            Etiquetas = productora.Etiquetas,
            Productos = productora.Productos
        };
    }

    public async Task<ProductoraDetalleDto> CreateProductoraAsync(CrearProductoraDto dto)
    {
        var productora = new Productora
        {
            UsuarioId = dto.UsuarioId,
            UbicacionId = dto.UbicacionId,
            NombreEmprendimiento = dto.NombreEmprendimiento,
            Descripcion = dto.Descripcion,
            ImagenUrl = dto.ImagenUrl,
            EstadoVerificacion = "Pendiente",
            FechaSolicitud = DateTime.UtcNow,
            Estado = true
        };

        if (dto.EtiquetaIds.Any())
        {
            foreach (var etiquetaId in dto.EtiquetaIds)
            {
                productora.ProductoraEtiquetas.Add(new ProductoraEtiqueta
                {
                    EtiquetaId = etiquetaId
                });
            }
        }

        _context.Productoras.Add(productora);
        await _context.SaveChangesAsync();

        return (await GetProductoraByIdAsync(productora.ProductoraId))!;
    }

    public async Task<bool> UpdateProductoraAsync(int id, ActualizarProductoraDto dto)
    {
        var productora = await _context.Productoras
            .Include(p => p.ProductoraEtiquetas)
            .FirstOrDefaultAsync(p => p.ProductoraId == id);

        if (productora == null)
        {
            return false;
        }

        productora.UbicacionId = dto.UbicacionId;
        productora.NombreEmprendimiento = dto.NombreEmprendimiento;
        productora.Descripcion = dto.Descripcion;
        productora.ImagenUrl = dto.ImagenUrl;
        productora.Estado = dto.Estado;

        // Actualizar etiquetas
        productora.ProductoraEtiquetas.Clear();
        if (dto.EtiquetaIds.Any())
        {
            foreach (var etiquetaId in dto.EtiquetaIds)
            {
                productora.ProductoraEtiquetas.Add(new ProductoraEtiqueta
                {
                    ProductoraId = id,
                    EtiquetaId = etiquetaId
                });
            }
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteProductoraAsync(int id)
    {
        var productora = await _context.Productoras.FirstOrDefaultAsync(p => p.ProductoraId == id);

        if (productora == null)
        {
            return false;
        }

        productora.Estado = false;
        await _context.SaveChangesAsync();
        return true;
    }
}
