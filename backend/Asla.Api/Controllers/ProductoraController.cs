using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductoraController : ControllerBase
{
    private readonly ProductoraService _service;

    public ProductoraController(ProductoraService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetProductoras()
    {
        var productoras = await _service.GetProductoras();
        return Ok(productoras);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductoraById(int id)
    {
        var productora = await _service.GetProductoraById(id);
        if (productora == null)
        {
            return NotFound();
        }
        return Ok(productora);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProductora(Productora productora)
    {
        var nuevaProductora = await _service.CreateProductora(productora);
        return Ok(nuevaProductora);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProductora(int id, Productora productora)
    {
        var actualizado = await _service.UpdateProductora(id, productora);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductora(int id)
    {
        var resultado = await _service.DeleteProductora(id);
        if (!resultado)
        {
            return NotFound();
        }
        return Ok();
    }
}
