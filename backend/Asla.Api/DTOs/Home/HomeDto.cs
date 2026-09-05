using Asla.Api.DTOs.Etiqueta;

namespace Asla.Api.DTOs.Home;

public class ProductoHomeDto
{
    public int ProductoId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public bool PermiteVenta { get; set; }
    public bool PermiteTrueque { get; set; }
    public string? ImagenUrl { get; set; }
    public string Municipio { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
    public int ProductoraId { get; set; }
    public string ProductoraNombre { get; set; } = string.Empty;
}

public class ProductoraHomeDto
{
    public int ProductoraId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string NombreEmprendimiento { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
    public string Municipio { get; set; } = string.Empty;
    public string Departamento { get; set; } = string.Empty;
}

public class HomeDto
{
    public List<ProductoHomeDto> Productos { get; set; } = new();
    public List<ProductoraHomeDto> Productoras { get; set; } = new();
    public List<EtiquetaDto> Etiquetas { get; set; } = new();
}
