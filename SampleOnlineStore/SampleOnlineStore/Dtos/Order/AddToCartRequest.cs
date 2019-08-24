using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Dtos.Order
{
	public class AddToCartRequest
	{
		public int ProductId { get; set; }
		public int? Quantity { get; set; }
	}
}
