﻿using SampleOnlineStore.Dtos.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Services.Order
{
	public interface IOrderService
	{
		Task AddItemToOrder(int userId, int productId, int quantity = 1);
		Task<OrderDto> GetOrderItemsAsync(int userId);
		Task DeleteOrderLine(int orderLineId);
		Task UpdateQuantity(int orderLineId, int quantity);
		Task OrderCheckout(int userId);
	}
}
