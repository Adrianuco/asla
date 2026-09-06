using Asla.Api.DTOs.Producto;

namespace Asla.Api.DTOs.Productora;

public class ProductoraDetalleDto
{
    public int ProductoraId { get; set; }
    public int UsuarioId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string NombreEmprendimiento { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string? ImagenUrl { get; set; }
    public string Municipio { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public string Ubicacion { get; set; } = string.Empty;
    public string EstadoVerificacion { get; set; } = string.Empty;
    public string TelefonoWhatsapp { get; set; } = string.Empty;
    public decimal Valoracion { get; set; } = 5.0m;
    public int TotalProductos { get; set; }
    public int TotalTrueques { get; set; }
    public List<string> Etiquetas { get; set; } = new();
    public List<ProductoDetalleDto> Productos { get; set; } = new();
}
