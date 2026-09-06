using Asla.Api.Data;
using Asla.Api.DTOs.Producto;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class ProductoService
{
    private readonly AppDbContext _context;

    public ProductoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductoDetalleDto>> GetProductosAsync(string? busqueda = null, int? productoraId = null, int? categoriaId = null)
    {
        var query = _context.Productos
            .AsNoTracking()
            .Where(p => p.Estado);

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            query = query.Where(p => p.Nombre.Contains(busqueda) || (p.Descripcion != null && p.Descripcion.Contains(busqueda)));
        }

        if (productoraId.HasValue)
        {
            query = query.Where(p => p.ProductoraId == productoraId.Value);
        }

        if (categoriaId.HasValue)
        {
            query = query.Where(p => p.CategoriaId == categoriaId.Value);
        }

        return await query
            .Select(p => new ProductoDetalleDto
            {
                ProductoId = p.ProductoId,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                PermiteVenta = p.PermiteVenta,
                PermiteTrueque = p.PermiteTrueque,
                FechaPublicacion = p.FechaPublicacion,
                Estado = p.Estado,
                ImagenUrl = p.ImagenUrl,
                CategoriaId = p.CategoriaId,
                CategoriaNombre = p.Categoria.Nombre,
                UnidadMedidaId = p.UnidadMedidaId,
                UnidadMedidaNombre = p.UnidadMedida.Nombre,
                ProductoraId = p.ProductoraId,
                ProductoraNombre = string.IsNullOrWhiteSpace(p.Productora.NombreEmprendimiento)
                    ? p.Productora.Usuario.Nombre + " " + p.Productora.Usuario.Apellido
                    : p.Productora.NombreEmprendimiento,
                ProductoraUbicacion = p.Productora.Ubicacion.Municipio + ", " + p.Productora.Ubicacion.Departamento
            })
            .ToListAsync();
    }

    public async Task<ProductoDetalleDto?> GetProductoByIdAsync(int id)
    {
        return await _context.Productos
            .AsNoTracking()
            .Where(p => p.ProductoId == id)
            .Select(p => new ProductoDetalleDto
            {
                ProductoId = p.ProductoId,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                PermiteVenta = p.PermiteVenta,
                PermiteTrueque = p.PermiteTrueque,
                FechaPublicacion = p.FechaPublicacion,
                Estado = p.Estado,
                ImagenUrl = p.ImagenUrl,
                CategoriaId = p.CategoriaId,
                CategoriaNombre = p.Categoria.Nombre,
                UnidadMedidaId = p.UnidadMedidaId,
                UnidadMedidaNombre = p.UnidadMedida.Nombre,
                ProductoraId = p.ProductoraId,
                ProductoraNombre = string.IsNullOrWhiteSpace(p.Productora.NombreEmprendimiento)
                    ? p.Productora.Usuario.Nombre + " " + p.Productora.Usuario.Apellido
                    : p.Productora.NombreEmprendimiento,
                ProductoraUbicacion = p.Productora.Ubicacion.Municipio + ", " + p.Productora.Ubicacion.Departamento
            })
            .FirstOrDefaultAsync();
    }

    public async Task<ProductoDetalleDto> CreateProductoAsync(CrearProductoDto dto)
    {
        var producto = new Producto
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            Precio = dto.Precio,
            PermiteVenta = dto.PermiteVenta,
            PermiteTrueque = dto.PermiteTrueque,
            FechaPublicacion = DateTime.UtcNow,
            Estado = true,
            ImagenUrl = dto.ImagenUrl,
            CategoriaId = dto.CategoriaId,
            UnidadMedidaId = dto.UnidadMedidaId,
            ProductoraId = dto.ProductoraId
        };

        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return (await GetProductoByIdAsync(producto.ProductoId))!;
    }

    public async Task<bool> UpdateProductoAsync(int id, ActualizarProductoDto dto)
    {
        var productoExistente = await _context.Productos.FirstOrDefaultAsync(p => p.ProductoId == id);

        if (productoExistente == null)
        {
            return false;
        }

        productoExistente.Nombre = dto.Nombre;
        productoExistente.Descripcion = dto.Descripcion;
        productoExistente.Precio = dto.Precio;
        productoExistente.PermiteVenta = dto.PermiteVenta;
        productoExistente.PermiteTrueque = dto.PermiteTrueque;
        productoExistente.CategoriaId = dto.CategoriaId;
        productoExistente.UnidadMedidaId = dto.UnidadMedidaId;
        productoExistente.Estado = dto.Estado;
        productoExistente.ImagenUrl = dto.ImagenUrl;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteProductoAsync(int id)
    {
        var producto = await _context.Productos.FirstOrDefaultAsync(p => p.ProductoId == id);

        if (producto == null)
        {
            return false;
        }

        // Verificar si el producto tiene historial en pedidos o trueques
        bool tienePedidos = await _context.DetallesPedido.AnyAsync(dp => dp.ProductoId == id);
        bool tieneTrueques = await _context.DetallesTrueque.AnyAsync(dt => dt.ProductoId == id);

        if (tienePedidos || tieneTrueques)
        {
            // Borrado lógico para preservar datos históricos
            producto.Estado = false;
        }
        else
        {
            // Borrado físico si no tiene historial asociado
            _context.Productos.Remove(producto);
        }

        await _context.SaveChangesAsync();
        return true;
    }
}