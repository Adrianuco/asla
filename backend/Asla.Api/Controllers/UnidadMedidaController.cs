using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UnidadMedidaController : ControllerBase
{
    private readonly UnidadMedidaService _service;

    public UnidadMedidaController(UnidadMedidaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetUnidadesMedida()
    {
        var unidades = await _service.GetUnidadesMedida();
        return Ok(unidades);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUnidadMedidaById(int id)
    {
        var unidad = await _service.GetUnidadMedidaById(id);
        if (unidad == null)
        {
            return NotFound();
        }
        return Ok(unidad);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUnidadMedida(UnidadMedida unidadMedida)
    {
        var nuevaUnidad = await _service.CreateUnidadMedida(unidadMedida);
        return Ok(nuevaUnidad);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUnidadMedida(int id, UnidadMedida unidadMedida)
    {
        var actualizado = await _service.UpdateUnidadMedida(id, unidadMedida);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUnidadMedida(int id)
    {
        var resultado = await _service.DeleteUnidadMedida(id);
        if (!resultado)
        {
            return NotFound();
        }
        return Ok();
    }
}
