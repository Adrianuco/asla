using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Data;

public class AppDbContext : DbContext
{
    // constructor del AppDbContext
    // de paramentro recibe la configuración de EF 
    public AppDbContext(
        DbContextOptions<AppDbContext> options // se le pasa al constructor del padre (DbContext) options 
    ) : base(options) 
    {     
    }

    // permite a EF administrar esta entidad
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
}