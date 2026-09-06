namespace Asla.Api.DTOs.Usuario;

public class PerfilDto
{
    public int UsuarioId { get; set; }
    public string NombreCompleto { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Cedula { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public string Ubicacion { get; set; } = string.Empty;
    public string? Municipio { get; set; }
    public string? Departamento { get; set; }
    public string EstadoVerificacion { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
    public bool EsProductora { get; set; }
    public int? ProductoraId { get; set; }
    public string? NombreEmprendimiento { get; set; }
}

public class ActualizarPerfilDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public string? ImagenUrl { get; set; }
}
