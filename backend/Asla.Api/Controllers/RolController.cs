using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RolController : ControllerBase
{
    private readonly RolService _service;

    public RolController(RolService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _service.GetRoles();
        return Ok(roles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRolById(int id)
    {
        var rol = await _service.GetRolById(id);
        if (rol == null)
        {
            return NotFound();
        }
        return Ok(rol);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRol(Rol rol)
    {
        var nuevoRol = await _service.CreateRol(rol);
        return Ok(nuevoRol);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRol(int id, Rol rol)
    {
        var actualizado = await _service.UpdateRol(id, rol);
        if (!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRol(int id)
    {
        var resultado = await _service.DeleteRol(id);
        if (!resultado)
        {
            return NotFound();
        }
        return Ok();
    }
}
