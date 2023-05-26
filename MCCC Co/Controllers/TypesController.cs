using MCCC_Co_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCCC_Co_.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TypesController : ControllerBase
    {
        private readonly ITypeRepository _typeRepo;

        public TypesController(ITypeRepository typeRepo)
        {
            _typeRepo = typeRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_typeRepo.GetAll());
        }
    }
}