using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;

        public ItemsController(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        [HttpGet]
        public IActionResult Get(string? sortBy, bool asc)
        {
            return Ok(_itemRepo.GetAll(sortBy, asc));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _itemRepo.GetById(id);
            if (item != null) return Ok(item);
            return BadRequest();
        }
    }
}