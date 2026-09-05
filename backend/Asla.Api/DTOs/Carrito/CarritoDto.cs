namespace Asla.Api.DTOs.Carrito;

public class ItemCarritoDto
{
    public int DetalleCarritoId { get; set; }
    public int ProductoId { get; set; }
    public string NombreProducto { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal Cantidad { get; set; }
    public decimal Subtotal => PrecioUnitario * Cantidad;
    public bool PermiteVenta { get; set; }
    public bool PermiteTrueque { get; set; }
    public string UnidadMedidaNombre { get; set; } = string.Empty;
}

public class GrupoProductoraCarritoDto
{
    public int ProductoraId { get; set; }
    public string NombreProductora { get; set; } = string.Empty;
    public string TelefonoWhatsapp { get; set; } = string.Empty;
    public string Ubicacion { get; set; } = string.Empty;
    public decimal SubtotalProductora { get; set; }
    public List<ItemCarritoDto> Productos { get; set; } = new();
}

public class CarritoDto
{
    public int CarritoId { get; set; }
    public int UsuarioId { get; set; }
    public decimal MontoTotal { get; set; }
    public List<GrupoProductoraCarritoDto> GruposPorProductora { get; set; } = new();
}

public class AgregarItemCarritoDto
{
    public int UsuarioId { get; set; }
    public int ProductoId { get; set; }
    public decimal Cantidad { get; set; }
}

public class ActualizarCantidadItemDto
{
    public decimal Cantidad { get; set; }
}
