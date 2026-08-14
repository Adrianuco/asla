using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TruequeController : ControllerBase
{
    private readonly TruequeService _service;

    public TruequeController(TruequeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetTrueques()
    {
        var trueques = await _service.GetTrueques();

        return Ok(trueques);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTruequeById(int id)
    {
        var trueque = await _service.GetTruequeById(id);

        if (trueque == null)
        {
            return NotFound();
        }

        return Ok(trueque);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTrueque(Trueque trueque)
    {
        var nuevoTrueque = await _service.CreateTrueque(trueque);
        return Ok(nuevoTrueque);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTrueque(int id, Trueque trueque)
    {
        var actualizado = await _service.UpdateTrueque(id, trueque);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrueque(int id)
    {
        var resultado = await _service.DeleteTrueque(id);

        if (!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}
