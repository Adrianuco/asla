namespace Asla.Api.DTOs.Etiqueta;

public class EtiquetaDto
{
    public int EtiquetaId { get; set; }
    public string Nombre { get; set; } = string.Empty;
}

public class CrearEtiquetaDto
{
    public string Nombre { get; set; } = string.Empty;
}
