using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UbicacionController : ControllerBase
{
    private readonly UbicacionService _service;

    public UbicacionController(UbicacionService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetUbicaciones()
    {
        var ubicaciones = await _service.GetUbicaciones();
        return Ok(ubicaciones);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUbicacionById(int id)
    {
        var ubicacion = await _service.GetUbicacionById(id);
        if (ubicacion == null)
        {
            return NotFound();
        }
        return Ok(ubicacion);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUbicacion(Ubicacion ubicacion)
    {
        var nuevaUbicacion = await _service.CreateUbicacion(ubicacion);
        return Ok(nuevaUbicacion);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUbicacion(int id, Ubicacion ubicacion)
    {
        var actualizado = await _service.UpdateUbicacion(id, ubicacion);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUbicacion(int id)
    {
        var resultado = await _service.DeleteUbicacion(id);
        if (!resultado)
        {
            return NotFound();
        }
        return Ok();
    }
}
