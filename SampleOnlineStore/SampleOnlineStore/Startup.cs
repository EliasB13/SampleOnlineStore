using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SampleOnlineStore.Data;
using SampleOnlineStore.Data.Repositories;
using SampleOnlineStore.Services.Products;

namespace SampleOnlineStore
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
			services.AddScoped<IProductsService, ProductsService>();
			services.AddScoped<IProductsRepository, ProductsRepository>();

			services.AddDbContext<ShopContext>(options =>
				options.UseSqlServer(
					Configuration.GetConnectionString("DefaultConnection")));

			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "Frontend/build";
			});
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			//app.UseSpa(spa =>
			//{
			//	spa.Options.SourcePath = "Frontend";

			//	if (env.IsDevelopment())
			//	{
			//		//spa.UseReactDevelopmentServer(npmScript: "start");
			//		spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
			//	}
			//});
		}
	}
}
