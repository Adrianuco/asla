using Asla.Api.DTOs.Facturas;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FacturaController : ControllerBase
{
    private readonly FacturaService _service;

    public FacturaController(FacturaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetFacturas(
        [FromQuery] int? usuarioId,
        [FromQuery] int? productoraId,
        [FromQuery] string? estado)
    {
        var facturas = await _service.GetFacturas(usuarioId, productoraId, estado);
        return Ok(facturas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFacturaById(int id)
    {
        var factura = await _service.GetFacturaById(id);
        if (factura == null)
        {
            return NotFound(new { mensaje = $"No se encontró la factura con ID {id}." });
        }

        return Ok(factura);
    }

    [HttpGet("pedido/{pedidoId}")]
    public async Task<IActionResult> GetFacturaByPedidoId(int pedidoId)
    {
        var factura = await _service.GetFacturaByPedidoId(pedidoId);
        if (factura == null)
        {
            return NotFound(new { mensaje = $"No se encontró factura para el pedido con ID {pedidoId}." });
        }

        return Ok(factura);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFactura([FromBody] CrearFacturaDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var nuevaFactura = await _service.CreateFactura(dto);
            return CreatedAtAction(nameof(GetFacturaById), new { id = nuevaFactura.FacturaId }, nuevaFactura);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { mensaje = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { mensaje = "Ocurrió un error inesperado al emitir la factura.", detalle = ex.Message });
        }
    }

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> ActualizarEstado(int id, [FromBody] ActualizarEstadoFacturaDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var actualizado = await _service.UpdateEstadoFactura(id, dto.Estado);
        if (!actualizado)
        {
            return NotFound(new { mensaje = $"No se encontró la factura con ID {id}." });
        }

        return Ok(new { mensaje = "Estado de la factura actualizado correctamente.", nuevoEstado = dto.Estado });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFactura(int id)
    {
        var resultado = await _service.DeleteFactura(id);
        if (!resultado)
        {
            return NotFound(new { mensaje = $"No se encontró la factura con ID {id}." });
        }

        return Ok(new { mensaje = "Factura eliminada correctamente." });
    }
}
