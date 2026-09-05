using Asla.Api.Data;
using Asla.Api.DTOs.Pedidos;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class DetallePedidoService
{
    private readonly AppDbContext _context;

    public DetallePedidoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DetallePedidoResponseDto>> GetDetalles(int? pedidoId = null)
    {
        var query = _context.DetallesPedido
            .AsNoTracking()
            .Include(dp => dp.Producto)
            .AsQueryable();

        if (pedidoId.HasValue)
        {
            query = query.Where(dp => dp.PedidoId == pedidoId.Value);
        }

        var detalles = await query.ToListAsync();

        return detalles.Select(dp => new DetallePedidoResponseDto
        {
            DetallePedidoId = dp.DetallePedidoId,
            ProductoId = dp.ProductoId,
            NombreProducto = dp.Producto?.Nombre ?? string.Empty,
            Cantidad = dp.Cantidad,
            PrecioUnitario = dp.PrecioUnitario,
            Subtotal = dp.Subtotal
        }).ToList();
    }

    public async Task<DetallePedidoResponseDto?> GetDetalleById(int id)
    {
        var dp = await _context.DetallesPedido
            .AsNoTracking()
            .Include(d => d.Producto)
            .FirstOrDefaultAsync(d => d.DetallePedidoId == id);

        if (dp == null)
        {
            return null;
        }

        return new DetallePedidoResponseDto
        {
            DetallePedidoId = dp.DetallePedidoId,
            ProductoId = dp.ProductoId,
            NombreProducto = dp.Producto?.Nombre ?? string.Empty,
            Cantidad = dp.Cantidad,
            PrecioUnitario = dp.PrecioUnitario,
            Subtotal = dp.Subtotal
        };
    }
}
