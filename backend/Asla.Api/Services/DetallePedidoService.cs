using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services
{
    public class DetallePedidoService
    {
        private readonly AppDbContext _context;

        public DetallePedidoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DetallePedido>> GetDetallePedido()
        {
            // se agrega el Include para que EF haga un join con la tabla de categorias 
            // y traiga la información de la categoria asociada a cada producto
            return await _context.DetallesPedido.Include(dp => dp.Pedido).Include(dp => dp.Producto).ToListAsync();
        }

        public async Task<DetallePedido?> GetDetallePedidoById(int id)
        {
            return await _context.DetallesPedido.Include(dp => dp.Pedido).Include(dp => dp.Producto).FirstOrDefaultAsync(dp => dp.DetallePedidoId == id);
        }

        public async Task<DetallePedido> CreateDetallePedido(DetallePedido detallePedido)
        {
            _context.DetallesPedido.Add(detallePedido);
            await _context.SaveChangesAsync();
            return detallePedido;
        }

        public async Task<bool> DeleteDetallePedido(int id)
        {
            var detallePedido = await _context.DetallesPedido.FirstOrDefaultAsync(dp => dp.DetallePedidoId == id);

            if (detallePedido == null)
            {
                return false;
            }

            _context.DetallesPedido.Remove(detallePedido);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateDetallePedido(int id, DetallePedido detallePedido)
        {
            var detallePedidoExistente = await _context.DetallesPedido.FirstOrDefaultAsync(dp => dp.DetallePedidoId == id);

            if (detallePedidoExistente == null)
            {
                return false;
            }

            detallePedidoExistente.Pedido = detallePedido.Pedido;
            detallePedidoExistente.Producto = detallePedido.Producto;
            detallePedidoExistente.Cantidad = detallePedido.Cantidad;
            detallePedidoExistente.PrecioUnitario = detallePedido.PrecioUnitario;
            detallePedidoExistente.Subtotal = detallePedido.Subtotal;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
