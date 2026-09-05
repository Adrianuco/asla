namespace Asla.Api.Models;

public class DetalleCarrito
{
    public int DetalleCarritoId { get; set; }
    public int CarritoId { get; set; }
    public int ProductoId { get; set; }
    public decimal Cantidad { get; set; }

    // Navegación
    public Carrito Carrito { get; set; } = null!;
    public Producto Producto { get; set; } = null!;
}
