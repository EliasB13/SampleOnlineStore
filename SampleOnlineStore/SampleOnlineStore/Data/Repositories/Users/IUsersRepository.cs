using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Data.Repositories.Users
{
	public interface IUsersRepository : IAsyncRepository<ShopUser>
	{
		Task<ShopUser> GetByNameAsync(string username);
		Task<bool> IsUsernameTaken(string username);
	}
}
