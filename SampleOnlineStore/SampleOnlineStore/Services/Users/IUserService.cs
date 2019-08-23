using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Services.Users
{
	public interface IUserService
	{
		Task<ShopUser> AuthenticateAsync(string username, string password);
		//IEnumerable<User> GetAll();
		Task<ShopUser> GetById(int id);
		Task<ShopUser> Create(ShopUser user, string password);
		//void Update(User user, string password = null);
		//void Delete(int id);
	}
}
