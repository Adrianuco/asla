using Asla.Api.DTOs.Pedidos;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly PedidoService _service;

    public PedidoController(PedidoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetPedidos(
        [FromQuery] int? usuarioId,
        [FromQuery] int? productoraId,
        [FromQuery] string? estado)
    {
        var pedidos = await _service.GetPedidos(usuarioId, productoraId, estado);
        return Ok(pedidos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPedidoById(int id)
    {
        var pedido = await _service.GetPedidoById(id);
        if (pedido == null)
        {
            return NotFound(new { mensaje = $"No se encontró el pedido con ID {id}." });
        }

        return Ok(pedido);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePedido([FromBody] CrearPedidoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var nuevoPedido = await _service.CreatePedido(dto);
            return CreatedAtAction(nameof(GetPedidoById), new { id = nuevoPedido.PedidoId }, nuevoPedido);
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
            return StatusCode(500, new { mensaje = "Ocurrió un error inesperado al procesar el pedido.", detalle = ex.Message });
        }
    }

    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> ActualizarEstado(int id, [FromBody] ActualizarEstadoPedidoDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var actualizado = await _service.UpdateEstadoPedido(id, dto.Estado);
        if (!actualizado)
        {
            return NotFound(new { mensaje = $"No se encontró el pedido con ID {id}." });
        }

        return Ok(new { mensaje = "Estado del pedido actualizado correctamente.", nuevoEstado = dto.Estado });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePedido(int id)
    {
        var resultado = await _service.DeletePedido(id);
        if (!resultado)
        {
            return NotFound(new { mensaje = $"No se encontró el pedido con ID {id}." });
        }

        return Ok(new { mensaje = "Pedido eliminado correctamente." });
    }
}
