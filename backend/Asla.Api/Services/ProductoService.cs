using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services;

public class ProductoService
{
    private readonly AppDbContext _context;

    public ProductoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Producto>> GetProductos()
    {
        // se agrega el Include para que EF haga un join con la tabla de categorias 
        // y traiga la información de la categoria asociada a cada producto
        return await _context.Productos.Include(p => p.Categoria).ToListAsync();
    }

    public async Task<Producto?> GetProductoById(int id)
    {
        return await _context.Productos.Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Producto> CreateProducto(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return producto;
    }

    public async Task<bool> DeleteProducto(int id)
    {
        var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Id == id);

        if(producto == null)
        {
            return false;
        }

        _context.Productos.Remove(producto);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateProducto(int id, Producto producto)
    {
        var productoExistente = await _context.Productos.FirstOrDefaultAsync(p => p.Id == id);

        if(productoExistente == null)
        {
            return false;
        }

        productoExistente.Nombre = producto.Nombre;
        productoExistente.Precio = producto.Precio;
        productoExistente.Stock = producto.Stock;

        await _context.SaveChangesAsync();

        return true;
    }
}