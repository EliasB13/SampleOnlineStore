using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SampleOnlineStore.Dtos.Order;
using SampleOnlineStore.Services.Order;

namespace SampleOnlineStore.Controllers
{
	[Authorize]
    [Route("cart")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
		private readonly IOrderService _orderService;

		public OrdersController(IOrderService orderService)
		{
			_orderService = orderService;
		}

		[HttpPost("add")]
		public async Task AddItemToCart([FromBody] AddToCartRequest requestDto)
		{
			int userId = int.Parse(User.FindFirstValue(ClaimTypes.Name));
			await _orderService.AddItemToOrder(userId, requestDto.ProductId, requestDto.Quantity ?? 1);
		}

		[HttpDelete("{id}")]
		public async Task DeleteOrderLine(int id)
		{
			await _orderService.DeleteOrderLine(id);
		}

		[HttpPut("{olId}/{quantity}")]
		public async Task UpdateQuantity(int olId, int quantity)
		{
			await _orderService.UpdateQuantity(olId, quantity);
		}

		[HttpGet]
		public async Task<IActionResult> GetOrderItemsAsync()
		{
			int userId = int.Parse(User.FindFirstValue(ClaimTypes.Name));
			var order = await _orderService.GetOrderItemsAsync(userId);
			return Ok(order);
		}
    }
}