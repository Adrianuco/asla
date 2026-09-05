using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Etiqueta
{
    public int EtiquetaId { get; set; }
    public string Nombre { get; set; } = string.Empty;

    [JsonIgnore]
    public ICollection<ProductoraEtiqueta> ProductoraEtiquetas { get; set; } = new List<ProductoraEtiqueta>();
}
