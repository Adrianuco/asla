using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Rol
{
    public int RolId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }

    // Relaciones (1:N)
    [JsonIgnore]
    public ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
