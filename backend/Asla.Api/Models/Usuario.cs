using System.Text.Json.Serialization;

namespace Asla.Api.Models;

public class Usuario
{
    public int UsuarioId { get; set; }
    public int RolId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Cedula { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string Contrasena { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public string EstadoVerificacion { get; set; } = string.Empty;
    public DateTime FechaRegistro { get; set; }
    public bool Estado { get; set; }

    // Navegación
    public Rol Rol { get; set; } = null!;
    
    // Relación 1:1 con Productora (Usuario es el principal, Productora es el dependiente con FK)
    public Productora? Productora { get; set; }

    // Relación 1:1 con Carrito (Usuario es el principal, Carrito es el dependiente con FK)
    public Carrito? Carrito { get; set; }

    // Relaciones (1:N)
    [JsonIgnore]
    public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    [JsonIgnore]
    public ICollection<Trueque> Trueques { get; set; } = new List<Trueque>();
}
