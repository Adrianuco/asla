using Asla.Api.DTOs.Home;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    private readonly HomeService _service;

    public HomeController(HomeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<HomeDto>> GetHomeData(
        [FromQuery] int? usuarioId,
        [FromQuery] string? municipio,
        [FromQuery] string? busqueda
    )
    {
        var data = await _service.GetHomeDataAsync(usuarioId, municipio, busqueda);
        return Ok(data);
    }
}
