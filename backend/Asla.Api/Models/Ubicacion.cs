using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Ubicacion
{
    public int UbicacionId { get; set; }
    public string Departamento { get; set; } = string.Empty;
    public string Municipio { get; set; } = string.Empty;
    public string Comunidad { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;

    // Relaciones (1:N)
    [JsonIgnore]
    public ICollection<Productora> Productoras { get; set; } = new List<Productora>();
}
