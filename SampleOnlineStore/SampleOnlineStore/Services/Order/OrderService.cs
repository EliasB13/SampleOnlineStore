using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SampleOnlineStore.Data.Repositories;
using SampleOnlineStore.Data.Repositories.OrderLines;
using SampleOnlineStore.Data.Repositories.Products;
using SampleOnlineStore.Dtos.Order;
using SampleOnlineStore.Entities;

namespace SampleOnlineStore.Services.Order
{
	public class OrderService : IOrderService
	{
		private readonly IAsyncRepository<Entities.Order> _orderRepository;
		private readonly IOrderLinesRepository _orderLinesRepository;

		public OrderService(IAsyncRepository<Entities.Order> orderRepository,
			IOrderLinesRepository orderLinesRepository)
		{
			_orderRepository = orderRepository;
			_orderLinesRepository = orderLinesRepository;
		}

		public async Task AddItemToOrder(int userId, int productId, int quantity = 1)
		{
			var order = await GetOrCreateOrder(userId);
			if (!order.OrderLines.Any(i => i.ProductId == productId))
			{
				await _orderLinesRepository.AddAsync(new OrderLine()
				{
					OrderId = order.Id,
					ProductId = productId,
					Quantity = quantity,
				});	
			}
			else
			{
				var existingItem = order.OrderLines.FirstOrDefault(i => i.ProductId == productId);
				existingItem.Quantity += quantity;
				await _orderLinesRepository.UpdateAsync(existingItem);
			}
		}

		public async Task DeleteOrderLine(int orderLineId)
		{
			var orderLine = await _orderLinesRepository.GetByIdAsync(orderLineId);
			if (orderLine != null)
			{
				await _orderLinesRepository.DeleteAsync(orderLine);
			}
		}

		public async Task<OrderDto> GetOrderItemsAsync(int userId)
		{
			var orders = await _orderRepository.GetListAsync(o => o.ShopUserId == userId && o.IsCheckedOut == false);
			if (orders.Count == 0)
			{
				var order = CreateOrderByUserId(userId);
				return new OrderDto()
				{
					OrderItems = new List<OrderItemDto>()
				};
			}
			else
			{
				var orderLines = await _orderLinesRepository.GetOrderLinesByOrderAsync(orders.Single().Id);
				return new OrderDto()
				{
					OrderItems = orderLines.Select(o => new OrderItemDto()
					{
						Id = o.Id,
						ProductId = o.ProductId,
						Quantity = o.Quantity,
						ImageUrl = o.Product.ImageUrl,
						ProductName = o.Product.Name,
						ProductPrice = o.Product.Price,
						Platform = o.Product.Platform.Name,
						ProductType = o.Product.ProductType.Name
					}).ToList()
				};
			}
		}

		public async Task UpdateQuantity(int orderLineId, int quantity)
		{
			var orderLine = await _orderLinesRepository.GetByIdAsync(orderLineId);
			if (orderLine != null)
			{
				orderLine.Quantity = quantity;
				await _orderLinesRepository.UpdateAsync(orderLine);
			}
		}

		private async Task<Entities.Order> GetOrCreateOrder(int userId)
		{
			var orders = await _orderRepository.GetListAsync(o => o.ShopUserId == userId && o.IsCheckedOut == false, o => o.OrderLines);
			if (orders.Count == 0)
				return await CreateOrderByUserId(userId);
			return orders.Single();
		}

		private async Task<Entities.Order> CreateOrderByUserId(int userId)
		{
			Entities.Order order = new Entities.Order() { ShopUserId = userId, IsCheckedOut = false, OrderLines = new List<OrderLine>() };
			await _orderRepository.AddAsync(order);

			return order;
		}

		public async Task OrderCheckout(int userId)
		{
			var orders = await _orderRepository.GetListAsync(o => o.ShopUserId == userId && o.IsCheckedOut == false, o => o.OrderLines);
			if (orders.Count() > 0)
			{
				var order = orders.Single();
				order.IsCheckedOut = true;
				order.OrderDate = DateTime.Now;
				await _orderRepository.UpdateAsync(order);
			}
		}
	}
}
