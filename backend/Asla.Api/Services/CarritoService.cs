using Asla.Api.Data;
using Asla.Api.DTOs.Carrito;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class CarritoService
{
    private readonly AppDbContext _context;

    public CarritoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CarritoDto> GetCarritoByUsuarioIdAsync(int usuarioId)
    {
        // Buscar carrito activo del usuario, si no existe se crea uno nuevo
        var carrito = await _context.Carritos
            .Include(c => c.Detalles)
                .ThenInclude(d => d.Producto)
                    .ThenInclude(p => p.Productora)
                        .ThenInclude(pr => pr.Usuario)
            .Include(c => c.Detalles)
                .ThenInclude(d => d.Producto)
                    .ThenInclude(p => p.Productora)
                        .ThenInclude(pr => pr.Ubicacion)
            .Include(c => c.Detalles)
                .ThenInclude(d => d.Producto)
                    .ThenInclude(p => p.UnidadMedida)
            .FirstOrDefaultAsync(c => c.UsuarioId == usuarioId && c.EstadoActivo);

        if (carrito == null)
        {
            carrito = new Carrito
            {
                UsuarioId = usuarioId,
                FechaCreacion = DateTime.UtcNow,
                EstadoActivo = true
            };
            _context.Carritos.Add(carrito);
            await _context.SaveChangesAsync();
        }

        // Agrupar items del carrito por productora
        var grupos = carrito.Detalles
            .Where(d => d.Producto != null && d.Producto.Estado)
            .GroupBy(d => d.Producto.ProductoraId)
            .Select(g =>
            {
                var primeraProductora = g.First().Producto.Productora;
                var nombreProductora = string.IsNullOrWhiteSpace(primeraProductora.NombreEmprendimiento)
                    ? primeraProductora.Usuario.Nombre + " " + primeraProductora.Usuario.Apellido
                    : primeraProductora.NombreEmprendimiento;

                var items = g.Select(d => new ItemCarritoDto
                {
                    DetalleCarritoId = d.DetalleCarritoId,
                    ProductoId = d.ProductoId,
                    NombreProducto = d.Producto.Nombre,
                    ImagenUrl = d.Producto.ImagenUrl,
                    PrecioUnitario = d.Producto.Precio,
                    Cantidad = d.Cantidad,
                    PermiteVenta = d.Producto.PermiteVenta,
                    PermiteTrueque = d.Producto.PermiteTrueque,
                    UnidadMedidaNombre = d.Producto.UnidadMedida?.Nombre ?? "Unidad"
                }).ToList();

                return new GrupoProductoraCarritoDto
                {
                    ProductoraId = g.Key,
                    NombreProductora = nombreProductora,
                    TelefonoWhatsapp = primeraProductora.Usuario?.Telefono ?? string.Empty,
                    Ubicacion = $"{primeraProductora.Ubicacion?.Municipio}, {primeraProductora.Ubicacion?.Departamento}",
                    SubtotalProductora = items.Sum(i => i.Subtotal),
                    Productos = items
                };
            })
            .ToList();

        return new CarritoDto
        {
            CarritoId = carrito.CarritoId,
            UsuarioId = carrito.UsuarioId,
            MontoTotal = grupos.Sum(g => g.SubtotalProductora),
            GruposPorProductora = grupos
        };
    }

    public async Task<CarritoDto> AgregarItemCarritoAsync(AgregarItemCarritoDto dto)
    {
        var carrito = await _context.Carritos
            .Include(c => c.Detalles)
            .FirstOrDefaultAsync(c => c.UsuarioId == dto.UsuarioId && c.EstadoActivo);

        if (carrito == null)
        {
            carrito = new Carrito
            {
                UsuarioId = dto.UsuarioId,
                FechaCreacion = DateTime.UtcNow,
                EstadoActivo = true
            };
            _context.Carritos.Add(carrito);
            await _context.SaveChangesAsync();
        }

        var detalleExistente = carrito.Detalles.FirstOrDefault(d => d.ProductoId == dto.ProductoId);

        if (detalleExistente != null)
        {
            detalleExistente.Cantidad += dto.Cantidad;
        }
        else
        {
            var nuevoDetalle = new DetalleCarrito
            {
                CarritoId = carrito.CarritoId,
                ProductoId = dto.ProductoId,
                Cantidad = dto.Cantidad
            };
            _context.DetallesCarrito.Add(nuevoDetalle);
        }

        await _context.SaveChangesAsync();

        return await GetCarritoByUsuarioIdAsync(dto.UsuarioId);
    }

    public async Task<CarritoDto?> ActualizarCantidadItemAsync(int detalleCarritoId, decimal cantidad)
    {
        var detalle = await _context.DetallesCarrito
            .Include(d => d.Carrito)
            .FirstOrDefaultAsync(d => d.DetalleCarritoId == detalleCarritoId);

        if (detalle == null)
        {
            return null;
        }

        if (cantidad <= 0)
        {
            _context.DetallesCarrito.Remove(detalle);
        }
        else
        {
            detalle.Cantidad = cantidad;
        }

        await _context.SaveChangesAsync();

        return await GetCarritoByUsuarioIdAsync(detalle.Carrito.UsuarioId);
    }

    public async Task<bool> EliminarItemCarritoAsync(int detalleCarritoId)
    {
        var detalle = await _context.DetallesCarrito.FirstOrDefaultAsync(d => d.DetalleCarritoId == detalleCarritoId);

        if (detalle == null)
        {
            return false;
        }

        _context.DetallesCarrito.Remove(detalle);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> VaciarCarritoAsync(int usuarioId)
    {
        var carrito = await _context.Carritos
            .Include(c => c.Detalles)
            .FirstOrDefaultAsync(c => c.UsuarioId == usuarioId && c.EstadoActivo);

        if (carrito == null)
        {
            return false;
        }

        _context.DetallesCarrito.RemoveRange(carrito.Detalles);
        await _context.SaveChangesAsync();
        return true;
    }
}
