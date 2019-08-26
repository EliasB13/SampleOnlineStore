using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SampleOnlineStore.Controllers
{
    [Route("img")]
    [ApiController]
    public class ImageController : ControllerBase
    {
		private readonly IHostingEnvironment _appEnvironment;
		public ImageController(IHostingEnvironment appEnvironment)
		{
			_appEnvironment = appEnvironment;
		}

		[HttpGet("{imgName}")]
		public IActionResult getImage(string imgName)
		{
			string filePath = Path.Combine(_appEnvironment.ContentRootPath, "Images/" + imgName);
			return PhysicalFile(filePath, "image/png");
		}
    }
}