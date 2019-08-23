using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SampleOnlineStore.Dtos.Order;

namespace SampleOnlineStore.Services.Order
{
	public class OrderService : IOrderService
	{
		public Task AddItemToOrder(string userId, int productId, int quantity = 1)
		{
			throw new NotImplementedException();
		}

		public Task DeleteOrderLine(int orderLineId)
		{
			throw new NotImplementedException();
		}

		public Task<OrderDto> GetOrderItemsAsync(string userId)
		{
			throw new NotImplementedException();
		}

		public Task UpdateQuantity(int orderLineId, int quantity)
		{
			throw new NotImplementedException();
		}
	}
}
