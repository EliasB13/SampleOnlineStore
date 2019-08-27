using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Data.Repositories.OrderLines
{
	public interface IOrderLinesRepository : IAsyncRepository<OrderLine>
	{
		Task<List<OrderLine>> GetOrderLinesByOrderAsync(int orderId);
	}
}
