namespace Asla.Api.DTOs.Producto;

public class CrearProductoDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public bool PermiteVenta { get; set; }
    public bool PermiteTrueque { get; set; }
    public int CategoriaId { get; set; }
    public int UnidadMedidaId { get; set; }
    public int ProductoraId { get; set; }
    public string? ImagenUrl { get; set; }
}
