using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Facturas;

public class CrearFacturaDto
{
    [Required(ErrorMessage = "El ID del pedido es obligatorio.")]
    public int PedidoId { get; set; }

    public string? NumeroFactura { get; set; }
}
