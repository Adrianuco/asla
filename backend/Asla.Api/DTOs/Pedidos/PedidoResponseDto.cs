namespace Asla.Api.DTOs.Pedidos;

public class PedidoResponseDto
{
    public int PedidoId { get; set; }
    public int UsuarioId { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public int ProductoraId { get; set; }
    public string NombreProductora { get; set; } = string.Empty;
    public string TipoOperacion { get; set; } = string.Empty;
    public DateTime FechaPedido { get; set; }
    public string Estado { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public int? FacturaId { get; set; }
    public List<DetallePedidoResponseDto> Detalles { get; set; } = new();
}
