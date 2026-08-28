using Asla.Api.DTOs.Trueques;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TruequeController : ControllerBase
{
    private readonly TruequeService _service;

    public TruequeController(TruequeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetTrueques(
        [FromQuery] int? usuarioId,
        [FromQuery] int? productoraId,
        [FromQuery] string? estado)
    {
        var trueques = await _service.GetTrueques(usuarioId, productoraId, estado);
        return Ok(trueques);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTruequeById(int id)
    {
        var trueque = await _service.GetTruequeById(id);
        if (trueque == null)
        {
            return NotFound(new { mensaje = $"No se encontró el trueque con ID {id}." });
        }

        return Ok(trueque);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTrueque([FromBody] CrearTruequeDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var nuevoTrueque = await _service.CreateTrueque(dto);
            return CreatedAtAction(nameof(GetTruequeById), new { id = nuevoTrueque.TruequeId }, nuevoTrueque);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { mensaje = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { mensaje = "Ocurrió un error inesperado al procesar la propuesta de trueque.", detalle = ex.Message });
        }
    }

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> ActualizarEstado(int id, [FromBody] ActualizarEstadoTruequeDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var actualizado = await _service.UpdateEstadoTrueque(id, dto.Estado);
        if (!actualizado)
        {
            return NotFound(new { mensaje = $"No se encontró el trueque con ID {id}." });
        }

        return Ok(new { mensaje = "Estado del trueque actualizado correctamente.", nuevoEstado = dto.Estado });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrueque(int id)
    {
        var resultado = await _service.DeleteTrueque(id);
        if (!resultado)
        {
            return NotFound(new { mensaje = $"No se encontró el trueque con ID {id}." });
        }

        return Ok(new { mensaje = "Propuesta de trueque eliminada correctamente." });
    }
}
