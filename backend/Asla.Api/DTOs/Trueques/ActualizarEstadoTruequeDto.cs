using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Trueques;

public class ActualizarEstadoTruequeDto
{
    [Required(ErrorMessage = "El estado es obligatorio.")]
    public string Estado { get; set; } = string.Empty;
}
