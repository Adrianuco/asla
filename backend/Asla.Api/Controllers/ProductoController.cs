using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoController : ControllerBase
{
    private readonly ProductoService _service;

    public ProductoController(ProductoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetProductos()
    {
        var productos = await _service.GetProductos();

        return Ok(productos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductoById(int id)
    {
        var producto = await _service.GetProductoById(id);

        if(producto == null)
        {
            return NotFound();
        }

        return Ok(producto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProducto(Producto producto)
    {
        var nuevoProducto = await _service.CreateProducto(producto);
        return Ok(nuevoProducto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProducto(int id, Producto producto)
    {
        var actualizado = await _service.UpdateProducto(id, producto);
        if(!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var resultado = await _service.DeleteProducto(id);

        if(!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}