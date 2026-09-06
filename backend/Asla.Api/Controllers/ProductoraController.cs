using Asla.Api.DTOs.Productora;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoraController : ControllerBase
{
    private readonly ProductoraService _service;

    public ProductoraController(ProductoraService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductoraListDto>>> GetProductoras(
        [FromQuery] string? municipio,
        [FromQuery] string? busqueda)
    {
        var productoras = await _service.GetProductorasAsync(municipio, busqueda);
        return Ok(productoras);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductoraDetalleDto>> GetProductoraById(int id)
    {
        var productora = await _service.GetProductoraByIdAsync(id);
        if (productora == null)
        {
            return NotFound();
        }
        return Ok(productora);
    }

    [HttpPost]
    public async Task<ActionResult<ProductoraDetalleDto>> CreateProductora(CrearProductoraDto dto)
    {
        var nuevaProductora = await _service.CreateProductoraAsync(dto);
        return CreatedAtAction(nameof(GetProductoraById), new { id = nuevaProductora.ProductoraId }, nuevaProductora);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProductora(int id, ActualizarProductoraDto dto)
    {
        var actualizado = await _service.UpdateProductoraAsync(id, dto);
        if (!actualizado)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductora(int id)
    {
        var resultado = await _service.DeleteProductoraAsync(id);
        if (!resultado)
        {
            return NotFound();
        }
        return NoContent();
    }
}
