using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services
{
    public class FacturaService
    {
        private readonly AppDbContext _context;

        public FacturaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Factura>> GetFacturas()
        {
            // se agrega el Include para que EF haga un join con la tabla de categorias 
            // y traiga la información de la categoria asociada a cada producto
            return await _context.Facturas.Include(f => f.Pedido).ToListAsync();
        }

        public async Task<Factura?> GetFacturaById(int id)
        {
            return await _context.Facturas.Include(f => f.Pedido).FirstOrDefaultAsync(p => p.FacturaId == id);
        }

        public async Task<Factura> CreateFactura(Factura factura)
        {
            _context.Facturas.Add(factura);
            await _context.SaveChangesAsync();
            return factura;
        }

        public async Task<bool> DeleteFactura(int id)
        {
            var factura = await _context.Facturas.FirstOrDefaultAsync(f => f.FacturaId == id);

            if (factura == null)
            {
                return false;
            }

            _context.Facturas.Remove(factura);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateFactura(int id, Factura factura)
        {
            var facturaExistente = await _context.Facturas.FirstOrDefaultAsync(f => f.FacturaId == id);

            if (facturaExistente == null)
            {
                return false;
            }

            facturaExistente.Pedido = factura.Pedido;
            facturaExistente.NumeroFactura = factura.NumeroFactura;
            facturaExistente.FechaEmision = factura.FechaEmision;
            facturaExistente.Subtotal = factura.Subtotal;
            facturaExistente.Total = factura.Total;
            facturaExistente.Estado = factura.Estado;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
