using Asla.Api.Data;
using Asla.Api.DTOs.Etiqueta;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class EtiquetaService
{
    private readonly AppDbContext _context;

    public EtiquetaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<EtiquetaDto>> GetEtiquetasAsync()
    {
        return await _context.Etiquetas
            .AsNoTracking()
            .Select(e => new EtiquetaDto
            {
                EtiquetaId = e.EtiquetaId,
                Nombre = e.Nombre
            })
            .ToListAsync();
    }

    public async Task<EtiquetaDto> CreateEtiquetaAsync(CrearEtiquetaDto dto)
    {
        var etiqueta = new Etiqueta
        {
            Nombre = dto.Nombre
        };

        _context.Etiquetas.Add(etiqueta);
        await _context.SaveChangesAsync();

        return new EtiquetaDto
        {
            EtiquetaId = etiqueta.EtiquetaId,
            Nombre = etiqueta.Nombre
        };
    }
}
