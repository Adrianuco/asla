using System.ComponentModel.DataAnnotations;

namespace Asla.Api.DTOs.Pedidos;

public class CrearPedidoDto
{
    [Required(ErrorMessage = "El ID del usuario es obligatorio.")]
    public int UsuarioId { get; set; }

    [Required(ErrorMessage = "El ID de la productora es obligatorio.")]
    public int ProductoraId { get; set; }

    [Required(ErrorMessage = "El tipo de operación es obligatorio.")]
    public string TipoOperacion { get; set; } = "Venta";

    [Required(ErrorMessage = "Los detalles del pedido son obligatorios.")]
    [MinLength(1, ErrorMessage = "El pedido debe contener al menos un producto.")]
    public List<CrearDetallePedidoDto> Detalles { get; set; } = new();
}
