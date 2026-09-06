using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Productora
{
    public int ProductoraId { get; set; }
    public int UsuarioId { get; set; }
    public int UbicacionId { get; set; }
    public string NombreEmprendimiento { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string EstadoVerificacion { get; set; } = string.Empty;
    public DateTime FechaSolicitud { get; set; }
    public DateTime? FechaVerificacion { get; set; }
    public bool Estado { get; set; }
    public string? ImagenUrl { get; set; }

    // Navegación
    public Usuario? Usuario { get; set; }
    public Ubicacion? Ubicacion { get; set; }

    // Relaciones N:N y 1:N
    [JsonIgnore]
    public ICollection<ProductoraEtiqueta> ProductoraEtiquetas { get; set; } = new List<ProductoraEtiqueta>();

    [JsonIgnore]
    public ICollection<Producto> Productos { get; set; } = new List<Producto>();

    [JsonIgnore]
    public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    [JsonIgnore]
    public ICollection<Trueque> Trueques { get; set; } = new List<Trueque>();
}