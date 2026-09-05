using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class UbicacionService
{
    private readonly AppDbContext _context;

    public UbicacionService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Ubicacion>> GetUbicaciones()
    {
        return await _context.Ubicaciones.ToListAsync();
    }

    public async Task<Ubicacion?> GetUbicacionById(int id)
    {
        return await _context.Ubicaciones.FirstOrDefaultAsync(u => u.UbicacionId == id);
    }

    public async Task<Ubicacion> CreateUbicacion(Ubicacion ubicacion)
    {
        _context.Ubicaciones.Add(ubicacion);
        await _context.SaveChangesAsync();
        return ubicacion;
    }

    public async Task<bool> DeleteUbicacion(int id)
    {
        var ubicacion = await _context.Ubicaciones.FirstOrDefaultAsync(u => u.UbicacionId == id);
        if (ubicacion == null)
        {
            return false;
        }

        _context.Ubicaciones.Remove(ubicacion);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateUbicacion(int id, Ubicacion ubicacion)
    {
        var ubicacionExistente = await _context.Ubicaciones.FirstOrDefaultAsync(u => u.UbicacionId == id);
        if (ubicacionExistente == null)
        {
            return false;
        }

        ubicacionExistente.Departamento = ubicacion.Departamento;
        ubicacionExistente.Municipio = ubicacion.Municipio;
        ubicacionExistente.Comunidad = ubicacion.Comunidad;
        ubicacionExistente.Direccion = ubicacion.Direccion;

        await _context.SaveChangesAsync();
        return true;
    }
}
