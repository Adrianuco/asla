using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Trueques;

public class CrearDetalleTruequeDto
{
    [Required(ErrorMessage = "El ID del producto es obligatorio.")]
    public int ProductoId { get; set; }

    [Required(ErrorMessage = "El tipo de oferta es obligatorio (ej. 'Ofrecido' o 'Solicitado').")]
    public string TipoOferta { get; set; } = string.Empty;

    [Required(ErrorMessage = "La cantidad es obligatoria.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0.")]
    public decimal Cantidad { get; set; }

    public string? Descripcion { get; set; }
}
