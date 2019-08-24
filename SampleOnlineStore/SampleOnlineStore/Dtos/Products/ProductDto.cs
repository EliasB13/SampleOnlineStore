﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore
{
	public class ProductDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string Language { get; set; }
		public string Genre { get; set; }
		public string Publisher { get; set; }
		public decimal Price { get; set; }
		public string ImageUrl { get; set; }
		public string Platform { get; set; }
		public string ProductType { get; set; }
	}
}