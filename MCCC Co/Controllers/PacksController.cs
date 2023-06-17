using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PacksController : ControllerBase
    {
        private readonly IPackRepository _packRepo;

        public PacksController(IPackRepository packRepo)
        {
            _packRepo = packRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_packRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var pack = _packRepo.GetByIdWithPackItems(id);
            if (pack == null)
            {
                return NotFound();
            }
            return Ok(pack);
        }
    }
}