namespace Asla.Api.DTOs.Producto;

public class ProductoPreviewDto
{
    public int ProductoId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
}
