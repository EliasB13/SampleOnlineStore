using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SampleOnlineStore.Dtos;
using SampleOnlineStore.Services.Products;

namespace SampleOnlineStore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
		private readonly IProductsService _productsService;

		public ProductsController(IProductsService productsService)
		{
			_productsService = productsService;
		}

        [HttpGet]
        public async Task<IActionResult> GetProductsPage(int? currentPage, int? pageSize, int? platformFilter, int? productTypeFilter)
        {
			var productsPage = await _productsService.GetAllProductsAsync(currentPage ?? 1, pageSize ?? 10, productTypeFilter, platformFilter);
			return Ok(productsPage);
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> GetProduct(int id)
        {
			var product = await _productsService.GetProductByIdAsync(id);
			return Ok(product);
        }
    }
}
