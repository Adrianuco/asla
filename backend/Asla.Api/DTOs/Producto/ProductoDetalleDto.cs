namespace Asla.Api.DTOs.Producto;

public class ProductoDetalleDto
{
    public int ProductoId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public bool PermiteVenta { get; set; }
    public bool PermiteTrueque { get; set; }
    public DateTime FechaPublicacion { get; set; }
    public bool Estado { get; set; }
    public string? ImagenUrl { get; set; }

    public int CategoriaId { get; set; }
    public string CategoriaNombre { get; set; } = string.Empty;

    public int UnidadMedidaId { get; set; }
    public string UnidadMedidaNombre { get; set; } = string.Empty;

    public int ProductoraId { get; set; }
    public string ProductoraNombre { get; set; } = string.Empty;
    public string ProductoraUbicacion { get; set; } = string.Empty;
}
