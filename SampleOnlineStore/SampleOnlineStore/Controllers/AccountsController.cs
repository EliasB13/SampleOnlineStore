using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SampleOnlineStore.Dtos.Users;
using SampleOnlineStore.Entities;
using SampleOnlineStore.Helpers;
using SampleOnlineStore.Services.Users;

namespace SampleOnlineStore.Controllers
{
	[Authorize]
    [Route("account")]
    [ApiController]
    public class AccountsController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly JwtSettings _jwtSettings;

		public AccountsController(IUserService userService, IOptions<JwtSettings> jwtSettings)
		{
			_userService = userService;
			_jwtSettings = jwtSettings.Value;
		}

		[AllowAnonymous]
		[HttpPost("auth")]
		public async Task<IActionResult> Authenticate([FromBody]UserDto userDto)
		{
			var user = await _userService.AuthenticateAsync(userDto.Username, userDto.Password);

			if (user == null)
				return BadRequest(new { message = "Username or password is incorrect" });

			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.Name, user.Id.ToString())
				}),
				Expires = DateTime.UtcNow.AddDays(7),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			var tokenString = tokenHandler.WriteToken(token);

			// return basic user info (without password) and token to store client side
			return Ok(new
			{
				Id = user.Id,
				Username = user.Name,
				Token = tokenString
			});
		}

		[AllowAnonymous]
		[HttpPost("register")]
		public async Task<IActionResult> RegisterAsync([FromBody]UserDto userDto)
		{
			ShopUser user = new ShopUser() { Name = userDto.Username };

			try
			{
				await _userService.Create(user, userDto.Password);
				return Ok();
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}
	}
}