using Asla.Api.Data;
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

    public async Task<List<Productora>> GetProductoras()
    {
        return await _context.Productoras
            .Include(p => p.Usuario)
            .Include(p => p.Ubicacion)
            .ToListAsync();
    }

    public async Task<Productora?> GetProductoraById(int id)
    {
        return await _context.Productoras
            .Include(p => p.Usuario)
            .Include(p => p.Ubicacion)
            .FirstOrDefaultAsync(p => p.ProductoraId == id);
    }

    public async Task<Productora> CreateProductora(Productora productora)
    {
        _context.Productoras.Add(productora);
        await _context.SaveChangesAsync();
        return productora;
    }

    public async Task<bool> DeleteProductora(int id)
    {
        var productora = await _context.Productoras.FirstOrDefaultAsync(p => p.ProductoraId == id);
        if (productora == null)
        {
            return false;
        }

        _context.Productoras.Remove(productora);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateProductora(int id, Productora productora)
    {
        var productoraExistente = await _context.Productoras.FirstOrDefaultAsync(p => p.ProductoraId == id);
        if (productoraExistente == null)
        {
            return false;
        }

        productoraExistente.UsuarioId = productora.UsuarioId;
        productoraExistente.UbicacionId = productora.UbicacionId;
        productoraExistente.NombreEmprendimiento = productora.NombreEmprendimiento;
        productoraExistente.Descripcion = productora.Descripcion;
        productoraExistente.EstadoVerificacion = productora.EstadoVerificacion;
        productoraExistente.FechaSolicitud = productora.FechaSolicitud;
        productoraExistente.FechaVerificacion = productora.FechaVerificacion;
        productoraExistente.Estado = productora.Estado;

        await _context.SaveChangesAsync();
        return true;
    }
}
