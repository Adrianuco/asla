using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class UnidadMedidaService
{
    private readonly AppDbContext _context;

    public UnidadMedidaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<UnidadMedida>> GetUnidadesMedida()
    {
        return await _context.UnidadesMedida.ToListAsync();
    }

    public async Task<UnidadMedida?> GetUnidadMedidaById(int id)
    {
        return await _context.UnidadesMedida.FirstOrDefaultAsync(u => u.UnidadMedidaId == id);
    }

    public async Task<UnidadMedida> CreateUnidadMedida(UnidadMedida unidadMedida)
    {
        _context.UnidadesMedida.Add(unidadMedida);
        await _context.SaveChangesAsync();
        return unidadMedida;
    }

    public async Task<bool> DeleteUnidadMedida(int id)
    {
        var unidadMedida = await _context.UnidadesMedida.FirstOrDefaultAsync(u => u.UnidadMedidaId == id);
        if (unidadMedida == null)
        {
            return false;
        }

        _context.UnidadesMedida.Remove(unidadMedida);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateUnidadMedida(int id, UnidadMedida unidadMedida)
    {
        var unidadMedidaExistente = await _context.UnidadesMedida.FirstOrDefaultAsync(u => u.UnidadMedidaId == id);
        if (unidadMedidaExistente == null)
        {
            return false;
        }

        unidadMedidaExistente.Nombre = unidadMedida.Nombre;
        unidadMedidaExistente.Estado = unidadMedida.Estado;

        await _context.SaveChangesAsync();
        return true;
    }
}
