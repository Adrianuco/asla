using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Trueque
{
    public int TruequeId { get; set; }
    public int UsuarioId { get; set; }
    public int ProductoraId { get; set; }
    public DateTime FechaSolicitud { get; set; }
    public string Estado { get; set; } = string.Empty;
    public string? Descripcion { get; set; }

    // Navegación
    public Usuario Usuario { get; set; } = null!;
    public Productora Productora { get; set; } = null!;

    // Relación (1:N)
    [JsonIgnore]
    public ICollection<DetalleTrueque> DetallesTrueque { get; set; } = new List<DetalleTrueque>();
}
