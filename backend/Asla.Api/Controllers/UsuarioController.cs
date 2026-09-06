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

    [HttpPost("login")]
    public async Task<ActionResult<PerfilDto>> Login([FromBody] LoginDto dto)
    {
        var perfil = await _service.LoginAsync(dto);
        if (perfil == null)
        {
            return Unauthorized(new { mensaje = "Cédula/Correo o contraseña incorrectos. Verifica tus datos." });
        }
        return Ok(perfil);
    }

    [HttpPost("registro")]
    public async Task<ActionResult<PerfilDto>> Registro([FromBody] RegistroUsuarioDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nombre) || string.IsNullOrWhiteSpace(dto.Correo))
        {
            return BadRequest(new { mensaje = "Nombre y correo son obligatorios." });
        }
        var perfil = await _service.RegistrarAsync(dto);
        return CreatedAtAction(nameof(GetPerfilUsuario), new { id = perfil.UsuarioId }, perfil);
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
