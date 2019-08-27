using Microsoft.EntityFrameworkCore;
using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Data.Repositories.Users
{
	public class UsersRepository : EfRepository<ShopUser>, IUsersRepository
	{
		public UsersRepository(ShopContext dbContext) : base(dbContext)
		{
		}

		public async Task<ShopUser> GetByNameAsync(string username)
		{
			return await _dbSet.SingleOrDefaultAsync(u => u.Name == username);
		}

		public async Task<bool> IsUsernameTaken(string username)
		{
			return await _dbSet.AnyAsync(u => u.Name == username);
		}
	}
}
