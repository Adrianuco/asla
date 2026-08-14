using Asla.Api.Models;
using Asla.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asla.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly CategoriaService _service;

    public CategoriaController(CategoriaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategorias()
    {
        var categorias = await _service.GetCategorias();

        return Ok(categorias);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoriaById(int id)
    {
        var categoria = await _service.GetCategoriaById(id);

        if(categoria == null)
        {
            return NotFound();
        }

        return Ok(categoria);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategoria(Categoria categoria)
    {
        var nuevaCategoria = await _service.CreateCategoria(categoria);
        return Ok(nuevaCategoria);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategoria(int id, Categoria categoria)
    {
        var actualizado = await _service.UpdateCategoria(id, categoria);
        if(!actualizado)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategoria(int id)
    {
        var resultado = await _service.DeleteCategoria(id);

        if(!resultado)
        {
            return NotFound();
        }

        return Ok();
    }
}