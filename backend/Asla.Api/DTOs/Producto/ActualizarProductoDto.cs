namespace Asla.Api.DTOs.Producto;

public class ActualizarProductoDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public bool PermiteVenta { get; set; }
    public bool PermiteTrueque { get; set; }
    public int CategoriaId { get; set; }
    public int UnidadMedidaId { get; set; }
    public bool Estado { get; set; }
    public string? ImagenUrl { get; set; }
}
