namespace Asla.Api.DTOs.Trueques;

public class DetalleTruequeResponseDto
{
    public int DetalleTruequeId { get; set; }
    public int ProductoId { get; set; }
    public string NombreProducto { get; set; } = string.Empty;
    public string TipoOferta { get; set; } = string.Empty;
    public decimal Cantidad { get; set; }
    public string? Descripcion { get; set; }
}
