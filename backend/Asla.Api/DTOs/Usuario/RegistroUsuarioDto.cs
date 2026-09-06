namespace Asla.Api.DTOs.Usuario;

public class RegistroUsuarioDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Cedula { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public string Contrasena { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public int? RolId { get; set; }
}
