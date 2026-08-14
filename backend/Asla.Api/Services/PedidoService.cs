using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services
{
    public class PedidoService
    {
        private readonly AppDbContext _context;

        public PedidoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Pedido>> GetPedidos()
        {
            // se agrega el Include para que EF haga un join con la tabla de categorias 
            // y traiga la información de la categoria asociada a cada producto
            return await _context.Pedidos.Include(p => p.Usuario).Include(p => p.Productora).ToListAsync();
        }

        public async Task<Pedido?> GetPedidoById(int id)
        {
            return await _context.Pedidos.Include(p => p.Usuario).Include(p => p.Productora).FirstOrDefaultAsync(p => p.PedidoId == id);
        }

        public async Task<Pedido> CreatePedido(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();
            return pedido;
        }

        public async Task<bool> DeletePedido(int id)
        {
            var pedido = await _context.Pedidos.FirstOrDefaultAsync(p => p.PedidoId == id);

            if (pedido == null)
            {
                return false;
            }

            _context.Pedidos.Remove(pedido);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdatePedido(int id, Pedido pedido)
        {
            var pedidoExistente = await _context.Pedidos.FirstOrDefaultAsync(p => p.PedidoId == id);

            if (pedidoExistente == null)
            {
                return false;
            }

            pedidoExistente.Usuario = pedido.Usuario;
            pedidoExistente.Productora = pedido.Productora;
            pedidoExistente.TipoOperacion = pedido.TipoOperacion;
            pedidoExistente.FechaPedido = pedido.FechaPedido;
            pedidoExistente.Estado = pedido.Estado;
            pedidoExistente.Total = pedido.Total;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
