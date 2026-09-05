using Asla.Api.Models;
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

    [HttpGet]
    public async Task<IActionResult> GetCarritos()
    {
        var carritos = await _service.GetCarritos();
        return Ok(carritos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarritoById(int id)
    {
        var carrito = await _service.GetCarritoById(id);
        if (carrito == null)
        {
            return NotFound();
        }
        return Ok(carrito);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCarrito(Carrito carrito)
    {
        var nuevoCarrito = await _service.CreateCarrito(carrito);
        return Ok(nuevoCarrito);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCarrito(int id, Carrito carrito)
    {
        var actualizado = await _service.UpdateCarrito(id, carrito);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCarrito(int id)
    {
        var resultado = await _service.DeleteCarrito(id);
        if (!resultado)
        {
            return NotFound();
        }
        return Ok();
    }
}
