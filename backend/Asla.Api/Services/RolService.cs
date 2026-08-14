using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class RolService
{
    private readonly AppDbContext _context;

    public RolService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Rol>> GetRoles()
    {
        return await _context.Roles.ToListAsync();
    }

    public async Task<Rol?> GetRolById(int id)
    {
        return await _context.Roles.FirstOrDefaultAsync(r => r.RolId == id);
    }

    public async Task<Rol> CreateRol(Rol rol)
    {
        _context.Roles.Add(rol);
        await _context.SaveChangesAsync();
        return rol;
    }

    public async Task<bool> DeleteRol(int id)
    {
        var rol = await _context.Roles.FirstOrDefaultAsync(r => r.RolId == id);
        if (rol == null)
        {
            return false;
        }

        _context.Roles.Remove(rol);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateRol(int id, Rol rol)
    {
        var rolExistente = await _context.Roles.FirstOrDefaultAsync(r => r.RolId == id);
        if (rolExistente == null)
        {
            return false;
        }

        rolExistente.Nombre = rol.Nombre;
        rolExistente.Descripcion = rol.Descripcion;

        await _context.SaveChangesAsync();
        return true;
    }
}
