using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Pedidos;

public class CrearDetallePedidoDto
{
    [Required(ErrorMessage = "El ID del producto es obligatorio.")]
    public int ProductoId { get; set; }

    [Required(ErrorMessage = "La cantidad es obligatoria.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0.")]
    public decimal Cantidad { get; set; }
}
