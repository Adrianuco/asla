using Asla.Api.Data;
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

    public async Task<List<Usuario>> GetUsuarios()
    {
        return await _context.Usuarios.Include(u => u.Rol).ToListAsync();
    }

    public async Task<Usuario?> GetUsuarioById(int id)
    {
        return await _context.Usuarios.Include(u => u.Rol).FirstOrDefaultAsync(u => u.UsuarioId == id);
    }

    public async Task<Usuario> CreateUsuario(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
        return usuario;
    }

    public async Task<bool> DeleteUsuario(int id)
    {
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioId == id);
        if (usuario == null)
        {
            return false;
        }

        _context.Usuarios.Remove(usuario);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateUsuario(int id, Usuario usuario)
    {
        var usuarioExistente = await _context.Usuarios.FirstOrDefaultAsync(u => u.UsuarioId == id);
        if (usuarioExistente == null)
        {
            return false;
        }

        usuarioExistente.RolId = usuario.RolId;
        usuarioExistente.Nombre = usuario.Nombre;
        usuarioExistente.Apellido = usuario.Apellido;
        usuarioExistente.Cedula = usuario.Cedula;
        usuarioExistente.Correo = usuario.Correo;
        usuarioExistente.Contrasena = usuario.Contrasena;
        usuarioExistente.Telefono = usuario.Telefono;
        usuarioExistente.Genero = usuario.Genero;
        usuarioExistente.EstadoVerificacion = usuario.EstadoVerificacion;
        usuarioExistente.FechaRegistro = usuario.FechaRegistro;
        usuarioExistente.Estado = usuario.Estado;

        await _context.SaveChangesAsync();
        return true;
    }
}
