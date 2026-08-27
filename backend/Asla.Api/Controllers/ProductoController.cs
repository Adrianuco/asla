using Asla.Api.DTOs.Producto;
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
    public async Task<ActionResult<List<ProductoDetalleDto>>> GetProductos(
        [FromQuery] string? busqueda,
        [FromQuery] int? productoraId,
        [FromQuery] int? categoriaId)
    {
        var productos = await _service.GetProductosAsync(busqueda, productoraId, categoriaId);
        return Ok(productos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductoDetalleDto>> GetProductoById(int id)
    {
        var producto = await _service.GetProductoByIdAsync(id);

        if (producto == null)
        {
            return NotFound();
        }

        return Ok(producto);
    }

    [HttpPost]
    public async Task<ActionResult<ProductoDetalleDto>> CreateProducto(CrearProductoDto dto)
    {
        var nuevoProducto = await _service.CreateProductoAsync(dto);
        return CreatedAtAction(nameof(GetProductoById), new { id = nuevoProducto.ProductoId }, nuevoProducto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProducto(int id, ActualizarProductoDto dto)
    {
        var actualizado = await _service.UpdateProductoAsync(id, dto);
        if (!actualizado)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var resultado = await _service.DeleteProductoAsync(id);

        if (!resultado)
        {
            return NotFound();
        }

        return NoContent();
    }
}