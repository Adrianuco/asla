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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // especificaciones para relaciones 1:1
        modelBuilder.Entity<Productora>()
            .HasOne(p => p.Usuario)
            .WithOne(u => u.Productora)
            .HasForeignKey<Productora>(p => p.UsuarioId);

        modelBuilder.Entity<Carrito>()
            .HasOne(c => c.Usuario)
            .WithOne(u => u.Carrito)
            .HasForeignKey<Carrito>(c => c.UsuarioId);

        modelBuilder.Entity<Factura>()
            .HasOne(f => f.Pedido)
            .WithOne(p => p.Factura)
            .HasForeignKey<Factura>(f => f.PedidoId);

        // definir restricciones de deletes en cascada

        // Pedidio no desaparece en caso de eliminar Usuario
        modelBuilder.Entity<Pedido>()
            .HasOne(p => p.Usuario)
            .WithMany(u => u.Pedidos)
            .HasForeignKey(p => p.UsuarioId)
            .OnDelete(DeleteBehavior.Restrict);


        // Pedido no se elimina en caso de eliminar Productora
        modelBuilder.Entity<Pedido>()
            .HasOne(p => p.Productora)
            .WithMany(p => p.Pedidos)
            .HasForeignKey(p => p.ProductoraId)
            .OnDelete(DeleteBehavior.Restrict);

        // misma lógica con Trueque
        modelBuilder.Entity<Trueque>()
            .HasOne(t => t.Usuario)
            .WithMany(u => u.Trueques)
            .HasForeignKey(t => t.UsuarioId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Trueque>()
            .HasOne(t => t.Productora)
            .WithMany(p => p.Trueques)
            .HasForeignKey(t => t.ProductoraId)
            .OnDelete(DeleteBehavior.Restrict);
        

        // Producto no depende de DetallePedido, DetalleTrueque o DetalleCarrito
        modelBuilder.Entity<DetallePedido>()
            .HasOne(d => d.Producto)
            .WithMany(p => p.DetallePedidos)
            .HasForeignKey(d => d.ProductoId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DetalleTrueque>()
            .HasOne(d => d.Producto)
            .WithMany(p => p.DetalleTrueques)
            .HasForeignKey(d => d.ProductoId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<DetalleCarrito>()
            .HasOne(d => d.Producto)
            .WithMany(p => p.DetallesCarrito)
            .HasForeignKey(d => d.ProductoId)
            .OnDelete(DeleteBehavior.Restrict);


        // En caso de eliminar carrito, se eliminar su detalle
        modelBuilder.Entity<DetalleCarrito>()
            .HasOne(d => d.Carrito)
            .WithMany(c => c.Detalles)
            .HasForeignKey(d => d.CarritoId)
            .OnDelete(DeleteBehavior.Cascade);
    }
    // permite a EF administrar estas entidades
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<UnidadMedida> UnidadesMedida { get; set; }
    public DbSet<Productora> Productoras { get; set; }
    public DbSet<Rol> Roles { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Ubicacion> Ubicaciones { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<DetallePedido> DetallesPedido { get; set; }
    public DbSet<Factura> Facturas { get; set; }
    public DbSet<Trueque> Trueques { get; set; }
    public DbSet<DetalleTrueque> DetallesTrueque { get; set; }
    public DbSet<Carrito> Carritos { get; set; }
    public DbSet<DetalleCarrito> DetallesCarrito { get; set; }
}