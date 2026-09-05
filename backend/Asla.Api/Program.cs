using Asla.Api.Data;
using Asla.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// inyeccion de dependencia para AppDbContext
// permite a .NET saber como construir un AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
{   
    // configura las options que recibira el constructor de AppDbContext cuando .NET se encargue de construirlo
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    );
});


// inyeccion de dependencias para los services
builder.Services.AddScoped<ProductoService>();
builder.Services.AddScoped<CategoriaService>();
builder.Services.AddScoped<FacturaService>();
builder.Services.AddScoped<PedidoService>();
builder.Services.AddScoped<DetallePedidoService>();
builder.Services.AddScoped<TruequeService>();
builder.Services.AddScoped<DetalleTruequeService>();
builder.Services.AddScoped<RolService>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<UbicacionService>();
builder.Services.AddScoped<ProductoraService>();
builder.Services.AddScoped<UnidadMedidaService>();
builder.Services.AddScoped<CarritoService>();
builder.Services.AddScoped<DetalleCarritoService>();
builder.Services.AddScoped<HomeService>();
builder.Services.AddScoped<EtiquetaService>();

// Configuración de CORS para permitir peticiones desde el frontend de desarrollo y producción
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Inicialización y siembra de datos básica si la BD está vacía
await DbInitializer.SeedAsync(app.Services);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
