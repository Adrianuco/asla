using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Pedidos;

public class ActualizarEstadoPedidoDto
{
    [Required(ErrorMessage = "El estado es obligatorio.")]
    public string Estado { get; set; } = string.Empty;
}
