using SampleOnlineStore.Dtos;
using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Services.Products
{
	public interface IProductsService
	{
		Task<ProductsPageDto> GetAllProductsAsync(int currentPage, int pageSize, int? typeId, int? platformId);
		Task<ProductDto> GetProductByIdAsync(int id);
	}
}
