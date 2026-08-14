using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services
{
    public class DetalleTruequeService
    {
        private readonly AppDbContext _context;

        public DetalleTruequeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DetalleTrueque>> GetDetalleTrueques()
        {
            // se agrega el Include para que EF haga un join con la tabla de categorias 
            // y traiga la información de la categoria asociada a cada producto
            return await _context.DetallesTrueque.Include(dt => dt.Trueque).Include(dt => dt.Producto).ToListAsync();
        }

        public async Task<DetalleTrueque?> GetDetalleTruequeById(int id)
        {
            return await _context.DetallesTrueque.Include(dt => dt.Trueque).Include(dt => dt.Producto).FirstOrDefaultAsync(dt => dt.DetalleTruequeId == id);
        }

        public async Task<DetalleTrueque> CreateDetalleTrueque(DetalleTrueque detalletrueque)
        {
            _context.DetallesTrueque.Add(detalletrueque);
            await _context.SaveChangesAsync();
            return detalletrueque;
        }

        public async Task<bool> DeleteDetalleTrueque(int id)
        {
            var detalletrueque = await _context.DetallesTrueque.FirstOrDefaultAsync(dt => dt.DetalleTruequeId == id);

            if (detalletrueque == null)
            {
                return false;
            }

            _context.DetallesTrueque.Remove(detalletrueque);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateDetalleTrueque(int id, DetalleTrueque detalletrueque)
        {
            var detalleTruequeExistente = await _context.DetallesTrueque.FirstOrDefaultAsync(dt => dt.DetalleTruequeId == id);

            if (detalleTruequeExistente == null)
            {
                return false;
            }

            detalleTruequeExistente.Trueque = detalletrueque.Trueque;
            detalleTruequeExistente.Producto = detalletrueque.Producto;
            detalleTruequeExistente.TipoOferta = detalletrueque.TipoOferta;
            detalleTruequeExistente.Cantidad = detalletrueque.Cantidad;
            detalleTruequeExistente.Descripcion = detalletrueque.Descripcion;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
