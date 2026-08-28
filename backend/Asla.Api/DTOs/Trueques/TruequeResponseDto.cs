namespace Asla.Api.DTOs.Trueques;

public class TruequeResponseDto
{
    public int TruequeId { get; set; }
    public int UsuarioId { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public int ProductoraId { get; set; }
    public string NombreProductora { get; set; } = string.Empty;
    public DateTime FechaSolicitud { get; set; }
    public string Estado { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public List<DetalleTruequeResponseDto> Detalles { get; set; } = new();
}
