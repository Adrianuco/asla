using Asla.Api.Models;
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
    public async Task<IActionResult> GetDetallePedidos()
    {
        var detallePedidos = await _service.GetDetallePedido();

        return Ok(detallePedidos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetallePedidoById(int id)
    {
        var detallePedido = await _service.GetDetallePedidoById(id);

        if (detallePedido == null)
        {
            return NotFound();
        }

        return Ok(detallePedido);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDetallePedido(DetallePedido detallePedido)
    {
        var nuevoDetallePedido = await _service.CreateDetallePedido(detallePedido);
        return Ok(nuevoDetallePedido);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDetallePedido(int id, DetallePedido detallePedido)
    {
        var actualizado = await _service.UpdateDetallePedido(id, detallePedido);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDetallePedido(int id)
    {
        var resultado = await _service.DeleteDetallePedido(id);

        if (!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}