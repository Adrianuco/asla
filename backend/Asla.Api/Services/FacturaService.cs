using Asla.Api.Data;
using Asla.Api.DTOs.Facturas;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class FacturaService
{
    private readonly AppDbContext _context;

    public FacturaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<FacturaResponseDto>> GetFacturas(int? usuarioId = null, int? productoraId = null, string? estado = null)
    {
        var query = _context.Facturas
            .AsNoTracking()
            .Include(f => f.Pedido)
                .ThenInclude(p => p.Usuario)
            .Include(f => f.Pedido)
                .ThenInclude(p => p.Productora)
            .AsQueryable();

        if (usuarioId.HasValue)
        {
            query = query.Where(f => f.Pedido.UsuarioId == usuarioId.Value);
        }

        if (productoraId.HasValue)
        {
            query = query.Where(f => f.Pedido.ProductoraId == productoraId.Value);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            query = query.Where(f => f.Estado.ToLower() == estado.Trim().ToLower());
        }

        var facturas = await query.OrderByDescending(f => f.FechaEmision).ToListAsync();

        return facturas.Select(MapToResponseDto).ToList();
    }

    public async Task<FacturaResponseDto?> GetFacturaById(int id)
    {
        var factura = await _context.Facturas
            .AsNoTracking()
            .Include(f => f.Pedido)
                .ThenInclude(p => p.Usuario)
            .Include(f => f.Pedido)
                .ThenInclude(p => p.Productora)
            .FirstOrDefaultAsync(f => f.FacturaId == id);

        return factura == null ? null : MapToResponseDto(factura);
    }

    public async Task<FacturaResponseDto?> GetFacturaByPedidoId(int pedidoId)
    {
        var factura = await _context.Facturas
            .AsNoTracking()
            .Include(f => f.Pedido)
                .ThenInclude(p => p.Usuario)
            .Include(f => f.Pedido)
                .ThenInclude(p => p.Productora)
            .FirstOrDefaultAsync(f => f.PedidoId == pedidoId);

        return factura == null ? null : MapToResponseDto(factura);
    }

    public async Task<FacturaResponseDto> CreateFactura(CrearFacturaDto dto)
    {
        var pedido = await _context.Pedidos
            .Include(p => p.Usuario)
            .Include(p => p.Productora)
            .Include(p => p.Factura)
            .FirstOrDefaultAsync(p => p.PedidoId == dto.PedidoId);

        if (pedido == null)
        {
            throw new KeyNotFoundException($"El pedido con ID {dto.PedidoId} no existe.");
        }

        var facturaExistente = await _context.Facturas.FirstOrDefaultAsync(f => f.PedidoId == dto.PedidoId);
        if (facturaExistente != null)
        {
            throw new InvalidOperationException($"El pedido con ID {dto.PedidoId} ya tiene una factura emitida (Factura ID: {facturaExistente.FacturaId}, N°: {facturaExistente.NumeroFactura}).");
        }

        string numeroFactura = string.IsNullOrWhiteSpace(dto.NumeroFactura)
            ? $"FAC-{DateTime.UtcNow:yyyyMMdd}-{pedido.PedidoId:D4}"
            : dto.NumeroFactura.Trim();

        var factura = new Factura
        {
            PedidoId = dto.PedidoId,
            NumeroFactura = numeroFactura,
            FechaEmision = DateTime.UtcNow,
            Subtotal = pedido.Total,
            Total = pedido.Total,
            Estado = "Emitida"
        };

        _context.Facturas.Add(factura);
        await _context.SaveChangesAsync();

        return (await GetFacturaById(factura.FacturaId))!;
    }

    public async Task<bool> UpdateEstadoFactura(int id, string nuevoEstado)
    {
        var factura = await _context.Facturas.FirstOrDefaultAsync(f => f.FacturaId == id);
        if (factura == null)
        {
            return false;
        }

        factura.Estado = nuevoEstado;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteFactura(int id)
    {
        var factura = await _context.Facturas.FirstOrDefaultAsync(f => f.FacturaId == id);
        if (factura == null)
        {
            return false;
        }

        _context.Facturas.Remove(factura);
        await _context.SaveChangesAsync();
        return true;
    }

    private static FacturaResponseDto MapToResponseDto(Factura factura)
    {
        return new FacturaResponseDto
        {
            FacturaId = factura.FacturaId,
            PedidoId = factura.PedidoId,
            NumeroFactura = factura.NumeroFactura,
            FechaEmision = factura.FechaEmision,
            Subtotal = factura.Subtotal,
            Total = factura.Total,
            Estado = factura.Estado,
            NombreUsuario = factura.Pedido?.Usuario != null
                ? $"{factura.Pedido.Usuario.Nombre} {factura.Pedido.Usuario.Apellido}".Trim()
                : string.Empty,
            NombreProductora = factura.Pedido?.Productora?.NombreEmprendimiento ?? string.Empty
        };
    }
}
