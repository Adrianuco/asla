using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DetalleCarritoController : ControllerBase
{
    private readonly DetalleCarritoService _service;

    public DetalleCarritoController(DetalleCarritoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetDetallesCarrito()
    {
        var detalles = await _service.GetDetallesCarrito();
        return Ok(detalles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetalleCarritoById(int id)
    {
        var detalle = await _service.GetDetalleCarritoById(id);
        if (detalle == null)
        {
            return NotFound();
        }
        return Ok(detalle);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDetalleCarrito(DetalleCarrito detalle)
    {
        var nuevoDetalle = await _service.CreateDetalleCarrito(detalle);
        return Ok(nuevoDetalle);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDetalleCarrito(int id, DetalleCarrito detalle)
    {
        var actualizado = await _service.UpdateDetalleCarrito(id, detalle);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDetalleCarrito(int id)
    {
        var resultado = await _service.DeleteDetalleCarrito(id);
        if (!resultado)
        {
            return NotFound();
        }
        return Ok();
    }
}
