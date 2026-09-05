namespace Asla.Api.Models;

public class DetalleTrueque
{
    public int DetalleTruequeId { get; set; }
    public int TruequeId { get; set; }
    public int ProductoId { get; set; }
    public string TipoOferta { get; set; } = string.Empty;
    public decimal Cantidad { get; set; }
    public string? Descripcion { get; set; }

    // Navegación
    public Trueque Trueque { get; set; } = null!;
    public Producto Producto { get; set; } = null!;
}
