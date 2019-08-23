using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Dtos.Order
{
	public class OrderDto
	{
		public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();

		public decimal Total
		{
			get => Math.Round(OrderItems.Sum(x => x.ProductPrice * x.Quantity), 2);
		}
	}
}
