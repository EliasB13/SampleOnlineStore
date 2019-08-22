using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Entities
{
	public class Platform
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<Product> Products { get; set; }
	}
}
