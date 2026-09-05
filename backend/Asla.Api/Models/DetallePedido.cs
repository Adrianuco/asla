namespace Asla.Api.Models;

public class DetallePedido
{
    public int DetallePedidoId { get; set; }
    public int PedidoId { get; set; }
    public int ProductoId { get; set; }
    public decimal Cantidad { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal Subtotal { get; set; }

    // Navegación
    public Pedido Pedido { get; set; } = null!;
    public Producto Producto { get; set; } = null!;
}
