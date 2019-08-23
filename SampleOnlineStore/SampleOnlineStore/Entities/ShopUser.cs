using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Entities
{
	public class ShopUser
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
		public byte[] PasswordHash { get; set; }
		public byte[] PasswordSalt { get; set; }

		public IEnumerable<Order> Orders { get; set; }
	}
}
