using Microsoft.EntityFrameworkCore;
using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Data
{
	public class ShopContext : DbContext
	{
		public ShopContext(DbContextOptions<ShopContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<ProductType>().HasMany(pt => pt.Products).WithOne(p => p.ProductType);
			modelBuilder.Entity<Platform>().HasMany(plt => plt.Products).WithOne(p => p.Platform);

			modelBuilder.Entity<ProductType>().HasData(
				new List<ProductType>()
				{
					new ProductType() { Id = 1, Name = "Game" },
					new ProductType() { Id = 2, Name = "DLC" },
					new ProductType() { Id = 3, Name = "Gift card" }
				}
			);

			modelBuilder.Entity<Platform>().HasData(
				new List<Platform>()
				{
					new Platform() { Id = 1, Name = "PC" },
					new Platform() { Id = 2, Name = "XBOX One" },
					new Platform() { Id = 3, Name = "PS4" },
				}
			);

			modelBuilder.Entity<Product>().HasData(
					new { Id = 1, Name = "Grand Theft Auto V", Description = "Grand Theft Auto V", Language = "English", Genre = "Action", Publisher = "Rockstar Games", Price = 10.00m, ImageUrl = "gta5.jpg", PlatformId = 1, ProductTypeId = 1 },
					new { Id = 2, Name = "PUBG", Description = "PUBG", Language = "Russian", Genre = "Shooter", Publisher = "Tencent", Price = 16.50m, ImageUrl = "pubg.jpg", PlatformId = 1, ProductTypeId = 1 },
					new { Id = 3, Name = "Steam Gift Card", Description = "Steam Gift Card", Language = "English", Genre = "Gift", Publisher = "Steam", Price = 15.00m, ImageUrl = "gift.jpg", PlatformId = 1, ProductTypeId = 3 },
					new { Id = 4, Name = "Destiny 2", Description = "Destiny 2", Language = "Ukrainian", Genre = "Action", Publisher = "Activision", Price = 23.10m, ImageUrl = "destiny2.jpg", PlatformId = 3, ProductTypeId = 1 },
					new { Id = 5, Name = "Need For Speed: Most Wanted", Description = "NFS: MW", Language = "Ukrainian", Genre = "Racing", Publisher = "EA Games", Price = 13.00m, ImageUrl = "nfsmw.jpg", PlatformId = 1, ProductTypeId = 1 }
			);

			base.OnModelCreating(modelBuilder);
		}

		public DbSet<Product> Products { get; set; }
		public DbSet<OrderLine> OrderLines { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<Platform> Platforms { get; set; }
		public DbSet<ProductType> ProductTypes { get; set; }
	}
}
