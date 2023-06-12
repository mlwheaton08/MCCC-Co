using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DistributorsController : ControllerBase
    {
        private readonly IDistributorRepository _distributorRepo;

        public DistributorsController(IDistributorRepository distributorRepo)
        {
            _distributorRepo = distributorRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_distributorRepo.GetAll());
        }
    }
}