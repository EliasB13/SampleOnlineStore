using SampleOnlineStore.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SampleOnlineStore.Data.Repositories
{
	public class ProductsRepository : EfRepository<Product>, IProductsRepository
	{
		public ProductsRepository(ShopContext dbContext) : base(dbContext)
		{
		}

		public async Task<List<Product>> GetProductsPage(int currentPage, int pageSize, int? platformId, int? productTypeId)
		{
			return await _dbSet
				.Include(p => p.Platform)
				.Include(p =>  p.ProductType)
				.Where(i => (!platformId.HasValue || i.Platform.Id == platformId) && (!productTypeId.HasValue || i.ProductType.Id == productTypeId))
				.OrderBy(p => p.Id)
				.Skip((currentPage - 1) * pageSize)
				.Take(pageSize)
				.ToListAsync();
		}

		public async Task<int> CountAsync(int? platformId, int? productTypeId)
		{
			return await _dbSet
				.Where(i => (!platformId.HasValue || i.Platform.Id == platformId) && (!productTypeId.HasValue || i.ProductType.Id == productTypeId))
				.CountAsync();
		}

		public async Task<Product> GetProductByIdAsync(int id)
		{
			return await _dbSet
				.Include(p => p.Platform)
				.Include(p => p.ProductType)
				.SingleOrDefaultAsync(p => p.Id == id);
		}
	}
}
