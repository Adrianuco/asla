namespace Asla.Api.DTOs.Productora;

public class CrearProductoraDto
{
    public int UsuarioId { get; set; }
    public int UbicacionId { get; set; }
    public string NombreEmprendimiento { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string? ImagenUrl { get; set; }
    public List<int> EtiquetaIds { get; set; } = new();
}

public class ActualizarProductoraDto
{
    public int UbicacionId { get; set; }
    public string NombreEmprendimiento { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public string? ImagenUrl { get; set; }
    public bool Estado { get; set; }
    public List<int> EtiquetaIds { get; set; } = new();
}
