using Asla.Api.Data;
using Asla.Api.DTOs.Etiqueta;
using Asla.Api.DTOs.Home;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class HomeService
{
    private readonly AppDbContext _context;

    public HomeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<HomeDto> GetHomeDataAsync(int? usuarioId, string? municipioParam, string? busqueda)
    {
        string? municipioFiltro = municipioParam;

        // Si se proporciona usuarioId y no se especificó un municipioParam explícito, obtener el municipio del usuario
        if (usuarioId.HasValue && string.IsNullOrWhiteSpace(municipioFiltro))
        {
            var userLocation = await _context.Usuarios
                .AsNoTracking()
                .Where(u => u.UsuarioId == usuarioId.Value)
                .Select(u => u.Productora != null ? u.Productora.Ubicacion.Municipio : null)
                .FirstOrDefaultAsync();

            if (!string.IsNullOrWhiteSpace(userLocation))
            {
                municipioFiltro = userLocation;
            }
        }

        // 1. Obtener Etiquetas
        var etiquetas = await _context.Etiquetas
            .AsNoTracking()
            .Select(e => new EtiquetaDto
            {
                EtiquetaId = e.EtiquetaId,
                Nombre = e.Nombre
            })
            .ToListAsync();

        // 2. Consulta base de productos
        var productosQuery = _context.Productos
            .AsNoTracking()
            .Where(p => p.Estado);

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            productosQuery = productosQuery.Where(p => 
                p.Nombre.Contains(busqueda) || 
                (p.Descripcion != null && p.Descripcion.Contains(busqueda)));
        }

        var productosList = await productosQuery
            .Select(p => new ProductoHomeDto
            {
                ProductoId = p.ProductoId,
                Nombre = p.Nombre,
                Precio = p.Precio,
                PermiteVenta = p.PermiteVenta,
                PermiteTrueque = p.PermiteTrueque,
                ImagenUrl = p.ImagenUrl,
                Municipio = p.Productora.Ubicacion.Municipio,
                Departamento = p.Productora.Ubicacion.Departamento,
                ProductoraId = p.ProductoraId,
                ProductoraNombre = string.IsNullOrWhiteSpace(p.Productora.NombreEmprendimiento)
                    ? p.Productora.Usuario.Nombre + " " + p.Productora.Usuario.Apellido
                    : p.Productora.NombreEmprendimiento
            })
            .ToListAsync();

        // Si hay municipioFiltro, priorizar los productos del municipio del usuario
        if (!string.IsNullOrWhiteSpace(municipioFiltro))
        {
            productosList = productosList
                .OrderByDescending(p => p.Municipio.Equals(municipioFiltro, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        // 3. Consulta base de productoras
        var productorasQuery = _context.Productoras
            .AsNoTracking()
            .Where(p => p.Estado);

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            productorasQuery = productorasQuery.Where(p =>
                p.NombreEmprendimiento.Contains(busqueda) ||
                (p.Usuario.Nombre + " " + p.Usuario.Apellido).Contains(busqueda));
        }

        var productorasList = await productorasQuery
            .Select(p => new ProductoraHomeDto
            {
                ProductoraId = p.ProductoraId,
                Nombre = string.IsNullOrWhiteSpace(p.NombreEmprendimiento)
                    ? p.Usuario.Nombre + " " + p.Usuario.Apellido
                    : p.NombreEmprendimiento,
                NombreEmprendimiento = p.NombreEmprendimiento,
                ImagenUrl = p.ImagenUrl ?? (p.Usuario != null ? null : null),
                Municipio = p.Ubicacion.Municipio,
                Departamento = p.Ubicacion.Departamento
            })
            .ToListAsync();

        // Priorizar productoras de la zona del usuario (cercanía por municipio)
        if (!string.IsNullOrWhiteSpace(municipioFiltro))
        {
            productorasList = productorasList
                .OrderByDescending(p => p.Municipio.Equals(municipioFiltro, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        return new HomeDto
        {
            Productos = productosList,
            Productoras = productorasList,
            Etiquetas = etiquetas
        };
    }
}
