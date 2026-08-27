using Asla.Api.DTOs.Producto;

namespace Asla.Api.DTOs.Productora;

public class ProductoraListDto
{
    public int ProductoraId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string NombreEmprendimiento { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
    public string Municipio { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public string Ubicacion { get; set; } = string.Empty;
    public decimal Valoracion { get; set; } = 5.0m;
    public List<string> Etiquetas { get; set; } = new();
    public List<ProductoPreviewDto> ProductosPreview { get; set; } = new();
}
