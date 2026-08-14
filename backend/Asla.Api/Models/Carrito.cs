using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Carrito
{
    public int CarritoId { get; set; }
    public int UsuarioId { get; set; }
    public DateTime FechaCreacion { get; set; }
    public bool EstadoActivo { get; set; }

    // Navegación
    public Usuario Usuario { get; set; } = null!;

    // Relación (1:N)
    [JsonIgnore]
    public ICollection<DetalleCarrito> Detalles { get; set; } = new List<DetalleCarrito>();
}
