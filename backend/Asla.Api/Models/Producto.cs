using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Producto
{
    public int ProductoId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public bool PermiteVenta { get; set; }
    public bool PermiteTrueque { get; set; }
    public DateTime FechaPublicacion { get; set; }
    public bool Estado { get; set; }

    // Foreign Keys (FK)
    public int CategoriaId { get; set; }
    public int UnidadMedidaId { get; set; }
    public int ProductoraId { get; set; }

    // navegacion
    public Categoria? Categoria { get; set; }
    public Productora? Productora { get; set; }
    public UnidadMedida? UnidadMedida { get; set; }

    // Relaciones (1:N)
    [JsonIgnore]
    public ICollection<DetallePedido> DetallePedidos { get; set; } = new List<DetallePedido>();

    [JsonIgnore]
    public ICollection<DetalleTrueque> DetalleTrueques { get; set; } = new List<DetalleTrueque>();

    [JsonIgnore]
    public ICollection<DetalleCarrito> DetallesCarrito { get; set; } = new List<DetalleCarrito>();
}