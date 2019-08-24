﻿using SampleOnlineStore.Data.Repositories;
using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Services.Users
{
	public class UserService : IUserService
	{
		private readonly IUsersRepository _usersRepository;

		public UserService(IUsersRepository usersRepository)
		{
			_usersRepository = usersRepository;
		}

		public async Task<ShopUser> AuthenticateAsync(string username, string password)
		{
			if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
				return null;

			var user = await _usersRepository.GetByNameAsync(username);

			if (user == null)
				return null;

			if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
				return null;

			return user;
		}

		public async Task<ShopUser> GetById(int id)
		{
			return await _usersRepository.GetByIdAsync(id);
		}

		public async Task<ShopUser> Create(ShopUser user, string password)
		{
			if (await _usersRepository.IsUsernameTaken(user.Name))
				throw new ArgumentException("Username \"" + user.Name + "\" is already taken");

			byte[] passwordHash, passwordSalt;
			CreatePasswordHash(password, out passwordHash, out passwordSalt);

			user.PasswordHash = passwordHash;
			user.PasswordSalt = passwordSalt;

			await _usersRepository.AddAsync(user);

			return user;
		}

		//public void Update(ShopUser userParam, string password = null)
		//{
		//	var user = _context.Users.Find(userParam.Id);

		//	if (user == null)
		//		throw new AppException("User not found");

		//	if (userParam.Username != user.Username)
		//	{
		//		// username has changed so check if the new username is already taken
		//		if (_context.Users.Any(x => x.Username == userParam.Username))
		//			throw new AppException("Username " + userParam.Username + " is already taken");
		//	}

		//	// update user properties
		//	user.FirstName = userParam.FirstName;
		//	user.LastName = userParam.LastName;
		//	user.Username = userParam.Username;

		//	// update password if it was entered
		//	if (!string.IsNullOrWhiteSpace(password))
		//	{
		//		byte[] passwordHash, passwordSalt;
		//		CreatePasswordHash(password, out passwordHash, out passwordSalt);

		//		user.PasswordHash = passwordHash;
		//		user.PasswordSalt = passwordSalt;
		//	}

		//	_context.Users.Update(user);
		//	_context.SaveChanges();
		//}

		//public void Delete(int id)
		//{
		//	var user = _context.Users.Find(id);
		//	if (user != null)
		//	{
		//		_context.Users.Remove(user);
		//		_context.SaveChanges();
		//	}
		//}

		private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			if (password == null) throw new ArgumentNullException("password");
			if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

		private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
		{
			if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
			if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
			if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

			using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				for (int i = 0; i < computedHash.Length; i++)
				{
					if (computedHash[i] != storedHash[i]) return false;
				}
			}

			return true;
		}
	}
}