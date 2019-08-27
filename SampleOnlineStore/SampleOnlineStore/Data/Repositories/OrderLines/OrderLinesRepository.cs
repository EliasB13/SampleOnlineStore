using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SampleOnlineStore.Data.Repositories.OrderLines
{
	public class OrderLinesRepository : EfRepository<OrderLine>, IOrderLinesRepository
	{
		public OrderLinesRepository(ShopContext dbContext) : base(dbContext)
		{
		}

		public async Task<List<OrderLine>> GetOrderLinesByOrderAsync(int orderId)
		{
			return await _dbSet
				.Include(ol => ol.Product)
					.ThenInclude(p => p.Platform)
				.Include(ol => ol.Product)
					.ThenInclude(p => p.ProductType)
				.Where(ol => ol.OrderId == orderId)
				.ToListAsync();
		}
	}
}
