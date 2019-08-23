using SampleOnlineStore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleOnlineStore.Dtos
{
	public class ProductsPageDto
	{
		public IEnumerable<ProductsPageItemDto> ProductsPageItems { get; set; }
		public IEnumerable<Platform> Platforms { get; set; }
		public IEnumerable<ProductType> ProductTypes { get; set; }
		public int? PlatformsFilterApplied { get; set; }
		public int? TypesFilterApplied { get; set; }
		public int TotalCount { get; set; }
		public PaginationInfo PaginationInfo { get; set; }
	}
}
