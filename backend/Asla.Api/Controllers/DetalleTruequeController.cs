using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DetalleTruequeController : ControllerBase
{
    private readonly DetalleTruequeService _service;

    public DetalleTruequeController(DetalleTruequeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetDetalleTrueques()
    {
        var detalleTrueques = await _service.GetDetalleTrueques();

        return Ok(detalleTrueques);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetalleTruequeById(int id)
    {
        var detalleTrueque = await _service.GetDetalleTruequeById(id);

        if (detalleTrueque == null)
        {
            return NotFound();
        }

        return Ok(detalleTrueque);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDetalleTrueque(DetalleTrueque detalleTrueque)
    {
        var nuevoDetalleTrueque = await _service.CreateDetalleTrueque(detalleTrueque);
        return Ok(nuevoDetalleTrueque);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDetalleTrueque(int id, DetalleTrueque detalleTrueque)
    {
        var actualizado = await _service.UpdateDetalleTrueque(id, detalleTrueque);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDetalleTrueque(int id)
    {
        var resultado = await _service.DeleteDetalleTrueque(id);

        if (!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}
