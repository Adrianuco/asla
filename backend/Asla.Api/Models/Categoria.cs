using System.Text.Json.Serialization;

namespace Asla.Api.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        // relación a muchos con Producto
        [JsonIgnore] // solucion temporal para swagger, se soluciona con DTOs
        public ICollection<Producto> Productos { get; set; } = new List<Producto>();

    }
}