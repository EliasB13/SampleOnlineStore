using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Dtos.Order
{
	public class OrderItemDto
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public string ProductName { get; set; }
		public decimal ProductPrice { get; set; }
		public int Quantity { get; set; }
		public string ImageUrl { get; set; }
	}
}
