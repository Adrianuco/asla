using Asla.Api.Data;
using Asla.Api.DTOs.Trueques;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class TruequeService
{
    private readonly AppDbContext _context;

    public TruequeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TruequeResponseDto>> GetTrueques(int? usuarioId = null, int? productoraId = null, string? estado = null)
    {
        var query = _context.Trueques
            .AsNoTracking()
            .Include(t => t.Usuario)
            .Include(t => t.Productora)
            .Include(t => t.DetallesTrueque)
                .ThenInclude(dt => dt.Producto)
            .AsQueryable();

        if (usuarioId.HasValue)
        {
            query = query.Where(t => t.UsuarioId == usuarioId.Value);
        }

        if (productoraId.HasValue)
        {
            query = query.Where(t => t.ProductoraId == productoraId.Value);
        }

        if (!string.IsNullOrWhiteSpace(estado))
        {
            query = query.Where(t => t.Estado.ToLower() == estado.Trim().ToLower());
        }

        var trueques = await query.OrderByDescending(t => t.FechaSolicitud).ToListAsync();

        return trueques.Select(MapToResponseDto).ToList();
    }

    public async Task<TruequeResponseDto?> GetTruequeById(int id)
    {
        var trueque = await _context.Trueques
            .AsNoTracking()
            .Include(t => t.Usuario)
            .Include(t => t.Productora)
            .Include(t => t.DetallesTrueque)
                .ThenInclude(dt => dt.Producto)
            .FirstOrDefaultAsync(t => t.TruequeId == id);

        return trueque == null ? null : MapToResponseDto(trueque);
    }

    public async Task<TruequeResponseDto> CreateTrueque(CrearTruequeDto dto)
    {
        if (dto.Detalles == null || !dto.Detalles.Any())
        {
            throw new ArgumentException("El trueque debe incluir al menos un producto.");
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
            var detallesEntities = new List<DetalleTrueque>();

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

                if (!producto.PermiteTrueque)
                {
                    throw new InvalidOperationException($"El producto '{producto.Nombre}' no está habilitado para trueque.");
                }

                detallesEntities.Add(new DetalleTrueque
                {
                    ProductoId = item.ProductoId,
                    TipoOferta = item.TipoOferta,
                    Cantidad = item.Cantidad,
                    Descripcion = item.Descripcion
                });
            }

            var trueque = new Trueque
            {
                UsuarioId = dto.UsuarioId,
                ProductoraId = dto.ProductoraId,
                FechaSolicitud = DateTime.UtcNow,
                Estado = "Pendiente",
                Descripcion = dto.Descripcion,
                DetallesTrueque = detallesEntities
            };

            _context.Trueques.Add(trueque);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return (await GetTruequeById(trueque.TruequeId))!;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<bool> UpdateEstadoTrueque(int id, string nuevoEstado)
    {
        var trueque = await _context.Trueques.FirstOrDefaultAsync(t => t.TruequeId == id);
        if (trueque == null)
        {
            return false;
        }

        trueque.Estado = nuevoEstado;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteTrueque(int id)
    {
        var trueque = await _context.Trueques
            .Include(t => t.DetallesTrueque)
            .FirstOrDefaultAsync(t => t.TruequeId == id);

        if (trueque == null)
        {
            return false;
        }

        _context.Trueques.Remove(trueque);
        await _context.SaveChangesAsync();
        return true;
    }

    private static TruequeResponseDto MapToResponseDto(Trueque trueque)
    {
        return new TruequeResponseDto
        {
            TruequeId = trueque.TruequeId,
            UsuarioId = trueque.UsuarioId,
            NombreUsuario = trueque.Usuario != null ? $"{trueque.Usuario.Nombre} {trueque.Usuario.Apellido}".Trim() : string.Empty,
            ProductoraId = trueque.ProductoraId,
            NombreProductora = trueque.Productora?.NombreEmprendimiento ?? string.Empty,
            FechaSolicitud = trueque.FechaSolicitud,
            Estado = trueque.Estado,
            Descripcion = trueque.Descripcion,
            Detalles = trueque.DetallesTrueque.Select(dt => new DetalleTruequeResponseDto
            {
                DetalleTruequeId = dt.DetalleTruequeId,
                ProductoId = dt.ProductoId,
                NombreProducto = dt.Producto?.Nombre ?? string.Empty,
                TipoOferta = dt.TipoOferta,
                Cantidad = dt.Cantidad,
                Descripcion = dt.Descripcion
            }).ToList()
        };
    }
}
