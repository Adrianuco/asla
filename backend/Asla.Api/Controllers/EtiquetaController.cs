using Asla.Api.DTOs.Etiqueta;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EtiquetaController : ControllerBase
{
    private readonly EtiquetaService _service;

    public EtiquetaController(EtiquetaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<EtiquetaDto>>> GetEtiquetas()
    {
        var etiquetas = await _service.GetEtiquetasAsync();
        return Ok(etiquetas);
    }

    [HttpPost]
    public async Task<ActionResult<EtiquetaDto>> CreateEtiqueta(CrearEtiquetaDto dto)
    {
        var nuevaEtiqueta = await _service.CreateEtiquetaAsync(dto);
        return Ok(nuevaEtiqueta);
    }
}
