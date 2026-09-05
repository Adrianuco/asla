using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DetallePedidoController : ControllerBase
{
    private readonly DetallePedidoService _service;

    public DetallePedidoController(DetallePedidoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetDetalles([FromQuery] int? pedidoId)
    {
        var detalles = await _service.GetDetalles(pedidoId);
        return Ok(detalles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetalleById(int id)
    {
        var detalle = await _service.GetDetalleById(id);
        if (detalle == null)
        {
            return NotFound(new { mensaje = $"No se encontró el detalle con ID {id}." });
        }

        return Ok(detalle);
    }
}
