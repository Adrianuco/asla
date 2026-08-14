using Asla.Api.Data;
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

    public async Task<List<Carrito>> GetCarritos()
    {
        return await _context.Carritos
            .Include(c => c.Usuario)
            .Include(c => c.Detalles)
            .ToListAsync();
    }

    public async Task<Carrito?> GetCarritoById(int id)
    {
        return await _context.Carritos
            .Include(c => c.Usuario)
            .Include(c => c.Detalles)
            .FirstOrDefaultAsync(c => c.CarritoId == id);
    }

    public async Task<Carrito> CreateCarrito(Carrito carrito)
    {
        _context.Carritos.Add(carrito);
        await _context.SaveChangesAsync();
        return carrito;
    }

    public async Task<bool> DeleteCarrito(int id)
    {
        var carrito = await _context.Carritos.FirstOrDefaultAsync(c => c.CarritoId == id);
        if (carrito == null)
        {
            return false;
        }

        _context.Carritos.Remove(carrito);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateCarrito(int id, Carrito carrito)
    {
        var carritoExistente = await _context.Carritos.FirstOrDefaultAsync(c => c.CarritoId == id);
        if (carritoExistente == null)
        {
            return false;
        }

        carritoExistente.UsuarioId = carrito.UsuarioId;
        carritoExistente.FechaCreacion = carrito.FechaCreacion;
        carritoExistente.EstadoActivo = carrito.EstadoActivo;

        await _context.SaveChangesAsync();
        return true;
    }
}
