using Asla.Api.Data;
using Asla.Api.DTOs.Pedidos;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class PedidoService
{
    private readonly AppDbContext _context;

    public PedidoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PedidoResponseDto>> GetPedidos(int? usuarioId = null, int? productoraId = null, string? estado = null)
    {
        var query = _context.Pedidos
            .AsNoTracking()
            .Include(p => p.Usuario)
            .Include(p => p.Productora)
            .Include(p => p.Factura)
            .Include(p => p.DetallesPedido)
                .ThenInclude(dp => dp.Producto)
            .AsQueryable();

        if (usuarioId.HasValue)
        {
            query = query.Where(p => p.UsuarioId == usuarioId.Value);
        }

        if (productoraId.HasValue)
        {
            query = query.Where(p => p.ProductoraId == productoraId.Value);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            query = query.Where(p => p.Estado.ToLower() == estado.Trim().ToLower());
        }

        var pedidos = await query.OrderByDescending(p => p.FechaPedido).ToListAsync();

        return pedidos.Select(MapToResponseDto).ToList();
    }

    public async Task<PedidoResponseDto?> GetPedidoById(int id)
    {
        var pedido = await _context.Pedidos
            .AsNoTracking()
            .Include(p => p.Usuario)
            .Include(p => p.Productora)
            .Include(p => p.Factura)
            .Include(p => p.DetallesPedido)
                .ThenInclude(dp => dp.Producto)
            .FirstOrDefaultAsync(p => p.PedidoId == id);

        return pedido == null ? null : MapToResponseDto(pedido);
    }

    public async Task<PedidoResponseDto> CreatePedido(CrearPedidoDto dto)
    {
        if (dto.Detalles == null || !dto.Detalles.Any())
        {
            throw new ArgumentException("El pedido debe contener al menos un producto.");
        }

        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioId == dto.UsuarioId);
        if (usuario == null)
        {
            throw new KeyNotFoundException($"El usuario con ID {dto.UsuarioId} no existe.");
        }
        if (!usuario.Estado)
        {
            throw new InvalidOperationException($"El usuario con ID {dto.UsuarioId} está inactivo.");
        }

        var productora = await _context.Productoras.FirstOrDefaultAsync(p => p.ProductoraId == dto.ProductoraId);
        if (productora == null)
        {
            throw new KeyNotFoundException($"La productora con ID {dto.ProductoraId} no existe.");
        }
        if (!productora.Estado)
        {
            throw new InvalidOperationException($"La productora con ID {dto.ProductoraId} está inactiva.");
        }

        var productIds = dto.Detalles.Select(d => d.ProductoId).Distinct().ToList();
        var productos = await _context.Productos
            .Where(p => productIds.Contains(p.ProductoId))
            .ToDictionaryAsync(p => p.ProductoId);

        foreach (var id in productIds)
        {
            if (!productos.ContainsKey(id))
            {
                throw new KeyNotFoundException($"El producto con ID {id} no existe.");
            }
        }

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var detallesEntities = new List<DetallePedido>();
            decimal totalCalculado = 0;
            bool esVenta = dto.TipoOperacion.Equals("Venta", StringComparison.OrdinalIgnoreCase);

            foreach (var item in dto.Detalles)
            {
                if (item.Cantidad <= 0)
                {
                    throw new ArgumentException($"La cantidad para el producto ID {item.ProductoId} debe ser mayor a 0.");
                }

                var producto = productos[item.ProductoId];

                if (!producto.Estado)
                {
                    throw new InvalidOperationException($"El producto '{producto.Nombre}' (ID: {producto.ProductoId}) no está activo.");
                }

                if (producto.ProductoraId != dto.ProductoraId)
                {
                    throw new InvalidOperationException($"El producto '{producto.Nombre}' no pertenece a la productora indicada (ID: {dto.ProductoraId}).");
                }

                if (esVenta && !producto.PermiteVenta)
                {
                    throw new InvalidOperationException($"El producto '{producto.Nombre}' no está habilitado para venta.");
                }

                decimal precioUnitario = producto.Precio;
                decimal subtotal = item.Cantidad * precioUnitario;
                totalCalculado += subtotal;

                detallesEntities.Add(new DetallePedido
                {
                    ProductoId = item.ProductoId,
                    Cantidad = item.Cantidad,
                    PrecioUnitario = precioUnitario,
                    Subtotal = subtotal
                });
            }

            var pedido = new Pedido
            {
                UsuarioId = dto.UsuarioId,
                ProductoraId = dto.ProductoraId,
                TipoOperacion = string.IsNullOrWhiteSpace(dto.TipoOperacion) ? "Venta" : dto.TipoOperacion,
                FechaPedido = DateTime.UtcNow,
                Estado = "Pendiente",
                Total = totalCalculado,
                DetallesPedido = detallesEntities
            };

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return (await GetPedidoById(pedido.PedidoId))!;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<bool> UpdateEstadoPedido(int id, string nuevoEstado)
    {
        var pedido = await _context.Pedidos.FirstOrDefaultAsync(p => p.PedidoId == id);
        if (pedido == null)
        {
            return false;
        }

        pedido.Estado = nuevoEstado;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeletePedido(int id)
    {
        var pedido = await _context.Pedidos
            .Include(p => p.DetallesPedido)
            .FirstOrDefaultAsync(p => p.PedidoId == id);

        if (pedido == null)
        {
            return false;
        }

        _context.Pedidos.Remove(pedido);
        await _context.SaveChangesAsync();
        return true;
    }

    private static PedidoResponseDto MapToResponseDto(Pedido pedido)
    {
        return new PedidoResponseDto
        {
            PedidoId = pedido.PedidoId,
            UsuarioId = pedido.UsuarioId,
            NombreUsuario = pedido.Usuario != null ? $"{pedido.Usuario.Nombre} {pedido.Usuario.Apellido}".Trim() : string.Empty,
            ProductoraId = pedido.ProductoraId,
            NombreProductora = pedido.Productora?.NombreEmprendimiento ?? string.Empty,
            TipoOperacion = pedido.TipoOperacion,
            FechaPedido = pedido.FechaPedido,
            Estado = pedido.Estado,
            Total = pedido.Total,
            FacturaId = pedido.Factura?.FacturaId,
            Detalles = pedido.DetallesPedido.Select(dp => new DetallePedidoResponseDto
            {
                DetallePedidoId = dp.DetallePedidoId,
                ProductoId = dp.ProductoId,
                NombreProducto = dp.Producto?.Nombre ?? string.Empty,
                Cantidad = dp.Cantidad,
                PrecioUnitario = dp.PrecioUnitario,
                Subtotal = dp.Subtotal
            }).ToList()
        };
    }
}
