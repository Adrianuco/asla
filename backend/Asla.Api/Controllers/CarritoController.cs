using Asla.Api.DTOs.Carrito;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarritoController : ControllerBase
{
    private readonly CarritoService _service;

    public CarritoController(CarritoService service)
    {
        _service = service;
    }

    [HttpGet("usuario/{usuarioId}")]
    public async Task<ActionResult<CarritoDto>> GetCarritoUsuario(int usuarioId)
    {
        var carrito = await _service.GetCarritoByUsuarioIdAsync(usuarioId);
        return Ok(carrito);
    }

    [HttpPost("item")]
    public async Task<ActionResult<CarritoDto>> AgregarItem(AgregarItemCarritoDto dto)
    {
        var carritoActualizado = await _service.AgregarItemCarritoAsync(dto);
        return Ok(carritoActualizado);
    }

    [HttpPut("item/{detalleCarritoId}")]
    public async Task<ActionResult<CarritoDto>> ActualizarCantidadItem(int detalleCarritoId, [FromBody] ActualizarCantidadItemDto dto)
    {
        var carritoActualizado = await _service.ActualizarCantidadItemAsync(detalleCarritoId, dto.Cantidad);
        if (carritoActualizado == null)
        {
            return NotFound();
        }
        return Ok(carritoActualizado);
    }

    [HttpDelete("item/{detalleCarritoId}")]
    public async Task<IActionResult> EliminarItem(int detalleCarritoId)
    {
        var resultado = await _service.EliminarItemCarritoAsync(detalleCarritoId);
        if (!resultado)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("vaciar/{usuarioId}")]
    public async Task<IActionResult> VaciarCarrito(int usuarioId)
    {
        var resultado = await _service.VaciarCarritoAsync(usuarioId);
        if (!resultado)
        {
            return NotFound();
        }
        return NoContent();
    }
}
