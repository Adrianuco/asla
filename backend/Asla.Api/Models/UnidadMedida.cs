using System.Text.Json.Serialization;
namespace Asla.Api.Models;

public class UnidadMedida
{
    public int UnidadMedidaId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public bool Estado { get; set; } 


    // relación a muchos con Producto
    [JsonIgnore] // solucion temporal para swagger, se soluciona con DTOs
    public ICollection<Producto> Productos { get; set; } = new List<Producto>();
}