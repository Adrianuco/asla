using Asla.Api.Data;
using Asla.Api.DTOs.Usuario;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class UsuarioService
{
    private readonly AppDbContext _context;

    public UsuarioService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Usuario>> GetUsuariosAsync()
    {
        return await _context.Usuarios
            .Include(u => u.Rol)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<PerfilDto?> GetPerfilUsuarioAsync(int id)
    {
        var usuario = await _context.Usuarios
            .AsNoTracking()
            .Where(u => u.UsuarioId == id)
            .Select(u => new
            {
                u.UsuarioId,
                NombreCompleto = u.Nombre + " " + u.Apellido,
                u.Correo,
                u.Telefono,
                u.Genero,
                u.EstadoVerificacion,
                ImagenUrl = u.Productora != null ? u.Productora.ImagenUrl : null,
                Municipio = u.Productora != null ? u.Productora.Ubicacion.Municipio : null,
                Departamento = u.Productora != null ? u.Productora.Ubicacion.Departamento : null,
                EsProductora = u.Productora != null,
                ProductoraId = u.Productora != null ? (int?)u.Productora.ProductoraId : null,
                NombreEmprendimiento = u.Productora != null ? u.Productora.NombreEmprendimiento : null
            })
            .FirstOrDefaultAsync();

        if (usuario == null)
        {
            return null;
        }

        string ubicacionText = !string.IsNullOrWhiteSpace(usuario.Municipio)
            ? $"{usuario.Municipio}, {usuario.Departamento ?? "Nicaragua"}"
            : "Nicaragua";

        return new PerfilDto
        {
            UsuarioId = usuario.UsuarioId,
            NombreCompleto = usuario.NombreCompleto,
            Correo = usuario.Correo,
            Telefono = usuario.Telefono,
            Genero = usuario.Genero,
            Ubicacion = ubicacionText,
            EstadoVerificacion = string.IsNullOrWhiteSpace(usuario.EstadoVerificacion) ? "Usuaria Verificada" : usuario.EstadoVerificacion,
            ImagenUrl = usuario.ImagenUrl,
            EsProductora = usuario.EsProductora,
            ProductoraId = usuario.ProductoraId,
            NombreEmprendimiento = usuario.NombreEmprendimiento
        };
    }

    public async Task<bool> UpdatePerfilUsuarioAsync(int id, ActualizarPerfilDto dto)
    {
        var usuario = await _context.Usuarios
            .Include(u => u.Productora)
            .FirstOrDefaultAsync(u => u.UsuarioId == id);

        if (usuario == null)
        {
            return false;
        }

        usuario.Nombre = dto.Nombre;
        usuario.Apellido = dto.Apellido;
        usuario.Telefono = dto.Telefono;
        usuario.Genero = dto.Genero;

        if (usuario.Productora != null && dto.ImagenUrl != null)
        {
            usuario.Productora.ImagenUrl = dto.ImagenUrl;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Usuario> CreateUsuarioAsync(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return usuario;
    }

    public async Task<bool> DeleteUsuarioAsync(int id)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioId == id);
        if (usuario == null)
        {
            return false;
        }

        usuario.Estado = false;
        await _context.SaveChangesAsync();
        return true;
    }
}
