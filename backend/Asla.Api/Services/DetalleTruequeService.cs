using Asla.Api.Data;
using Asla.Api.DTOs.Trueques;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class DetalleTruequeService
{
    private readonly AppDbContext _context;

    public DetalleTruequeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DetalleTruequeResponseDto>> GetDetalles(int? truequeId = null)
    {
        var query = _context.DetallesTrueque
            .AsNoTracking()
            .Include(dt => dt.Producto)
            .AsQueryable();

        if (truequeId.HasValue)
        {
            query = query.Where(dt => dt.TruequeId == truequeId.Value);
        }

        var detalles = await query.ToListAsync();

        return detalles.Select(dt => new DetalleTruequeResponseDto
        {
            DetalleTruequeId = dt.DetalleTruequeId,
            ProductoId = dt.ProductoId,
            NombreProducto = dt.Producto?.Nombre ?? string.Empty,
            TipoOferta = dt.TipoOferta,
            Cantidad = dt.Cantidad,
            Descripcion = dt.Descripcion
        }).ToList();
    }

    public async Task<DetalleTruequeResponseDto?> GetDetalleById(int id)
    {
        var dt = await _context.DetallesTrueque
            .AsNoTracking()
            .Include(d => d.Producto)
            .FirstOrDefaultAsync(d => d.DetalleTruequeId == id);

        if (dt == null)
        {
            return null;
        }

        return new DetalleTruequeResponseDto
        {
            DetalleTruequeId = dt.DetalleTruequeId,
            ProductoId = dt.ProductoId,
            NombreProducto = dt.Producto?.Nombre ?? string.Empty,
            TipoOferta = dt.TipoOferta,
            Cantidad = dt.Cantidad,
            Descripcion = dt.Descripcion
        };
    }
}
