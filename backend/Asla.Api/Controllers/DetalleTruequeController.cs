using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DetalleTruequeController : ControllerBase
{
    private readonly DetalleTruequeService _service;

    public DetalleTruequeController(DetalleTruequeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetDetalles([FromQuery] int? truequeId)
    {
        var detalles = await _service.GetDetalles(truequeId);
        return Ok(detalles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetalleById(int id)
    {
        var detalle = await _service.GetDetalleById(id);
        if (detalle == null)
        {
            return NotFound(new { mensaje = $"No se encontró el detalle de trueque con ID {id}." });
        }

        return Ok(detalle);
    }
}
