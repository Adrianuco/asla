using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Facturas;

public class ActualizarEstadoFacturaDto
{
    [Required(ErrorMessage = "El estado de la factura es obligatorio.")]
    public string Estado { get; set; } = string.Empty;
}
