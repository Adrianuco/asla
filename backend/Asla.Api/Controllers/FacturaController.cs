using Asla.Api.Data;
using Asla.Api.Models;
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
    public async Task<IActionResult> GetFacturas()
    {
        var facturas = await _service.GetFacturas();

        return Ok(facturas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFacturaById(int id)
    {
        var factura = await _service.GetFacturaById(id);

        if (factura == null)
        {
            return NotFound();
        }

        return Ok(factura);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFactura(Factura factura)
    {
        var nuevaFactura = await _service.CreateFactura(factura);
        return Ok(nuevaFactura);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFactura(int id, Factura factura)
    {
        var actualizado = await _service.UpdateFactura(id, factura);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFactura(int id)
    {
        var resultado = await _service.DeleteFactura(id);

        if (!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}
