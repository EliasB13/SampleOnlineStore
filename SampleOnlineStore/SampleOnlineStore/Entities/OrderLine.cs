using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Entities
{
	public class OrderLine
	{
		public int Id { get; set; }
		public int Quantity { get; set; }
		[ForeignKey("Order")]
		public int OrderId { get; set; }
		public int ProductId { get; set; }

		public virtual Order Order { get; set; }
		public virtual Product Product { get; set; }
	}
}
