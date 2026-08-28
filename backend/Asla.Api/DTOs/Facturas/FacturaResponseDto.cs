namespace Asla.Api.DTOs.Facturas;

public class FacturaResponseDto
{
    public int FacturaId { get; set; }
    public int PedidoId { get; set; }
    public string NumeroFactura { get; set; } = string.Empty;
    public DateTime FechaEmision { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Total { get; set; }
    public string Estado { get; set; } = string.Empty;
    public string NombreUsuario { get; set; } = string.Empty;
    public string NombreProductora { get; set; } = string.Empty;
}
