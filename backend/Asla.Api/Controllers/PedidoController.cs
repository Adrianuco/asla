using Asla.Api.Models;
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
    public async Task<IActionResult> GetPedidos()
    {
        var pedidos = await _service.GetPedidos();

        return Ok(pedidos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPedidoById(int id)
    {
        var pedido = await _service.GetPedidoById(id);

        if (pedido == null)
        {
            return NotFound();
        }

        return Ok(pedido);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePedido(Pedido pedido)
    {
        var nuevoPedido = await _service.CreatePedido(pedido);
        return Ok(nuevoPedido);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePedido(int id, Pedido pedido)
    {
        var actualizado = await _service.UpdatePedido(id, pedido);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePedido(int id)
    {
        var resultado = await _service.DeletePedido(id);

        if (!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}
