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
		private readonly IAsyncRepository<Platform> _platformRepository;
		private readonly IAsyncRepository<ProductType> _productTypesRepository;
		private readonly IProductsRepository _productsRepository;

		public ProductsService(IAsyncRepository<Platform> platformRepository, 
			IAsyncRepository<ProductType> productTypesRepository,
			IProductsRepository productRepository)
		{
			_platformRepository = platformRepository;
			_productTypesRepository = productTypesRepository;
			_productsRepository = productRepository;
		}

		public async Task<ProductsPageDto> GetAllProductsAsync(int currentPage, int pageSize, int? typeId, int? platformId)
		{
			var productsListOnPage = await _productsRepository.GetProductsPage(currentPage, pageSize, platformId, typeId);
			var totalCount = await _productsRepository.CountAsync(platformId, typeId);

			var productsPage = new ProductsPageDto()
			{
				ProductsPageItems = productsListOnPage.Select(i => new ProductsPageItemDto()
				{
					Id = i.Id,
					Name = i.Name,
					ImageUrl = i.ImageUrl,
					Price = i.Price,
					ProductType = i.ProductType.Name
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

		public async Task<ProductDto> GetProductByIdAsync(int id)
		{
			var product = await _productsRepository.GetProductByIdAsync(id);
			return new ProductDto()
			{
				Id = product.Id,
				Name = product.Name,
				Description = product.Description,
				Genre = product.Genre,
				Language = product.Language,
				ImageUrl = product.ImageUrl,
				Publisher = product.Publisher,
				Price = product.Price,
				Platform = product.Platform.Name,
				ProductType = product.ProductType.Name
			};
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
