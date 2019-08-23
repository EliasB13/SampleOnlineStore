using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SampleOnlineStore.Data.Repositories
{
	public class EfRepository<T> : IAsyncRepository<T> where T : class 
	{
		protected readonly ShopContext _dbContext;
		protected DbSet<T> _dbSet;

		public EfRepository(ShopContext dbContext)
		{
			_dbContext = dbContext;
			_dbSet = dbContext.Set<T>();
		}

		public virtual async Task<T> GetByIdAsync(int id)
		{
			return await _dbSet.FindAsync(id);
		}

		public async Task<List<T>> ListAllAsync()
		{
			return await _dbSet.AsNoTracking().ToListAsync();
		}

		public async Task<T> AddAsync(T entity)
		{
			await _dbSet.AddAsync(entity);
			await _dbContext.SaveChangesAsync();

			return entity;
		}

		public async Task UpdateAsync(T entity)
		{
			_dbContext.Entry(entity).State = EntityState.Modified;
			await _dbContext.SaveChangesAsync();
		}

		public async Task DeleteAsync(T entity)
		{
			_dbSet.Remove(entity);
			await _dbContext.SaveChangesAsync();
		}
	}
}
