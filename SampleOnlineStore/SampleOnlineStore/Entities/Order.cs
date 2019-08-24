using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Entities
{
	public class Order
	{
		public int Id { get; set; }
		public DateTime OrderDate { get; set; }
		public bool IsCheckedOut { get; set; }

		public int ShopUserId { get; set; }
		public virtual ICollection<OrderLine> OrderLines { get; set; }
		public virtual ShopUser ShopUser { get; set; }
	}
}
