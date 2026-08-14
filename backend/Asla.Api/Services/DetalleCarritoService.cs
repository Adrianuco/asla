using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class DetalleCarritoService
{
    private readonly AppDbContext _context;

    public DetalleCarritoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DetalleCarrito>> GetDetallesCarrito()
    {
        return await _context.DetallesCarrito
            .Include(dc => dc.Carrito)
            .Include(dc => dc.Producto)
            .ToListAsync();
    }

    public async Task<DetalleCarrito?> GetDetalleCarritoById(int id)
    {
        return await _context.DetallesCarrito
            .Include(dc => dc.Carrito)
            .Include(dc => dc.Producto)
            .FirstOrDefaultAsync(dc => dc.DetalleCarritoId == id);
    }

    public async Task<DetalleCarrito> CreateDetalleCarrito(DetalleCarrito detalle)
    {
        _context.DetallesCarrito.Add(detalle);
        await _context.SaveChangesAsync();
        return detalle;
    }

    public async Task<bool> DeleteDetalleCarrito(int id)
    {
        var detalle = await _context.DetallesCarrito.FirstOrDefaultAsync(dc => dc.DetalleCarritoId == id);
        if (detalle == null)
        {
            return false;
        }

        _context.DetallesCarrito.Remove(detalle);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateDetalleCarrito(int id, DetalleCarrito detalle)
    {
        var detalleExistente = await _context.DetallesCarrito.FirstOrDefaultAsync(dc => dc.DetalleCarritoId == id);
        if (detalleExistente == null)
        {
            return false;
        }

        detalleExistente.CarritoId = detalle.CarritoId;
        detalleExistente.ProductoId = detalle.ProductoId;
        detalleExistente.Cantidad = detalle.Cantidad;

        await _context.SaveChangesAsync();
        return true;
    }
}
