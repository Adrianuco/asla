namespace Asla.Api.Models;

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }

    // relacion a uno con Cateogoria (FK)
    public int CategoriaId { get; set; }

    // navegacion a Categoria
    public Categoria? Categoria { get; set; }
}