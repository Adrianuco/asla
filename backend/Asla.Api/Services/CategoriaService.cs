using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class CategoriaService
{
    private readonly AppDbContext _context;

    public CategoriaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Categoria>> GetCategorias()
    {
        return await _context.Categorias.ToListAsync();
    }

    public async Task<Categoria?> GetCategoriaById(int id)
    {
        return await _context.Categorias.FirstOrDefaultAsync(c => c.CategoriaId == id);
    }

    public async Task<Categoria> CreateCategoria(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }

    public async Task<bool> DeleteCategoria(int id)
    {
        var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.CategoriaId == id);

        if(categoria == null)
        {
            return false;
        }

        _context.Categorias.Remove(categoria);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateCategoria(int id, Categoria categoria)
    {
        var categoriaExistente = await _context.Categorias.FirstOrDefaultAsync(c => c.CategoriaId == id);

        if(categoriaExistente == null)
        {
            return false;
        }

        categoriaExistente.Nombre = categoria.Nombre;

        await _context.SaveChangesAsync();

        return true;
    }
}