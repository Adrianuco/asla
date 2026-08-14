using Asla.Api.Data;
using Asla.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Asla.Api.Services
{
    public class TruequeService
    {
        private readonly AppDbContext _context;

        public TruequeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Trueque>> GetTrueques()
        {
            // se agrega el Include para que EF haga un join con la tabla de categorias 
            // y traiga la información de la categoria asociada a cada producto
            return await _context.Trueques.Include(t => t.Usuario).Include(t => t.Productora).ToListAsync();
        }

        public async Task<Trueque?> GetTruequeById(int id)
        {
            return await _context.Trueques.Include(t => t.Usuario).Include(t => t.Productora).FirstOrDefaultAsync(t => t.TruequeId == id);
        }

        public async Task<Trueque> CreateTrueque(Trueque trueque)
        {
            _context.Trueques.Add(trueque);
            await _context.SaveChangesAsync();
            return trueque;
        }

        public async Task<bool> DeleteTrueque(int id)
        {
            var trueque = await _context.Trueques.FirstOrDefaultAsync(t => t.TruequeId == id);

            if (trueque == null)
            {
                return false;
            }

            _context.Trueques.Remove(trueque);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateTrueque(int id, Trueque trueque)
        {
            var truequeExistente = await _context.Trueques.FirstOrDefaultAsync(t => t.TruequeId == id);

            if (truequeExistente == null)
            {
                return false;
            }

            truequeExistente.Usuario = trueque.Usuario;
            truequeExistente.Productora = trueque.Productora;
            truequeExistente.FechaSolicitud = trueque.FechaSolicitud;
            truequeExistente.Estado = trueque.Estado;
            truequeExistente.Descripcion = trueque.Descripcion;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
