using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SampleOnlineStore.Data;
using SampleOnlineStore.Data.Repositories;
using SampleOnlineStore.Data.Repositories.OrderLines;
using SampleOnlineStore.Data.Repositories.Products;
using SampleOnlineStore.Data.Repositories.Users;
using SampleOnlineStore.Helpers;
using SampleOnlineStore.Services.Order;
using SampleOnlineStore.Services.Products;
using SampleOnlineStore.Services.Users;
using System.Text;
using System.Threading.Tasks;

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
			services.AddScoped<IOrderService, OrderService>();
			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IUsersRepository, UsersRepository>();
			services.AddScoped<IOrderLinesRepository, OrderLinesRepository>();

			services.AddDbContext<ShopContext>(options =>
				options.UseSqlServer(
					Configuration.GetConnectionString("DefaultConnection")));

			ConfigureJwtAuthorization(services);

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

			app.UseAuthentication();

			app.UseCors(builder => builder
				.WithOrigins("http://localhost:3000")
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials());

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

		private void ConfigureJwtAuthorization(IServiceCollection services)
		{
			var jwtSettingsSection = Configuration.GetSection("JwtSettings");
			services.Configure<JwtSettings>(jwtSettingsSection);

			var jwtSettings = jwtSettingsSection.Get<JwtSettings>();
			var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);
			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(x =>
			{
				x.Events = new JwtBearerEvents
				{
					OnTokenValidated = async context =>
					{
						var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
						var userId = int.Parse(context.Principal.Identity.Name);
						var user = await userService.GetById(userId);
						if (user == null)
						{
							context.Fail("Unauthorized");
						}
						await Task.CompletedTask;
					}
				};
				x.RequireHttpsMetadata = false;
				x.SaveToken = true;
				x.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false
				};
			});
		}
	}
}
