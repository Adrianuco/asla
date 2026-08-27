using Asla.Api.DTOs.Usuario;
using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly UsuarioService _service;

    public UsuarioController(UsuarioService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsuarios()
    {
        var usuarios = await _service.GetUsuariosAsync();
        return Ok(usuarios);
    }

    [HttpGet("{id}/perfil")]
    public async Task<ActionResult<PerfilDto>> GetPerfilUsuario(int id)
    {
        var perfil = await _service.GetPerfilUsuarioAsync(id);
        if (perfil == null)
        {
            return NotFound();
        }
        return Ok(perfil);
    }

    [HttpPut("{id}/perfil")]
    public async Task<IActionResult> UpdatePerfilUsuario(int id, ActualizarPerfilDto dto)
    {
        var actualizado = await _service.UpdatePerfilUsuarioAsync(id, dto);
        if (!actualizado)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> CreateUsuario(Usuario usuario)
    {
        var nuevoUsuario = await _service.CreateUsuarioAsync(usuario);
        return Ok(nuevoUsuario);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
        var resultado = await _service.DeleteUsuarioAsync(id);
        if (!resultado)
        {
            return NotFound();
        }
        return NoContent();
    }
}
