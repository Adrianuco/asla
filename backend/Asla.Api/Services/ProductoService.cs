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
        return await _context.Productos
            .Include(p => p.Categoria)
            .Include(p => p.Productora)
            .Include(p => p.UnidadMedida)
            .ToListAsync();
    }

    public async Task<Producto?> GetProductoById(int id)
    {
        return await _context.Productos
            .Include(p => p.Categoria)
            .Include(p => p.Productora)
            .Include(p => p.UnidadMedida)
            .FirstOrDefaultAsync(p => p.ProductoId == id);
    }

    public async Task<Producto> CreateProducto(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return producto;
    }

    public async Task<bool> DeleteProducto(int id)
    {
        var producto = await _context.Productos.FirstOrDefaultAsync(p => p.ProductoId == id);

        if (producto == null)
        {
            return false;
        }

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateProducto(int id, Producto producto)
    {
        var productoExistente = await _context.Productos.FirstOrDefaultAsync(p => p.ProductoId == id);

        if (productoExistente == null)
        {
            return false;
        }

        productoExistente.Nombre = producto.Nombre;
        productoExistente.Descripcion = producto.Descripcion;
        productoExistente.Precio = producto.Precio;
        productoExistente.PermiteVenta = producto.PermiteVenta;
        productoExistente.PermiteTrueque = producto.PermiteTrueque;
        productoExistente.FechaPublicacion = producto.FechaPublicacion;
        productoExistente.Estado = producto.Estado;
        productoExistente.CategoriaId = producto.CategoriaId;
        productoExistente.UnidadMedidaId = producto.UnidadMedidaId;
        productoExistente.ProductoraId = producto.ProductoraId;

        await _context.SaveChangesAsync();
        return true;
    }
}