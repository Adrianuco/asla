using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Trueques;

public class CrearTruequeDto
{
    [Required(ErrorMessage = "El ID del usuario solicitante es obligatorio.")]
    public int UsuarioId { get; set; }

    [Required(ErrorMessage = "El ID de la productora es obligatorio.")]
    public int ProductoraId { get; set; }

    public string? Descripcion { get; set; }

    [Required(ErrorMessage = "Los detalles del trueque son obligatorios.")]
    [MinLength(1, ErrorMessage = "El trueque debe incluir al menos un producto.")]
    public List<CrearDetalleTruequeDto> Detalles { get; set; } = new();
}
