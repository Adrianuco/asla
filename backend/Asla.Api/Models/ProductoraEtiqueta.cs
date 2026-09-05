namespace Asla.Api.Models;

public class ProductoraEtiqueta
{
    public int ProductoraId { get; set; }
    public Productora Productora { get; set; } = null!;

    public int EtiquetaId { get; set; }
    public Etiqueta Etiqueta { get; set; } = null!;
}
