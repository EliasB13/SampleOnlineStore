using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Data.Repositories.Products
{
	public interface IProductsRepository : IAsyncRepository<Product>
	{
		Task<List<Product>> GetProductsPage(int currentPage, int pageSize, int? platformId, int? productTypeId);

		Task<int> CountAsync(int? platformId, int? productTypeId);

		Task<Product> GetProductByIdAsync(int id);
	}
}
