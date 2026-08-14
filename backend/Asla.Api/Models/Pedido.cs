using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Pedido
{
    public int PedidoId { get; set; }
    public int UsuarioId { get; set; }
    public int ProductoraId { get; set; }
    public string TipoOperacion { get; set; } = string.Empty;
    public DateTime FechaPedido { get; set; }
    public string Estado { get; set; } = string.Empty;
    public decimal Total { get; set; }

    // Navegación
    public Usuario Usuario { get; set; } = null!;
    public Productora Productora { get; set; } = null!;

    // Relación 1:1 con Factura (Pedido es el principal, Factura es el dependiente con FK)
    public Factura? Factura { get; set; }

    // Relación (1:N)
    [JsonIgnore]
    public ICollection<DetallePedido> DetallesPedido { get; set; } = new List<DetallePedido>();
}
