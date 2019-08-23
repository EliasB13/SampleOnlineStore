using SampleOnlineStore.Data.Repositories;
using SampleOnlineStore.Dtos;
using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Services.Products
{
	public class ProductsService : IProductsService
	{
		private readonly IAsyncRepository<Product> _productsRepository;
		private readonly IAsyncRepository<Platform> _platformRepository;
		private readonly IAsyncRepository<ProductType> _productTypesRepository;
		private readonly IProductsRepository _pRepo;

		public ProductsService(IAsyncRepository<Product> productRepository, 
			IAsyncRepository<Platform> platformRepository, 
			IAsyncRepository<ProductType> productTypesRepository,
			IProductsRepository r)
		{
			_productsRepository = productRepository;
			_platformRepository = platformRepository;
			_productTypesRepository = productTypesRepository;
			_pRepo = r;
		}

		public async Task<ProductsPageDto> GetAllProductsAsync(int currentPage, int pageSize, int? typeId, int? platformId)
		{
			//var productsList = await _productsRepository.ListAllAsync();
			//var productsListOnPage = productsList.OrderBy(p => p.Id).Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
			var productsListOnPage = await _pRepo.GetProductsPage(currentPage, pageSize, platformId, typeId);
			var totalCount = await _pRepo.CountAsync(platformId, typeId);

			foreach (var product in productsListOnPage)
			{
				product.ImageUrl = "/img/productsCards/" + product.ImageUrl;
			}

			var productsPage = new ProductsPageDto()
			{
				ProductsPageItems = productsListOnPage.Select(i => new ProductsPageItemDto()
				{
					Id = i.Id,
					Name = i.Name,
					ImageUrl = i.ImageUrl,
					Price = i.Price
				}),
				Platforms = await GetPlatformsAsync(),
				ProductTypes = await GetProductTypesAsync(),
				PlatformsFilterApplied = platformId ?? 0,
				TypesFilterApplied = typeId ?? 0,
				PaginationInfo = new PaginationInfo() {
					CurrentPage = currentPage,
					PageSize = pageSize,
					TotalItems = totalCount,
					TotalPages = int.Parse(Math.Ceiling((decimal)totalCount / pageSize).ToString())
				}
			};

			return productsPage;
		}

		public Task<Product> GetProductByIdAsync()
		{
			throw new NotImplementedException();
		}

		private async Task<IEnumerable<Platform>> GetPlatformsAsync()
		{
			return await _platformRepository.ListAllAsync();
		}

		private async Task<IEnumerable<ProductType>> GetProductTypesAsync()
		{
			return await _productTypesRepository.ListAllAsync();
		}
	}
}
